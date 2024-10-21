import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAuth } from '../components/Authentication';
const EDIT_USER_PROFILE = import.meta.env.VITE_EDIT_USER_PROFILE;
const GET_USER_PROFILE = import.meta.env.VITE_GET_USER_PROFILE;
export default function Info() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [postal, setPostal] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('man');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { token, host } = useAuth();
  console.log(postal, address);
  async function update_user_prof() {
    setUpdateLoading(true);
    try {
      const data = {
        name,
        mobile,
        postal_code: postal,
        address,
        gender,
      };
      const res = await axios.put(`${host}/${EDIT_USER_PROFILE}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdateLoading(false);
      setIsOpen((prev) => !prev);
    }
  }

  async function get_user_prof() {
    try {
      const res = await axios.get(`${host}/${GET_USER_PROFILE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPostal(res.data.data.postal_code ?? '');
      setName(res.data.data.name);
      setMobile(res.data.data.mobile);
      setGender(res.data.data.gender);
      setAddress(res.data.data.address ?? '');
    } catch (error) {
      console.log(error);
    } finally {
      setGetLoading(false);
    }
  }
  useEffect(() => {
    get_user_prof();
    console.log('use effs');
  }, []);
  function handleName(e) {
    setName(e.target.value);
  }
  function handleMobile(e) {
    setMobile(e.target.value);
  }
  function handlePostal(e) {
    setPostal(e.target.value);
  }
  function handleAddress(e) {
    setAddress(e.target.value);
  }
  function handleGender(e) {
    setGender(e.target.value);
  }

  return (
    <div className="h-full justify-center items-center flex flex-col gap-5 w-full">
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        نام و نام خانوادگی
        <input
          type="text"
          className="grow"
          placeholder="محمد یوسفی"
          value={name}
          onChange={handleName}
          disabled={!isOpen}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        شماره همراه
        <input
          type="text"
          className="grow"
          placeholder="شماره همراه"
          value={mobile}
          onChange={handleMobile}
          disabled={!isOpen}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        کد پستی
        <input
          type="text"
          className="grow"
          placeholder="کد پستی"
          value={postal}
          onChange={handlePostal}
          disabled={!isOpen}
        />
      </label>
      <label className="form-control w-1/2">
        <div className="label">
          <span className="label-text text-[16px]">آدرس</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="اصفهان - دروازه تهران"
          value={address}
          onChange={handleAddress}
          disabled={!isOpen}
        ></textarea>
      </label>
      <div id="gender" className="flex items-center gap-5 w-1/2">
        جنسیت :
        <label className="label cursor-pointer w-max flex gap-3">
          <span className="label-text">مرد</span>
          <input
            type="radio"
            className="radio"
            name="radio-1"
            value="man"
            checked={gender == 'man'}
            onChange={handleGender}
            defaultChecked
            disabled={!isOpen}
          />
          <span className="label-text">زن</span>
          <input
            type="radio"
            className="radio"
            name="radio-1"
            value="woman"
            checked={gender == 'woman'}
            onChange={handleGender}
            defaultChecked
            disabled={!isOpen}
          />
        </label>
      </div>
      <div className=" w-1/2">
        {updateLoading ? (
          <div className="loading loading-spinner loading-md"></div>
        ) : (
          !isOpen && (
            <button
              className="btn btn-accent w-full"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              ویرایش اطلاعات
            </button>
          )
        )}
        {isOpen && (
          <button className="btn btn-accent w-full" onClick={update_user_prof}>
            تایید اطلاعات
          </button>
        )}
      </div>
    </div>
  );
}
