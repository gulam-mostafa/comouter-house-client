import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://192.168.1.103:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIsAdmin(data?.isAdmin);
                    setIsAdminLoading(false);
                    console.log(data)
                })
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;