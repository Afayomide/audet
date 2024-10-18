// pages/forgot-password.tsx
import { useState } from 'react';
import "./auth.css"
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email,
      });

      if (response.status === 200) {
        toast.success('Password reset link sent to your email!');
      } else {
        toast.error('Error sending reset link. Please try again.');
      }
    } catch (error: any) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className='input-group'>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}
