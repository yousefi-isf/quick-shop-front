import { useNavigate, useParams } from 'react-router-dom';
import productImage from '@images/product-image.jpg';
import helpers from '../utils/helpers';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { MinusIcon } from '@heroicons/react/24/solid';
import './Product.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../components/Authentication';
import _ from 'lodash';
import pn from 'persian-number';
// import http
const GET_PRODUCT_DETAILS = import.meta.env.VITE_GET_PRODUCT_DETAILS;
const ADD_TO_CART = import.meta.env.VITE_ADD_TO_CART;
const GET_USER_CART = import.meta.env.VITE_GET_USER_CART;
const DELETE_ITEM_FROM_CART = import.meta.env.VITE_DELETE_ITEM_FROM_CART;
export function AddToCart({ product_slug }) {
  const { host, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAddToCart, setIsAddToCart] = useState(false);
  const [cartChanged, setCartChanged] = useState(false);
  const [cartNum, setCartNum] = useState(0);
  async function get_user_cart() {
    if (!token) {
      setLoading(false);
    }
    try {
      // const res = await fetch(`${host}/${GET_USER_CART}`, {
      //   headers: { "Authorization": `Bearer ${token}` },
      //   // ...
      // });

      const res = await axios.get(`${host}/${GET_USER_CART}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.data.data) {
        setIsAddToCart(false);
        return;
      }
      for (const pr of res.data.data.items) {
        if (pr.product.slug == product_slug) {
          setIsAddToCart(true);
          setCartNum(pr.quantity);
        }
      }

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function addToCart() {
    if (!token) navigate('/auth');
    try {
      const body = {
        product_slug,
        quantity: 1,
      };
      const res = await axios.post(`${host}/${ADD_TO_CART}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCartChanged((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromCart() {
    try {
      const body = {
        product_slug,
      };
      const res = await axios.put(`${host}/${DELETE_ITEM_FROM_CART}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setCartChanged((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    get_user_cart();
  }, [cartChanged]);

  if (loading) {
    return <div className="skeleton w-full h-10 rounded-md"></div>;
  }

  return (
    <div id="add-to-card p-5" className="w-full flex flex-col justify-center">
      {!isAddToCart ? (
        <button
          className="btn btn-accent text-accent-content w-full"
          onClick={addToCart}
        >
          افزودن به سبد خرید
        </button>
      ) : (
        <>
          <div className="self-center badge badge-info p-3">
            موجود در سبد خرید
          </div>
          <div className="text-accent-content w-full flex justify-between gap-2 items-center">
            <button className="btn btn-circle" onClick={addToCart}>
              <PlusIcon className="size-4" />
            </button>
            {pn.convertEnToPe(cartNum)}
            <button className="btn btn-circle" onClick={removeFromCart}>
              <MinusIcon className="size-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Product() {
  let { product_name, product_slug } = useParams();
  const { host, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  console.log(product);

  async function get_product_details() {
    setLoading(true);
    try {
      const _product = await axios.get(
        `${host}/${GET_PRODUCT_DETAILS}/${product_slug}`,
      );
      setProduct(_product.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    get_product_details();
  }, []);

  if (loading) {
    return (
      <progress className="progress h-[5px] progress-accent absolute top-0"></progress>
    );
  }
  return (
    <>
      {product && (
        <section className="flex-grow grid grid-cols-9 p-10 gap-10">
          <div id="right" className="flex flex-col gap-10 col-span-7">
            <div id="first-look" className="flex gap-10">
              <div
                id="image-gallery"
                className="px-10 py-5 rounded-lg bg-base-200"
              >
                <img
                  src={product?.photo.path}
                  alt="product-image"
                  className="w-96"
                />
              </div>
              <div id="product-title" className="flex flex-col gap-5 w-3/5">
                <h3 className="font-bold text-[20px]">{product?.name}</h3>
                <div
                  id="more-info"
                  className="flex items-center justify-between gap-3 w-full"
                >
                  <span className="text-base-300">مدل</span>
                  <div className="h-[2px] bg-base-200 w-full"></div>
                  <span className="text-base-300 whitespace-nowrap">
                    {product?.name}
                  </span>
                </div>
              </div>
            </div>
            <div id="specificatoins" className="flex flex-col gap-5">
              <div
                id="spec-title"
                className="title flex gap-2 items-center font-bold text-[20px]"
              >
                <QueueListIcon className="size-5 text-accent" />
                مشخصات کالا
              </div>
              <div id="table-spec">
                <div className="overflow-x-auto">
                  <table className="table table-zebra border-separate border-spacing-y-4">
                    <tbody className="gap-10 space-x-5">
                      {Object.keys(product.specifications).map((key) => (
                        <tr>
                          <td className="spec">{key}</td>
                          <td>{product.specifications[key]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div id="comments" className="w-5/6">
              <div
                id="comment-title"
                className="flex gap-2 items-center font-bold text-[20px]"
              >
                <ChatBubbleOvalLeftIcon className="size-5 text-accent" />
                نظرات
                <button className="btn btn-outline btn-accent">
                  ثبت نظر جدید
                </button>
              </div>
              <div
                id="comment-container"
                className="box pt-5 flex flex-col gap-8"
              >
                {_.isEmpty(product.comments) && (
                  <div id="no-comment">
                    اولین نفر باشید تا نظر خوبتون رو بهمون در مورد این محصول
                    اعلام کنید 🧡ّ
                  </div>
                )}
                {!_.isEmpty(product.comments) &&
                  product.comments.map((com) => (
                    <div className="comment-box flex flex-col gap-5 p-5 bg-base-100 border-r-2">
                      <div className="comment-title text-[18px] flex gap-2 items-center font-bold">
                        {com.title}
                      </div>
                      <div className="comment-body">{com.description}</div>
                      <div className="more-details flex gap-4 text-sm opacity-50 divider divider-start">
                        {/* <span>{com.user_id.name}</span> */}
                        <span>
                          {new Intl.DateTimeFormat('fa-IR').format(
                            new Date(com.created_at),
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <aside id="left" className="block col-span-2 items-center">
            <div
              id="aside-box"
              className="flex flex-col gap-5 bg-base-200 p-5 rounded-3xl sticky top-10"
            >
              {product.in_stock ? (
                <div id="stock" className="flex gap-3">
                  <CircleStackIcon className="size-6 text-accent" />
                  موجود در انبار
                </div>
              ) : (
                <div id="stock" className="flex gap-3">
                  <CircleStackIcon className="size-6 text-accent" />
                  ناموجود در انبار
                </div>
              )}
              <div id="waranty" className="flex gap-3">
                <CheckBadgeIcon className="size-6 text-accent" />
                دارای گارانتی مادام العمر
              </div>
              <div id="price" className="">
                <h5 className="font-bold text-2xl text-center">
                  {helpers.toCurrency(product.price)} تومان
                </h5>
              </div>
              <AddToCart product_slug={product_slug} />
            </div>
          </aside>
        </section>
      )}
    </>
  );
}
