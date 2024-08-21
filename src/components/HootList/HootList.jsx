import { Link } from 'react-router-dom';
import AuthorDate from '../common/AuthorDate';
import './RestaurantsList.css';

const RestaurantsList = ({ restaurants }) => {
  if (!restaurants.length) return <main className="loading">Loading...</main>;

  return (
    <main className="restaurants-list-container">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="restaurant-item">
          <Link to={`/restaurants/${restaurant._id}`} className="restaurant-link">
            <article className="restaurant-article">
              {/* Uncomment the header section if needed */}
              {/* <header className="restaurant-header">
                <h2 className="restaurant-title">{restaurant.title}</h2>
                <AuthorDate name={restaurant?.owner?.username ?? "Anonymous"} date={restaurant.createdAt} />
              </header> */}
              <p className="restaurant-name">{restaurant.name}</p>
            </article>
          </Link>
        </div>
      ))}
    </main>
  );
};

export default RestaurantsList;
