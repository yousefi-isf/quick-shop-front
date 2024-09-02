import { DevicePhoneMobileIcon } from '@heroicons/react/16/solid';
import logo from '@images/logo.png';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Authentication';
import { CodeBracketIcon } from '@heroicons/react/16/solid';


export default function Auth() {
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState('');
  const [succ, setSucc] = useState(false);

  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, []);

  return (
    <div
      id="login-signup"
      className="h-screen flex items-center justify-center"
    >
      <div className="w-[25%] flex flex-col justify-center gap-5">
        <div id="image" className="w-[80%] m-auto">
          <img src={logo} alt="logo" />
        </div>
        <h3 className="text-center font-black">ورود به فروشگاه</h3>
        {!ready ? (
          <SendOtp
            ready={ready}
            error={error}
            setError={setError}
            setReady={setReady}
            mobile={mobile}
            setMobile={setMobile}
          />
        ) : (
          <SubmitOtp
            error={error}
            mobile={mobile}
            setError={setError}
            succ={succ}
            setSucc={setSucc}
          />
        )}
        <div
          id="useful-links"
          className="flex font-light justify-between text-[16px] text-gray-500"
        >
          <Link to={'/'} className="">
            صفحه اصلی
          </Link>
          <Link to={'/'} className="">
            حریم خصوصی
          </Link>
          <Link to={'/'} className="">
            سوالات متداول
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SubmitOtp({ error, mobile, setError, succ, setSucc }) {
  const [digits, setDigits] = useState('');
  const [errMes, setErrMes] = useState('');
  const [loading, setLoading] = useState(false);

  const { submitOtp, login } = useAuth();

  async function handleClick() {
    setLoading(true);
    if (error) return;
    const res = await submitOtp(digits, mobile);
    if (res?.data?.accessToken) {
      login(res.data.accessToken);
      setSucc(true);
      setLoading(false);
    } else {
      setSucc(false);
      setError(true);
      setErrMes(res);
      setLoading(false);
    }
  }

  function handleChange(e) {
    if (e.target.value.match(/^[0-9]*$/)) {
      setDigits(e.target.value);
      setError(false);
    } else {
      setError(true);
      setErrMes('کد وارد شده معتبر نیست (4 رقم)');
      setDigits((prev) => prev);
    }
  }

  return (
    <div id="submit-otp" className="flex flex-col gap-5">
      <div className="codes flex justify-between gap-5">
        <label
          className={
            'input input-bordered flex items-center gap-2 grow ' +
            (error ? 'input-error' : '')
          }
        >
          <CodeBracketIcon className="size-5"></CodeBracketIcon>
          <input
            type="text"
            placeholder="کد تایید"
            maxLength="4"
            value={digits}
            onChange={handleChange}
          />
        </label>
      </div>
      {error && <div className="invalid-error text-error">{errMes}</div>}
      <button
        className="btn btn-accent border-base-300 text-accent-content hover:bg-accent hover:text-accent-content flex justify-center font-bold "
        disabled={error}
        onClick={handleClick}
      >
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          'تایید کد تایید'
        )}
      </button>
    </div>
  );
}

export function SendOtp({ mobile, setMobile, error, setError, setReady }) {
  const { sendOtp } = useAuth();
  const disabled = error || mobile.length == 0 ? true : false;
  const [loading, setLoading] = useState(false);

  // const [disabled, setDisabled] = useState(
  //   error || mobile.length == 0 ? true : false,
  // );
  // validation
  function handleKeyUp(e) {
    if (
      !e.target.value.match(/^\d{0,10}$/) ||
      !e.target.value.match(/^(?:98|\+98|0098|0)?9[0-9]{9}$/)
    ) {
      setError(true);
    } else {
      setError(false);
    }
  }

  // store mobile
  function handleChange(e) {
    setMobile(e.target.value);
  }

  // send otp to api
  async function handleClick() {
    setLoading(true);
    if (error) return;
    const _code = await sendOtp(mobile);
    if (_code) {
      setReady(true);
      console.log(_code);
    }
    setLoading(false);
  }

  // function disabled() {
  //   if (error || mobile.length == 0) {
  //     return true;
  //   } else {
  //     false;
  //   }
  // }

  return (
    <div id="send-otp" className="flex flex-col gap-5">
      <label
        className={
          'input input-bordered flex items-center gap-2 ' +
          (error ? 'input-error' : '')
        }
      >
        <DevicePhoneMobileIcon className="size-5"></DevicePhoneMobileIcon>
        <input
          type="text"
          className=""
          placeholder="شماره همراه"
          maxLength="10"
          onKeyUp={handleKeyUp}
          onChange={handleChange}
        />
      </label>
      {error && (
        <div className="invalid-error text-error">شماره همراه معتبر نیست</div>
      )}
      <button
        className={
          'btn btn-accent border-base-300 text-accent-content hover:bg-accent hover:text-accent-content flex justify-center font-bold'
        }
        disabled={disabled}
        onClick={handleClick}
      >
        {loading ? (
          <span className="loading loading-dots loading-md"></span>
        ) : (
          'ارسال کد تایید'
        )}
      </button>
    </div>
  );
}
