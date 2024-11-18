"use client";
import "./auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContexts";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter(); // Use the router for navigation
  axios.defaults.withCredentials = true;
  const { isAuthenticated, setIsAuthenticated } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
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

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Or a spinner/loading component
  }

  const login = async (e: any) => {
    e.preventDefault();

    const loginPromise = async () => {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      return response;
    };

    toast.promise(loginPromise(), {
      loading: "Logging in...",
      success: (response) => {
        console.log(response);
        const { success } = response.data;

        if (success) {
          router.push("/");
          setIsAuthenticated(true);
          return "Login successful!";
        } else {
          throw new Error(response.data.message);
        }
      },
      error: (error: any) => {
        console.error("Login failed:", error);
        return error.message || "An error occurred";
      },
    });
  };

  return (
    <div className="auth-container">
      <h3>Login</h3>
      <form onSubmit={login} className="auth-form">
        <div className="input-group">
          <label htmlFor="email">email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">Login</button>
        <Link className="auth-form-link" href={"/forgot-password"}>
          forgot Password ?
        </Link>
        <small>
          New user?
          <Link className="auth-form-link" href={"/signup"}>
            signup
          </Link>
        </small>
      </form>
    </div>
  );
}
