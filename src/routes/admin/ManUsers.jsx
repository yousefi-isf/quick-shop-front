import { useEffect, useState } from 'react';
import { useAuth } from '../../components/Authentication';
import axios from 'axios';
import { convertEnToPe } from 'persian-number';

const GET_USER_LIST = import.meta.env.VITE_GET_USER_LIST;

export default function ManUsers() {
  const { token, host } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  async function get_user_list() {
    try {
      const res = await axios.get(`${host}/${GET_USER_LIST}`);
      setUsers(res.data.data.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    get_user_list();
  }, []);

  if (loading) {
    return <div className="skeleton w-full h-44"></div>;
  }

  return (
    <div id="users-container" className="flex flex-col gap-5">
      {users.map((user) => (
        <div className="user-item collapse border-2 p-3 rounded-lg">
          <input type="checkbox" />
          <div className="collapse-title flex gap-3 items-center ">
            <img
              src={
                'https://quickshop.liara.run/uploads/2024-09-03-11-45-guest.svg'
              }
              alt=""
              className="w-20"
            />
            <div className="name font-bold text-lg">{user.name}</div>
            <div>
              ساخته شده در تاریخ{' '}
              <span className="font-bold">
                {new Intl.DateTimeFormat('fa-IR', {
                  dateStyle: 'full',
                }).format(new Date(user.created_at))}
              </span>
            </div>
          </div>
          <div className="collapse-content">
            مشخصات کاربری :
            <div
              id="collapse-container"
              className="flex flex-col gap-3 bg-base-200 p-5 rounded-lg mt-3"
            >
              <div className="item flex gap-2 font-bold">
                شماره همراه :
                <div className="value">{convertEnToPe(user.mobile)}</div>
              </div>
              <div className="item flex gap-2 font-bold">
                امتیاز در کوئیک شاپ :
                <div className="value">{convertEnToPe(user.score)}</div>
              </div>
              <div className="item flex gap-2 font-bold">
                جنسیت :
                <div className="value">
                  {user.gender == 'man' ? 'مرد' : 'زن'}
                </div>
              </div>
              <div className="item flex gap-2 font-bold">
                آدرس :<div className="value">{user.address ?? 'بدون آدرس'}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
