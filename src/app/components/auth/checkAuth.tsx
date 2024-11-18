import { useGlobalContext } from "@/context/globalContexts";
import axios from "axios"
import {toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const useCheckAuth = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
const { setIsAuthenticated } = useGlobalContext();
const router = useRouter(); // Use the router for navigation

const checkAuth = async () => {
    try {
      const response = await axios.get(`${apiUrl}/checkAuth`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        toast("You are already logged in");
        router.push("../");
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  return checkAuth; // Return the function
      };

export default useCheckAuth