import { useEffect, useState } from "react";

const useToken = email => {
    const [token, setToken] = useState('')

useEffect (() =>{

if(email){
    fetch(`http://192.168.1.103:5000/jwt?email=${email}`)
    .then(res => res.json())
    .then(data => {
   if(data.accessToken){
    localStorage.setItem('accessToken', data.accessToken)
    setToken(data.accessToken)
  
   }
    })
}

},[email])
return [token]
}
export default useToken;