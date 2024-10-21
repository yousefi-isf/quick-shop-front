import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../components/Authentication';
import axios from 'axios';
import _ from 'lodash';
import { convertEnToPe } from 'persian-number';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import helpers from '../../utils/helpers';

const GET_PRODUCTS_LIST = import.meta.env.VITE_GET_PRODUCTS_LIST;
const DELETE_PRODUCT = import.meta.env.VITE_REMOVE_PRODCUT;
export default function ManProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prChanged, setPrChanged] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const { token, host } = useAuth();

  async function get_pros() {
    try {
      const res = await axios.get(`${host}/${GET_PRODUCTS_LIST}?page=${page}`);
      setProducts(res.data.data.docs);
      setPage(res.data.data.page);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const location = useLocation();
  useEffect(() => {
    get_pros();
  }, [prChanged]);

  async function handleRemove(slug) {
    try {
      await axios.delete(`${host}/${DELETE_PRODUCT}/${slug}`);
      setPrChanged((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <div className="skeleton w-full h-44"></div>;
  }
  return (
    <>
      {location.pathname === '/profile/manage-products' && (
        <div id="container" className="flex flex-col gap-5">
          {products.map((pr) => (
            <Link
              className="item flex gap-3 border-2 p-5 rounded-lg items-center justify-between"
              to={`${pr.slug}`}
            >
              <div className="prev flex gap-3 items-center">
                <img
                  src={pr.photo.path}
                  alt="ldaskf"
                  className="w-28 rounded-md"
                />
                {pr.name}
              </div>
              <div className="price flex gap-3">
                <p className="font-black text-xl text-gray-400">
                  {convertEnToPe(helpers.toCurrency(pr.price))} تومان
                </p>
              </div>

              <div className="edit flex gap-3 items-center">
                <Link
                  className="btn btn-info"
                  to={`/${pr.slug}/${_.kebabCase(pr.name)}`}
                >
                  مشاهده صفحه محصول
                </Link>
                <button
                  className="btn btn-error"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(pr.slug);
                  }}
                >
                  حذف
                </button>
              </div>
            </Link>
          ))}
          <div className="pagination flex justify-center">
            <div className="join gap-5 bg-base-200">
              <button className="join-item btn">
                <ArrowRightCircleIcon className="size-5" />
              </button>
              <button className="join-item bg-base-200">صفحه ۱ از ۲</button>
              <button className="join-item btn">
                <ArrowLeftCircleIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pro-det">
        <Outlet context={[prChanged, setPrChanged]} />
      </div>
    </>
  );
}
