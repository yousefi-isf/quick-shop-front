export default function Info() {
  return (
    <div className="h-full justify-center items-center flex flex-col gap-5 w-full">
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        نام و نام خانوادگی
        <input type="text" className="grow" placeholder="محمد یوسفی" />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        شماره همراه
        <input type="text" className="grow" placeholder="شماره همراه" />
      </label>
      <label className="input input-bordered flex items-center gap-2 w-1/2">
        کد پستی
        <input type="text" className="grow" placeholder="کد پستی" />
      </label>
      <label className="form-control w-1/2">
        <div className="label">
          <span className="label-text text-[16px]">آدرس</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="اصفهان - دروازه تهران"
        ></textarea>
      </label>
      <div id="gender" className="flex items-center gap-5 w-1/2">
        جنسیت :
        <label className="label cursor-pointer w-max flex gap-3">
          <span className="label-text">مرد</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked
          />
        </label>
        <label className="label cursor-pointer w-max flex gap-3">
          <span className="label-text">زن</span>
          <input
            type="radio"
            name="radio-10"
            className="radio"
            defaultChecked
          />
        </label>
      </div>
      <button className="btn btn-accent w-1/2">ویرایش اطلاعات</button>
    </div>
  );
}
