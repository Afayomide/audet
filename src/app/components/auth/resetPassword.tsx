// pages/reset-password.tsx
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import "./auth.css"

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const searchTerm = useSearchParams()
  const token = searchTerm.get('token')
  const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

//   useEffect(() => {
//     // const { token } = router.query;
//     if (typeof token === 'string') {
//       setToken(token);
//     }
//   }, [router.query]);
console.log(token)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reset-password`, {
        token,
        password,
      });

      if (response.status === 200) {
        toast.success('Password has been reset successfully!');
        router.push('/login'); // Redirect to login or another page
      } else {
        toast.error('Error resetting password. Please try again.');
      }
    } catch (error: any) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className='input-group'>
            <label htmlFor="password">New Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> 
        </div>
       
       <div className='input-group'>
         <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
       </div>
       
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
