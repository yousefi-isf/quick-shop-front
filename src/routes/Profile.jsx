import { useEffect } from 'react';
import { useAuth } from '../components/Authentication';
import { useNavigate } from 'react-router';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import helpers from '../utils/helpers';
import { InboxIcon } from '@heroicons/react/24/outline';
import {
  CircleStackIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';
import { Square2StackIcon } from '@heroicons/react/24/outline';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import {
  TagIcon,
  UsersIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline';

import { useState } from 'react';
import axios from 'axios';
import { convertEnToPe } from 'persian-number';
const GET_USER_PROFILE = import.meta.env.VITE_GET_USER_PROFILE;

export default function Profile() {
  const { host, token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  async function get_user_score() {
    try {
      const res = await axios.get(`${host}/${GET_USER_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatar(res.data.data.avatar.path);
      setName(res.data.data.name);
      setIsAdmin(res.data.data.role.name == 'admin' ? true : false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (!token) navigate('/auth');
    get_user_score();
  }, []);

  if (loading) {
    return <div className="skeleton w-full h-full p-10"></div>;
  }

  return (
    <>
      {isAdmin ? (
        <div id="profile" className="flex-grow grid grid-cols-11 p-10 gap-5">
          <div id="menu" className="col-span-3 border-l-[2px]">
            <div
              id="profile-prev"
              className="flex items-center gap-2 font-bold border-b-2 p-5"
            >
              <img src={avatar} alt="profile" className="w-12" />
              <div className="flex gap-2 justify-between w-full">
                {convertEnToPe(name)}
              </div>
              <div className="rol badge badge-info">مدیریت</div>
            </div>
            <div className="items flex flex-col justify-center sticky top-32">
              <Link
                className="orders flex gap-2 p-7  hover:bg-base-200"
                to={'track-orders'}
              >
                <ClipboardDocumentIcon className="size-5" />
                پیگیری سفارشات
              </Link>
              <Link
                className="orders flex gap-2 p-7  hover:bg-base-200"
                to={'manage-users'}
              >
                <UsersIcon className="size-5" />
                مدیریت کاربران
              </Link>
              <Link
                className="orders flex gap-2 p-7  hover:bg-base-200"
                to={'manage-products'}
              >
                <Square2StackIcon className="size-5" />
                مدیریت محصولات
              </Link>
              {/* <Link
                className="orders flex gap-2 p-7  hover:bg-base-200"
                to={'manage-categories'}
              >
                <TagIcon className="size-5" />
                مدیریت دسته بندی
              </Link> */}
              <Link
                className="orders flex gap-2 p-7  text-error hover:bg-base-200"
                onClick={logout}
              >
                <ArrowLeftStartOnRectangleIcon className="size-5" />
                خروج از پنل مدیریت
              </Link>
            </div>
          </div>
          <div id="detail" className="col-span-8">
            {location.pathname === '/profile' && (
              <div className="h-full flex flex-col justify-center items-center font-bold">
                پنل مدیریت کوئیک شاپ 🔑
              </div>
            )}
            <Outlet />
          </div>
        </div>
      ) : (
        <div id="profile" className="flex-grow grid grid-cols-11 p-10 gap-5">
          <div id="menu" className="col-span-3 border-l-[2px]">
            <div
              id="profile-prev"
              className="flex items-center gap-2 font-bold border-b-2  p-5"
            >
              <img src={avatar} alt="profile" className="w-12" />
              <div className="flex gap-2 justify-between w-full">
                {convertEnToPe(name)}
              </div>
            </div>
            <div className="items flex flex-col justify-center">
              <Link
                className="orders flex gap-2 p-7 border-b-2 hover:bg-base-200"
                to={`orders`}
              >
                <InboxIcon className="size-5" />
                سفارشات
              </Link>
              <Link
                className="orders flex gap-2 p-7 border-b-2 hover:bg-base-200"
                to="coins"
              >
                <CircleStackIcon className="size-5" />
                باشگاه مشتریان
              </Link>
              <Link
                className="orders flex gap-2 p-7 border-b-2 text-info hover:bg-base-200"
                to="info"
              >
                <IdentificationIcon className="size-5" />
                مشخصات کاربری
              </Link>
              <Link
                className="orders flex gap-2 p-7  text-error hover:bg-base-200"
                onClick={logout}
                to={'/'}
              >
                <ArrowLeftStartOnRectangleIcon className="size-5" />
                خروج
              </Link>
            </div>
          </div>
          <div id="detail" className="col-span-8">
            {location.pathname === '/profile' && (
              <div className="h-full flex flex-col justify-center items-center font-bold">
                🎉 به کوئیک شاپ خوش آمدید
              </div>
            )}
            <Outlet />
          </div>
        </div>
      )}
      {/* <div id="profile" className="flex-grow grid grid-cols-11 p-10 gap-5">
        <div id="menu" className="col-span-3 border-l-[2px]">
          <div
            id="profile-prev"
            className="flex items-center gap-2 font-bold border-b-2  p-5"
          >
            <img src={avatar} alt="profile" className="w-12" />
            <div className="flex gap-2 justify-between w-full">
              {convertEnToPe(name)}
            </div>
          </div>
          <div className="items flex flex-col justify-center">
            <Link
              className="orders flex gap-2 p-7 border-b-2 hover:bg-base-200"
              to={`orders`}
            >
              <InboxIcon className="size-5" />
              سفارشات
            </Link>
            <Link
              className="orders flex gap-2 p-7 border-b-2 hover:bg-base-200"
              to="coins"
            >
              <CircleStackIcon className="size-5" />
              باشگاه مشتریان
            </Link>
            <Link
              className="orders flex gap-2 p-7 border-b-2 text-info hover:bg-base-200"
              to="info"
            >
              <IdentificationIcon className="size-5" />
              مشخصات کاربری
            </Link>
            <Link
              className="orders flex gap-2 p-7  text-error hover:bg-base-200"
              onClick={logout}
              to={'/'}
            >
              <ArrowLeftStartOnRectangleIcon className="size-5" />
              خروج
            </Link>
          </div>
        </div>
        <div id="detail" className="col-span-8">
          {location.pathname === '/profile' && (
            <div className="h-full flex flex-col justify-center items-center font-bold">
              🎉 به کوئیک شاپ خوش آمدید
            </div>
          )}
          <Outlet />
        </div>
      </div> */}
    </>
  );
}
