import logo from '@images/logo.png';
import { useEffect, useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon as ShoppingBagIconSolid } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { useAuth } from './Authentication';
import pn, { convertEnToPe } from 'persian-number';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon, InboxIcon } from '@heroicons/react/24/outline';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import _ from 'lodash';

const GET_USER_PROFILE = import.meta.env.VITE_GET_USER_PROFILE;
const GET_USER_CART = import.meta.env.VITE_GET_USER_CART;
export default function Header() {
  // const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  return (
    <>
      <header className="flex items-center flex-row justify-between w-full max-h-max py-5 px-10 border-b-2 sticky top-0 z-50 bg-white">
        <div id="logo">
          <Link to={'/'}>
            <img className="w-48" src={logo} alt="" />
          </Link>
        </div>

        <div id="search">
          <label className="input bg-base-200 input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow placeholder:text-base-content "
              placeholder="جستجو"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div id="accont-card" className="flex items-center">
          {!token ? (
            <Link to={'/auth'}>
              <button className="btn btn-ghost border-base-300 text-accent-content hover:bg-accent hover:text-accent-content font-normal">
                ورود | ثبت نام
              </button>
            </Link>
          ) : (
            <Account />
          )}
        </div>
      </header>
    </>
  );
}
export function Account() {
  const [loading, setLoading] = useState(false);
  const [uname, setUname] = useState('');
  const [cartNum, setCartNum] = useState();
  const [role, setRole] = useState('guest');
  const { token, logout } = useAuth();
  const [err, setErr] = useState('');
  const { host, cartChanged } = useAuth();
  async function get_cart_badge() {
    try {
      const cart = await axios.get(`${host}/${GET_USER_CART}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartNum(cart.data.data?.items?.length ?? 0);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUserProfile() {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/${GET_USER_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUname(res.data.data.name);
      setRole(res.data.data.role.name);
      setErr('');
      setLoading(false);
      console.log(res.data.data.address);
    } catch (error) {
      console.log(error);
      if (error.code == 'ERR_NETWORK') {
        setErr('خطا در برقراری ارتباط');
      }
      if (error.code == 'ECONNABORTED') {
        setErr('خطا در برقراری ارتباط');
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  useEffect(() => {
    get_cart_badge();
  }, [cartChanged]);

  function handleClick() {
    logout();
  }

  return (
    <>
      {/* <span className="loading loading-spinner loading-md"></span> */}
      <div className="dropdown dropdown-hover gap-10">
        <div tabIndex={0} role="button" className="btn m-1 dropdown-space">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            ''
          )}
          {!_.isEmpty(err) ? (
            <div className="badge badge-error p-2 font-light">{err}</div>
          ) : (
            <>
              <h3 className="font-bold">{pn.convertEnToPe(uname)}</h3>
              {role == 'guest' ? (
                <div className="badge p-2 font-light">حساب‌کاربری</div>
              ) : (
                <div className="badge badge-info font-bold p-2 ">مدیریت</div>
              )}
            </>
          )}
        </div>
        <ul
          tabIndex={1}
          className="dropdown-content menu bg-white rounded-box z-[1] w-auto p-2"
        >
          <li>
            <Link className="gap-1 hover:text-info" to={'/profile'}>
              <InformationCircleIcon className="size-5" />
              حساب کابری
            </Link>
          </li>
          <li>
            <Link className="gap-1" to={'/profile/orders'}>
              <InboxIcon className="size-5 " />
              سفارشات
            </Link>
          </li>
          <li>
            <Link className="gap-1 hover:text-error" onClick={handleClick}>
              <ArrowRightCircleIcon className="size-5" />
              خروج
            </Link>
          </li>
        </ul>
      </div>
      {token && cartNum ? (
        <>
          <div className="divider divider-horizontal"></div>

          <Link id="card" to={'/cart'} className="flex">
            <div className="badge badge-ghost absolute mt-5 mr-[-10px]  px-1 py-3">
              {convertEnToPe(cartNum)}
            </div>
            <ShoppingBagIconSolid className="size-7" />
          </Link>
        </>
      ) : (
        <>
          <div className="divider divider-horizontal"></div>

          <Link id="card" to={'/cart'} className="flex">
            <ShoppingBagIcon className="size-7" />
          </Link>
        </>
      )}
    </>
  );
}
