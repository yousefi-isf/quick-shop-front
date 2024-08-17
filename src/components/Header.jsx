import logo from '@images/logo.png';
import { useState } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && (
        <progress class="progress h-[3px] progress-accent"></progress>
      )}
      <header className="flex items-center flex-row justify-between m-auto w-[90%] pt-4">
        <div id="logo">
          <img className="w-48" src={logo} alt="" />
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
        <div id="accont-card" className="flex items-center gap-5">
          <button className="btn btn-ghost border-base-300 text-accent-content hover:bg-accent hover:text-accent-content font-normal">
            ورود | ثبت نام
          </button>
          <div id="card">
            <ShoppingBagIcon className="size-7" />
          </div>
        </div>
      </header>
    </>
  );
}
