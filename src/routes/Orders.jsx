import { Link } from 'react-router-dom';
import helpers from '../utils/helpers';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Authentication';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
const GET_USER_FACTORS = import.meta.env.VITE_GET_USER_FACTORS;
export default function Orders() {
  const location = useLocation();
  const { host, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  async function get_user_factors() {
    try {
      const res = await axios.get(`${host}/${GET_USER_FACTORS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);
      setOrders(res.data.data ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get_user_factors();
  }, []);
  if (loading) {
    return <div className="skeleton w-full h-40"></div>;
  }
  return (
    <>
      {location.pathname === '/profile/orders' && (
        <>
          <div id="profile-orders" className="flex flex-col gap-5">
            {orders.map((order) => (
              <Link
                to={order.order_number}
                id="order-box"
                className="flex w-full p-10 rounded-lg bg-base-200 flex-col gap-5"
              >
                <div id="number" className="flex gap-3 justify-between">
                  <div>
                    سفارش شماره{' '}
                    <span className="font-bold">{order.order_number}</span>
                  </div>
                  <p className="text-accent font-bold">
                    در حال آماده سازی سفارش
                  </p>
                </div>
                <div
                  id="order-total-price"
                  className="flex justify-between items-center"
                >
                  <div className="date">
                    {new Intl.DateTimeFormat('fa-IR').format(
                      new Date(order.created_at),
                    )}
                  </div>
                  <div className="price font-bold text-[22px]">
                    کل مبلغ پرداختی : {helpers.toCurrency(order.total_price)}{' '}
                    تومان
                  </div>
                </div>
                <div className="product-prev">
                  {order.items.map((pr) => (
                    <Link
                      to={`/${pr.product.slug}/${pr.product.name}`}
                      className="flex gap-3 items-center bg-white p-5 rounded-xl"
                    >
                      <img
                        className="w-20 rounded-lg"
                        src={pr.product.photo.path}
                        alt="jsdfl"
                      />
                      <p>{pr.product.name}</p>
                    </Link>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          {_.isEmpty(orders) && (
            <div
              id="no-order"
              className="font-bold h-full flex flex-col justify-center items-center gap-5"
            >
              شما هیچ سفارشی ندارید 😥
              <Link className="btn" to={'/'}>
                قدم زدن در فروشگاه
              </Link>
            </div>
          )}
        </>
      )}

      <div id="order-detail">
        <Outlet />
      </div>
    </>
  );
}
