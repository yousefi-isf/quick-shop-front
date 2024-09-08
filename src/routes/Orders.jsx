import { Link } from 'react-router-dom';
import helpers from '../utils/helpers';
export default function Orders() {
  return (
    <>
      <div id="profile-orders" className=" flex flex-col gap-5">
        {/* <Link
          id="order-box"
          className="flex w-full p-10 rounded-lg bg-base-200 flex-col gap-5"
        >
          <div id="number">
            سفارش شماره <span className="font-bold">۰۰۹۲۳۹۸۷۷۴</span>
          </div>
          <div
            id="order-total-price"
            className="flex justify-between items-center"
          >
            <div className="date">۱۴۰۳/۰۵/۳۰</div>
            <div className="price font-bold text-[22px]">
              {helpers.toCurrency(3200000)} تومان
            </div>
          </div>
        </Link>
        <Link
          id="order-box"
          className="flex w-full p-10 rounded-lg bg-base-200 flex-col gap-5"
        >
          <div id="number">
            سفارش شماره <span className="font-bold">۰۰۹۲۳۹۸۷۷۴</span>
          </div>
          <div
            id="order-total-price"
            className="flex justify-between items-center"
          >
            <div className="date">۱۴۰۳/۰۵/۳۰</div>
            <div className="price font-bold text-[22px]">
              {helpers.toCurrency(3200000)} تومان
            </div>
          </div>
        </Link> */}
      </div>
      <div
        id="no-order"
        className="font-bold h-full flex flex-col justify-center items-center gap-5"
      >
        شما هیچ سفارشی ندارید 😥
        <Link className="btn" to={'/'}>
          قدم زدن در فروشگاه
        </Link>
      </div>
    </>
  );
}
