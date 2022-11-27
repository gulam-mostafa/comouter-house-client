import { useEffect, useState } from "react"

const useSeller = email => {
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://192.168.1.103:5000/users/Seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsSeller(data?.isSeller);
                    setIsSellerLoading(false);
                    console.log(data)
                })
        }
    }, [email])
    return [isSeller, isSellerLoading]
}

export default useSeller;