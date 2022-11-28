import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/users/Seller/${email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            }
            )
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsSeller(data?.isSeller);
                    setIsSellerLoading(false);
                    // console.log(data)
                })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}

export default useSeller;