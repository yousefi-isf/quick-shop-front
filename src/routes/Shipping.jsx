import { useEffect, useState } from 'react';
import { useAuth } from '../components/Authentication';
import { useNavigate } from 'react-router';
import helpers from '../utils/helpers';
import axios from 'axios';
import _ from 'lodash';

const GET_USER_PROFILE = import.meta.env.VITE_GET_USER_PROFILE;
const ADD_FACTOR = import.meta.env.VITE_ADD_FACTOR;
const GET_USER_CART = import.meta.env.VITE_GET_USER_CART;
export default function Shipping() {
  const { token, host } = useAuth();

  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [addressErr, setAddressErr] = useState('');
  const [postalErr, setPostalErr] = useState('');
  const [err, setErr] = useState(true);
  const [postal, setPostal] = useState('');

  async function get_user_profile() {
    try {
      const res = await axios.get(`${host}/${GET_USER_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = res.data.data;
      setAddress(user.address ?? '');
      setPostal(user.postal_code ?? '');
    } catch (error) {
      console.log(error);
    }
  }

  async function get_user_cart() {
    try {
      const res = await axios.get(`${host}/${GET_USER_CART}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.data.data) {
        navigate('/cart');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) navigate('/auth');
    get_user_profile();
    get_user_cart();
  }, []);

  function handleAddress(e) {
    setAddress(e.target.value);
    setAddressErr('');
  }
  function handlePostal(e) {
    setPostal(e.target.value);
    setPostalErr('');
  }

  function handlePayment() {
    if (_.isEmpty(address)) {
      setAddressErr('آدرس معتبر نیست');
      setErr(true);
    } else {
      setAddressErr('');
      setErr(false);
    }
    if (
      !postal.match(/\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/) ||
      _.isEmpty(postal)
    ) {
      setPostalErr('کد پستی معتبر نیست');
      setErr(true);
    } else {
      setPostalErr('');
      setErr(false);
    }
    !err || add_factor();
  }
  async function add_factor() {
    const body = {
      delivery_address: address,
      postal_code: postal,
    };
    try {
      await axios.post(`${host}/${ADD_FACTOR}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/profile/orders');
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <>
      <div className="flex-grow p-10 grid grid-cols-9 gap-10">
        <div className="right col-span-5 flex flex-col gap-5">
          آدرس و اطلاعات :
          <label className="input input-bordered flex items-center gap-2">
            آدرس محل
            <input
              type="text"
              className="grow"
              placeholder="خ صفه و .."
              value={address}
              onChange={(e) => {
                handleAddress(e);
                // VALAddress(address);
              }}
            />
            {addressErr && <p className="text-error">{addressErr}</p>}
          </label>
          <label className="input input-bordered flex items-center gap-2">
            کدپستی
            <input
              type="text"
              className="grow"
              placeholder="000000"
              value={postal}
              onChange={(e) => handlePostal(e)}
            />
            {postalErr && <p className="text-error">{postalErr}</p>}
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
              <button
                className="btn btn-accent text-accent-content w-full"
                onClick={handlePayment}
              >
                پرداخت نهایی
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
