import { useEffect } from 'react';
import { useAuth } from '../components/Authentication';
import { useNavigate } from 'react-router';
import helpers from '../utils/helpers';
export default function Blog() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/auth');
  }, []);
  return (
    <>
      <div className="flex-grow p-10 grid grid-cols-9 gap-10">
        <div className="right col-span-5 flex flex-col gap-5">
          آدرس و اطلاعات :
          <label className="input input-bordered flex items-center gap-2">
            آدرس محل
            <input type="text" className="grow" placeholder="خ صفه و .." />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            کدپستی
            <input type="text" className="grow" placeholder="000000" />
          </label>
          نحوه ارسال :
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text flex gap-2">
                پست{' '}
                <img
                  src="https://www.mobit.ir/_nuxt/img/post.75980ba.png"
                  className="w-5"
                />{' '}
              </span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-yellow-500"
                defaultChecked
              />
            </label>
          </div>
        </div>
        <div className="left col-span-4">
          <div
            id="aside-box"
            className="flex flex-col gap-5 bg-base-200 p-5 rounded-3xl sticky top-10"
          >
            اطلاعات پرداخت
            <div
              id="sent-price"
              className="flex gap-2 justify-between items-center"
            >
              <h5 className="font-normal text-sm text-center">
                هزینه ارسال :{' '}
              </h5>
              <h5 className="font-bold text-2xl text-center">
                {helpers.toCurrency(32000000)} تومان
              </h5>
            </div>
            <div id="price" className="flex gap-2 justify-between items-center">
              <h5 className="font-normal text-sm text-center">
                مبلغ قابل پرداخت :{' '}
              </h5>
              <h5 className="font-bold text-2xl text-center">
                {helpers.toCurrency(32000000)} تومان
              </h5>
            </div>
            <div id="add-to-card p-5" className="w-full">
              <button className="btn btn-accent text-accent-content w-full">
                پرداخت نهایی
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
