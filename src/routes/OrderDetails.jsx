import { useParams } from 'react-router-dom';
import helpers from '../utils/helpers';
import { Link } from 'react-router-dom';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Authentication';
import _ from 'lodash';
import { convertEnToPe } from 'persian-number';

const GET_FACTOR = import.meta.env.VITE_GET_FACTOR;

export default function OrderDetails() {
  const { token, host } = useAuth();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  let { order_number } = useParams();
  async function get_factor() {
    try {
      const res = await axios.get(`${host}/${GET_FACTOR}/${order_number}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get_factor();
  }, []);

  if (loading) {
    return <div className="skeleton w-full h-48"></div>;
  }
  return (
    <>
      <Link
        to={'..'}
        className="btn text-sm mb-5 bg-transparent border-transparent hover:bg-transparent hover:border-transparent p-2 shadow-none text-accent"
      >
        <ArrowRightCircleIcon className="size-5" />
        بازگشت به سفارشات
      </Link>
      <div
        id="order-detail"
        className="flex flex-col gap-5 p-5 border-2 rounded-2xl"
      >
        <div id="order-title" className=" flex justify-between">
          سفارش {order.order_number}
          <p className="text-accent">در حال آماده سازی سفارش</p>
        </div>
        <div id="items-container" className="flex flex-col gap-5">
          <div id="inof-title" className="text-lg">
            اقلام :
          </div>
          {order.items.map((pr) => (
            <Link
              to={`/${pr.product.slug}/${_.kebabCase(pr.product.name)}`}
              className="w-full"
            >
              <div className="pr-box w-full bg-base-200 p3 p-5 rounded-lg flex items-center justify-between gap-3">
                <img src={pr.product.photo.path} className="w-20" />
                {convertEnToPe(pr.quantity)}
                <div>{pr.product.name}</div>
                <h5 className="font-bold text-md text-center">
                  {helpers.toCurrency(pr.price)} تومان
                </h5>
              </div>
            </Link>
          ))}
        </div>
        <div id="order-info" className="flex flex-col gap-5">
          <div id="inof-title" className="text-lg">
            مشخصات سفارش :
          </div>
          <div className="info-container bg-base-200 p-5 rounded-lg flex flex-col gap-5">
            <div className="flex gap-2">
              <p className="font-bold text-md">آدرس محل تحویل :</p>
              <p>{order.delivery_address}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-md">کد پستی :</p>
              <p>{convertEnToPe(order.postal_code)}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-md"> شماره همراه :</p>
              <p>{convertEnToPe(order.user_id.mobile)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
