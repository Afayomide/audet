"use client"
import "./auth.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Signup () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [fullname, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
   

        const signup = async (e:any) =>{
            e.preventDefault()
            try{
                const response = await axios.post(`${apiUrl}/signup`, {
                  fullname,username,email,password
                });   
                console.log(response)
                if(response.status === 200){
                    alert(response.data.message)
                }
            }
            catch(error:any){
              
            }
        }
    

    return (
        <div>
            <h3>Signup</h3>
            <form onSubmit={signup} className="auth-form">
                <div className="input-group">
                 <label htmlFor="name">name: </label>
                <input id="name" type="text" name="name" value={fullname}
                onChange={(e) => {
                    setFullName(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="username">username: </label>
                <input id="username" type="text" name="username" value={username}
                onChange={(e) => {
                    setUsername(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="password">Password: </label>
                <input id="password" type="text" name="password" value={password}
                onChange={(e) => {
                    setPassword(e.target.value)}}/>   
                </div>

                <div className="input-group">
                 <label htmlFor="email">email: </label>
                <input id="email" type="email" name="email" value={email}
                onChange={(e) => {
                    setEmail(e.target.value)}}/>   
                </div>
               
                <button type="submit">Signup</button>
            </form>

        </div>
    )
}