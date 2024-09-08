import { useAuth } from './Authentication';
import sliderUrl from '@images/slider-01.jpg';
import slider2Url from '@images/slider-02.jpg';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductBox from './ProductBox';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';

// apis
const GET_PRODUCTS = import.meta.env.VITE_GET_PRODUCTS;

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

export function ProductCarousel({ products, loading }) {
  const [prCount, setPrCount] = useState(5);
  console.log(products, loading);
  return (
    <>
      <div className="carousel carousel-center bg-white rounded-box w-full gap-5">
        {loading &&
          Array.from({ length: prCount }).map(() => (
            <div className="flex w-80 flex-col gap-5">
              <div className="skeleton h-48 w-full"></div>
              <div className="skeleton h-4 w-56"></div>
              <div className="skeleton h-4 w-28 self-end"></div>
            </div>
          ))}
        {products?.map((pr) => (
          <ProductBox
            prName={pr.name}
            prPrice={pr.price}
            prPhoto={pr.photo.path}
            prSlug={`${pr.slug}/${_.kebabCase(pr.name)}`}
          />
        ))}
      </div>
    </>
  );
}
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [offerProducsts, setOfferProducsts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  console.log(offerProducsts, discountProducts);
  const { host } = useAuth();

  async function getOfferProducts() {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/${GET_PRODUCTS}?limit=10&page=1`);
      setLoading(false);
      setOfferProducsts(res.data.data.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function getDiscountProducts() {
    setLoading(true);
    try {
      const res = await axios.get(`${host}/${GET_PRODUCTS}?limit=10&page=2`);
      setLoading(false);
      setDiscountProducts(res.data.data.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOfferProducts();
    getDiscountProducts();
  }, []);

  return (
    <main className="flex-grow">
      <Slider />
      <div className="title flex flex-col gap-7 w-[95%] m-auto pt-10 pb-10">
        <h3 className="text-[20px] font-bold">پیشنهاد ویژه کوئیک شاپ</h3>

        <ProductCarousel products={offerProducsts} loading={loading} />
      </div>
      <div className="title flex flex-col gap-7 w-[95%] m-auto pt-10 pb-10">
        <h3 className="text-[20px] font-bold"> تخفیف دارهای کوئیک شاپ</h3>
        <ProductCarousel products={discountProducts} loading={loading} />
      </div>
    </main>
  );
}
