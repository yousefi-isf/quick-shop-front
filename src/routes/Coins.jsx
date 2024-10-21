import { useEffect, useState } from 'react';
import { useAuth } from '../components/Authentication';
import axios from 'axios';
import { convertEnToPe } from 'persian-number';
const GET_USER_PROFILE = import.meta.env.VITE_GET_USER_PROFILE;
export default function Coins() {
  const { host, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userScore, setUserScore] = useState();
  async function get_user_score() {
    try {
      const res = await axios.get(`${host}/${GET_USER_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserScore(res.data.data.score);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get_user_score();
  }, []);
  if (loading) {
    return <div className="skeleton w-40 h-20"></div>;
  }
  return (
    <>
      امتیاز شما در کوئیک شاپ : {convertEnToPe(userScore)}
      <div role="alert" className="alert mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>بعد از ثبت سبد خرید خود به ازای هر محصول ۵ امتیاز به شما تعلق میگیرد</span>
      </div>
    </>
  );
}
