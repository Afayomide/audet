"use client"
import "./auth.css"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import axios from "axios"
import { toast } from 'react-hot-toast';
import { useGlobalContext } from "@/context/globalContexts"
import Link from "next/link";


export default function Signup () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const [fullname, setFullName] = useState("")
    const router = useRouter(); // Use the router for navigation
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const { isAuthenticated, setIsAuthenticated } = useGlobalContext();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${apiUrl}/auth/checkAuth`, {
            withCredentials: true
          });
  
          if (response.status === 200) {
            setIsAuthenticated(true)
            router.push("/")
            toast.custom(<div>You are already logged in</div>);          } else {
            setIsAuthenticated(false)
          }
        } catch (error) {
          setIsAuthenticated(false);
          console.log(error)
        }
      };
  
      checkAuth();
    }, []);
  
    if (isAuthenticated === null) {
      return <p>Loading...</p>; // Or a spinner/loading component
    }
  
   

        const signup = async (e:any) =>{
            e.preventDefault()
            try{
                const response = await axios.post(`${apiUrl}/signup`, {
                  fullname,username,email,password
                });   
                const { success } = response.data;

                if(success){
                    toast.success("Signup successful!");
                    router.push("../")
                }
                else{
                    toast.error("Signup failed!");
                }
            }
            catch(error:any){       
                toast.error("Signup failed!");
            }
        }
    

    return (
        <div className="auth-container">
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
                <input id="password" type="password" name="password" value={password}
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
                <small>Already a member?<Link href={"/login"}>login</Link></small>

            </form>

        </div>
    )
}