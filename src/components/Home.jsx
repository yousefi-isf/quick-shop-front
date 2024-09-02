import { useAuth } from './Authentication';
import sliderUrl from '@images/slider-01.jpg';
import slider2Url from '@images/slider-02.jpg';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import helpers from '../utils/helpers';
import Footer from './Footer';
export function Slider() {
  return (
    <div className="carousel carousel-center">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={sliderUrl} className="bg-contain" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between transition-all">
          <a href="#slide2" className="btn  btn-circle">
            <ChevronRightIcon className="size-5" />
          </a>
          <a href="#slide2" className="btn btn-circle">
            <ChevronLeftIcon className="size-5" />
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={slider2Url} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn  btn-circle">
            <ChevronRightIcon className="size-5" />
          </a>
          <a href="#slide1" className="btn btn-circle">
            <ChevronLeftIcon className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
export function Prods() {
  return (
    <>
      
      <div className="carousel carousel-center bg-white rounded-box w-full gap-5">
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
        <div className="carousel-item card bg-base-100 w-80">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body pt-5 p-0 gap-5">
            <h2 className="card-title text-sm font-normal">
              ساعت هوشمند هایلو مدل Solar Pro
            </h2>
            <p className="text-end font-bold">
              {helpers.toCurrency(31000000)} تومان
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default function Home() {
  const { token } = useAuth();
  return (
    <main className="">
      <Slider />
      <div className="title flex flex-col gap-7 w-[95%] m-auto pt-10 pb-10">
        <h3 className="text-[20px] font-bold">پیشنهاد ویژه کوئیک شاپ</h3>
        <Prods />
      </div>
      <div className="title flex flex-col gap-7 w-[95%] m-auto pt-10 pb-10">
        <h3 className="text-[20px] font-bold">پیشنهاد ویژه کوئیک شاپ</h3>
        <Prods />
      </div>
    </main>
  );
}
