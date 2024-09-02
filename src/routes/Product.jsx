import { useParams } from 'react-router-dom';
import productImage from '@images/product-image.jpg';
import helpers from '../utils/helpers';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { CircleStackIcon } from '@heroicons/react/24/solid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import './Product.css';

export default function Product() {
  let { product_slug } = useParams();
  return (
    <>
      <section className="grid grid-cols-9 p-10 gap-10">
        <div id="right" className="flex flex-col gap-10 col-span-7">
          <div id="first-look" className="flex gap-10">
            <div
              id="image-gallery"
              className="px-10 py-5 rounded-lg bg-base-200"
            >
              <img src={productImage} alt="product-image" className="w-96" />
            </div>
            <div id="product-title" className="flex flex-col gap-5">
              <h3 className="font-bold text-[20px]">
                گوشی موبایل تی سی ال مدل 40 NxtPaper دو سیم کارت ظرفیت 256
                گیگابایت و رم 8 گیگابایت
              </h3>
              <div
                id="more-info"
                className="flex items-center justify-between gap-3"
              >
                <span className="text-base-300">مدل</span>
                <div className="h-[2px] bg-base-200 w-full"></div>
                <span className="text-base-300 whitespace-nowrap">
                  TCL 40 NxtPaper Dual SIM 256GB 8GB RAM Mobile Phone
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
                    <tr className="">
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
                    <tr>
                      <td className="spec">مدل</td>
                      <td>Samsung Galaxy A55 5G</td>
                    </tr>
                    <tr>
                      <td className="spec">تاریخ معرفی</td>
                      <td>11 مارس 2024</td>
                    </tr>
                    <tr>
                      <td className="spec">تاریخ عرضه</td>
                      <td>15 مارس 2024</td>
                    </tr>
                    <tr>
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
                    <tr>
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
                    <tr>
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
                    <tr>
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
                    <tr>
                      <td className="spec">برند</td>
                      <td>Samsung</td>
                    </tr>
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
              <div className="comment-box flex flex-col gap-5 p-5 bg-base-100 border-r-2">
                <div className="comment-title text-[18px] flex gap-2 items-center font-bold">
                  <span className="bg-accent px-3 py-1 rounded-lg text-white font-bold text-[20px]">
                    ۴
                  </span>
                  قیمت بسیار عالی بود
                </div>
                <div className="comment-body">
                  بسیار خدمات عالی و متنوع از قبیل دادن اطلاعات درباره تلفن
                  همراه و همچنین خدمات درباره پرداخت.خیلی عالی.
                </div>
                <div className="more-details flex gap-4 text-sm opacity-50 divider divider-start">
                  <span>اعظم حسنی شهدادی</span>
                  <span>۲۲ خرداد ۱۴۰۳</span>
                </div>
              </div>
              <div className="comment-box flex flex-col gap-5 p-5 bg-base-100 border-r-2">
                <div className="comment-title text-[18px] flex gap-2 items-center font-bold">
                  <span className="bg-accent px-3 py-1 rounded-lg text-white font-bold text-[20px]">
                    ۴
                  </span>
                  قیمت بسیار عالی بود
                </div>
                <div className="comment-body">
                  بسیار خدمات عالی و متنوع از قبیل دادن اطلاعات درباره تلفن
                  همراه و همچنین خدمات درباره پرداخت.خیلی عالی.
                </div>
                <div className="more-details flex gap-4 text-sm opacity-50 divider divider-start">
                  <span>اعظم حسنی شهدادی</span>
                  <span>۲۲ خرداد ۱۴۰۳</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside id="left" className="block col-span-2 items-center">
          <div
            id="aside-box"
            className="flex flex-col gap-5 bg-base-200 p-5 rounded-3xl sticky top-10"
          >
            <div id="stock" className="flex gap-3">
              <CircleStackIcon className="size-6 text-accent" />
              موجود در انبار
            </div>
            <div id="stock" className="flex gap-3">
              <CheckBadgeIcon className="size-6 text-accent" />
              دارای گارانتی مادام العمر
            </div>
            <div id="price" className="">
              <h5 className="font-bold text-2xl text-center">
                {helpers.toCurrency(31000000)} تومان
              </h5>
            </div>
            <div id="add-to-card p-5" className="w-full">
              <button className="btn btn-accent text-accent-content w-full">
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
