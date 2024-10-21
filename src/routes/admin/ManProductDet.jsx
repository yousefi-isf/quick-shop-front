import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authentication';
import { useOutletContext, useParams } from 'react-router';
import _ from 'lodash';

const GET_PRODUCT_DETAILS = import.meta.env.VITE_GET_PRODUCT_DETAILS;
const UPDATE_PRODUCT = import.meta.env.VITE_UPDATE_PRODUCT;

export default function ManProductDet() {
  const [prChanged, setPrChanged] = useOutletContext();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [score, setScore] = useState(0);
  const [enable, setEnable] = useState(false);
  const [inStock, setInStock] = useState(false);
  const { product_id } = useParams();
  const { token, host } = useAuth();
  console.log(name, score, inStock, enable, price);
  async function get_prod_det() {
    try {
      const res = await axios.get(
        `${host}/${GET_PRODUCT_DETAILS}/${product_id}`,
      );
      //   console.log();
      setProduct(res.data.data);
      setName(res.data.data.name);
      setPrice(res.data.data.price);
      setScore(res.data.data.score);
      setEnable(res.data.data.is_enable);
      setInStock(res.data.data.in_stock);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get_prod_det();
  }, [prChanged]);

  if (loading) {
    return <div className="skeleton w-full h-44"></div>;
  }
  async function handleUpdate() {
    try {
      const data = {
        name,
        score,
        in_stock: inStock,
        is_enable: enable,
        price,
      };
      const res = await axios.put(
        `${host}/${UPDATE_PRODUCT}/${product.slug}`,
        data,
      );
      console.log(res);
      setPrChanged((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="container flex gap-5 flex-wrap w-full justify-start mb-4">
        <label className="input input-bordered flex items-center gap-2 w-[46%]">
          نام محصول
          <input
            type="text"
            className="grow"
            placeholder="کاور سامسونگ مدل"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[40%]">
          قیمت محصول
          <input
            type="text"
            className="grow"
            placeholder="۳۲۰۰۰۰۰"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={loading}
          />
          تومان
        </label>
        <label className="input input-bordered flex items-center gap-2 w-[40%]">
          امتیاز محصول
          <input
            type="text"
            className="grow"
            placeholder="5"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            disabled={loading}
          />
        </label>
        <label className="label cursor-pointer input-bordered flex items-center gap-2 w-auto">
          <span className="label-text">قابل دسترس</span>
          <input
            type="checkbox"
            className="checkbox"
            onClick={() => setEnable((prev) => !prev)}
            disabled={loading}
            defaultChecked={enable ? true : false}
          />
        </label>
        <label className="label cursor-pointer input-bordered flex items-center gap-2 w-auto">
          <span className="label-text">موجود در انبار</span>
          <input
            type="checkbox"
            onClick={() => setInStock((prev) => !prev)}
            disabled={loading}
            defaultChecked={inStock ? true : false}
            className="checkbox checkbox-accent"
          />
        </label>
        <div className="edit w-[20%]">
          <button className="btn btn-primary w-full" onClick={handleUpdate}>
            ویرایش اطلاعات
          </button>
        </div>
      </div>
      <div className="comments flex flex-col gap-3">
        کامنت ها :
        {_.isEmpty(product.comments) ? (
          <div role="alert" className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>هیچ کامنتی برای این محصول وجود ندارد</span>
          </div>
        ) : (
          product.comments.map((com) => (
            <div className="comments-con flex flex-col gap-4 w-full">
              <div className="comment-box flex flex-col gap-5 p-5 bg-base-100 border-2 rounded-lg">
                <div className="comment-title text-[18px] flex gap-2 items-center font-bold">
                  {com.title}
                </div>
                <div className="comment-body">{com.description}</div>
                <div className="more-details flex gap-4 text-sm opacity-50">
                  <span>{com.user_id.name}</span>
                  <span>
                    تاریخ :{' '}
                    {Intl.DateTimeFormat('fa-IR').format(
                      new Date(com.created_at),
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
