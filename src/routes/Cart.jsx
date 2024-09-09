import { useEffect, useState } from 'react';
import { useAuth } from '../components/Authentication';
import { useNavigate } from 'react-router';
import helpers from '../utils/helpers';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
const GET_USER_CART = import.meta.env.VITE_GET_USER_CART;
export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [cart, setCart] = useState();
  const { token, host } = useAuth();
  const navigate = useNavigate();
  async function get_user_cart() {
    try {
      const res = await axios.get(`${host}/${GET_USER_CART}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.data.data) {
        setErr(true);
      }
      console.log(res.data.data);
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }
    get_user_cart();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow p-10 grid grid-cols-9 gap-10">
        <div className="col-span-6 skeleton h-auto w-full"></div>
        <div className="col-span-3 skeleton h-auto w-full"></div>
      </div>
    );
  }
  if (err) {
    return (
      <div className="flex-grow h-screen flex flex-col justify-center items-center">
        هیچ کالایی در سبد خرید شما نیست
      </div>
    );
  }

  return (
    <>
      <div className="flex-grow p-10 grid grid-cols-9 gap-10 transition-all">
        <div className="right col-span-5 flex flex-col gap-5">
          {cart.items.map((item) => (
            <Link
              to={`/${item.product.slug}/${_.kebabCase(item.product.name)}`}
            >
              <div className="pr-box w-full bg-base-200 p3 p-5 rounded-lg flex items-center justify-between gap-3">
                <img src={item.product.photo.path} className="w-1/3" />
                {item.quantity}
                <div>{item.product.name}</div>
                <h5 className="font-bold text-md text-center">
                  {helpers.toCurrency(item.product.price)} تومان
                </h5>
              </div>
            </Link>
          ))}
        </div>
        <div className="left col-span-4">
          <div
            id="aside-box"
            className="flex flex-col gap-5 bg-base-200 p-5 rounded-3xl sticky top-10"
          >
            اطلاعات پرداخت
            <div id="price" className="flex gap-2 justify-between items-center">
              <h5 className="font-normal text-sm text-center">
                مبلغ قابل پرداخت :{' '}
              </h5>
              <h5 className="font-bold text-2xl text-center">
                {helpers.toCurrency(cart.total_price)} تومان
              </h5>
            </div>
            <div id="add-to-card p-5" className="w-full">
              <Link className="btn btn-accent text-accent-content w-full" to={"/shipping"}>
                ادامه خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
