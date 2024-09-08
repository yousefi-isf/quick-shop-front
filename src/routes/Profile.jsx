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
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (!token) navigate('/auth');
  }, []);
  return (
    <>
      <div id="profile" className="flex-grow grid grid-cols-11 p-10 gap-5">
        <div id="menu" className="col-span-3 border-l-[2px]">
          <div
            id="profile-prev"
            className="flex items-center gap-2 font-bold border-b-2  p-5"
          >
            <img
              src="https://quickshop.liara.run/uploads/2024-09-03-11-45-guest.svg"
              alt="profile"
              className="w-12"
            />
            <div className="flex gap-2 justify-between w-full">۹۱۳۰۱۹۹۴۷۰</div>
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
    </>
  );
}
