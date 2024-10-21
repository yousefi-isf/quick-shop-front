import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../../components/Authentication';
import axios from 'axios';
const GET_ALL_ORDERS = import.meta.env.VITE_GET_ALL_ORDERS;
const SEND_FACTOR = import.meta.env.VITE_SEND_FACTOR;
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import helpers from '../../utils/helpers';
import _ from 'lodash';
export default function TrackOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [compOrders, setCompOrders] = useState([]);
  const { host, token } = useAuth();
  const [toggle, setToggle] = useState(true);
  const [orderChanged, setOrderChanged] = useState(false);
  const location = useLocation();
  //   console.log(compOrders);
  async function get_all_orders() {
    try {
      const res = await axios.get(`${host}/${GET_ALL_ORDERS}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);
      const not_comp_orders = res.data.data.filter(
        (fact) => fact.status != 'POST',
      );
      setOrders(not_comp_orders);
      const comp_orders = res.data.data.filter((fact) => fact.status == 'POST');
      setCompOrders(comp_orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    get_all_orders();
  }, [orderChanged]);

  function handleToggle() {
    setToggle((prev) => !prev);
  }
  async function handleSendFactor(order_number) {
    try {
      const res = await axios.put(
        `${host}/${SEND_FACTOR}/${order_number}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setOrderChanged((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.log(first);
    }
  }
  if (loading) {
    return <div className="skeleton w-full h-4/5"></div>;
  }

  return (
    <>
      {location.pathname === '/profile/track-orders' && (
        <>
          <div id="profile-orders" className="flex flex-col gap-5">
            <div role="tablist" className="tabs tabs-boxed tabs-md">
              <a
                role="tab"
                className={`tab ${toggle ? 'tab-active' : ''}`}
                onClick={handleToggle}
              >
                در حال آماده سازی
              </a>
              <a
                role="tab"
                className={`tab ${toggle ? '' : 'tab-active'}`}
                onClick={handleToggle}
              >
                ارسال شده
              </a>
            </div>
            {_.isEmpty(compOrders) && (
              <div className="flex flex-col h-full justify-center items-center">
                هیچ سفارش ارسالی وجود ندارد
              </div>
            )}
            {toggle
              ? orders.map((order) => (
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
                      <div className="date flex gap-2">
                        <p>ثبت شد در تاریخ</p>
                        {new Intl.DateTimeFormat('fa-IR').format(
                          new Date(order.created_at),
                        )}
                      </div>
                      <div className="date">{order.score} امتیاز</div>
                      <div className="price font-bold text-[22px]">
                        کل مبلغ پرداخت شده :{' '}
                        {helpers.toCurrency(order.total_price)} تومان
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <img src="" alt="" />
                      <div id="user-name"></div>
                    </div>
                    <div className="product-prev flex flex-col gap-3">
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
                    <div id="send-post" className="w-full">
                      <button
                        className="btn btn-primary w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSendFactor(order.order_number);
                        }}
                      >
                        ارسال مرسوله
                      </button>
                    </div>
                  </Link>
                ))
              : compOrders.map((order) => (
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
                      <p className="text-primary font-bold">ارسال شده</p>
                    </div>
                    <div
                      id="order-total-price"
                      className="flex justify-between items-center"
                    >
                      <div className="date flex gap-2">
                        <p>ثبت شد در تاریخ</p>
                        {new Intl.DateTimeFormat('fa-IR').format(
                          new Date(order.created_at),
                        )}
                      </div>
                      <div className="date">{order.score} امتیاز</div>
                      <div className="price font-bold text-[22px]">
                        کل مبلغ پرداخت شده :{' '}
                        {helpers.toCurrency(order.total_price)} تومان
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <img src="" alt="" />
                      <div id="user-name"></div>
                    </div>
                    <div className="product-prev flex flex-col gap-3">
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
              هیچ سفارشی برای نمایش وجود ندارد
            </div>
          )}
        </>
      )}

      <div id="order-detail">
        <Outlet context={[handleSendFactor, orderChanged, setOrderChanged]} />
      </div>
    </>
    // <>track orders</>
  );
}
