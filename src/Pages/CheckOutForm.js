import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Components/Loading';

const CheckOutForm = ({ orders }) => {

  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe()

  const elements = useElements()
  const { price, email, title, _id, orderid } = orders;
  // console.log(orders.orderid)


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem('accessToken')}`

      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);



  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });
    if (error) {
      setCardError(error.message)

    } else {
      setCardError('')
    }
    setSuccess('')
    setProcessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: title,
            email: email ,
          },
        },
      },
    );
    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false)
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // console.log('card info' , card)
      // setSuccess("Congrats your Payment completed")
      // setTransactionId(paymentIntent.id)
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        ordersId: orders._id,  orderid,
      }
      console.log(payment)

      // console.log(payment)

      fetch('https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/payments', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          // authorization: `bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payment)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.insertedId) {
            setSuccess('Congrats! your payment completed');
            setTransactionId(paymentIntent.id);
          }
        })
    }
    setProcessing(false);


  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',

                color: '#000000',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {

          processing ? (
            <Loading></Loading>)
            :
            (<button className='btn btn-sm mt-4 btn-primary' type="submit" disabled={!stripe || !clientSecret}>
              Pay
            </button>)


        }
        <p className='text-red-500'>{cardError}</p>
      </form>
      {
        success && <div>
          <p className='text-green-500'>{success}</p>
          <p className='text-blue-500'> Your transaction Id {transactionId}</p>
        </div>
      }
      <Link className='btn mx-3 my-8' to='/dashboard/myorder'>Order list</Link>
    </div>
  );
};

export default CheckOutForm;