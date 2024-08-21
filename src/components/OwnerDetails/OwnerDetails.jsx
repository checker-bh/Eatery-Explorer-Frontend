import { useParams, Link } from 'react-router-dom'; // Import Link
import { useEffect, useState } from 'react';
import hootService from '../../services/hootService';
import './OwnerDetails.css';

const OwnerDetails = () => {
  const { ownerId } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantsAndOwner = async () => {
      try {
        const restaurantsData = await hootService.index(); // Fetch all restaurants
        setRestaurants(restaurantsData.filter(restaurant => restaurant.owner === ownerId));

        const ownerData = await hootService.getOwnerById(ownerId); // Fetch owner details
        setOwner(ownerData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsAndOwner();
  }, [ownerId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="owner-details-main">
      <header className="owner-details-header">
        <h1 className="owner-details-heading">Restaurants Owned by {owner ? owner.username : 'Loading...'}</h1>
        <div className="owner-details-content">
          {restaurants.length === 0 ? (
            <p className="owner-details-no-restaurants">No restaurants found.</p>
          ) : (
            <ul className="owner-details-list">
              {restaurants.map((restaurant) => (
                <li key={restaurant._id} className="owner-details-item">
                  <Link to={`/restaurants/${restaurant._id}`} className="owner-details-link">
                    <article className="owner-details-article">
                      <p className="owner-details-restaurant-name">{restaurant.name}</p>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </main>
  );
};

export default OwnerDetails;
