import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://computer-house-server-side-gmneamul1-gmailcom.vercel.app/users/admin/${email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsAdmin(data?.isAdmin);
                    setIsAdminLoading(false);
                    // console.log(data)
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;