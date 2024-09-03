import { Link } from 'react-router-dom';
import helpers from '../utils/helpers';

export default function ProductBox({ prName, prPrice, prPhoto, prSlug }) {
  return (
    <Link to={`/${prSlug}`}>
      <div className="carousel-item card bg-base-100 w-80">
        <figure>
          <img src={prPhoto} alt="Shoes" />
        </figure>
        <div className="card-body pt-5 p-0 gap-5">
          <h2 className="card-title text-sm font-normal">{prName}</h2>
          <p className="text-end font-bold">
            {helpers.toCurrency(prPrice)} تومان
          </p>
        </div>
      </div>
    </Link>
  );
}
