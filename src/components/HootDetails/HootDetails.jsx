import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FoodDetails from "../foodDetails/foodDetails";
// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Components
import AuthorDate from "../common/AuthorDate";
import CommentForm from "../CommentForm/CommentForm";
import './RestaurantDetails.css'; // Import the CSS file

const RestaurantDetails = (props) => {
  const { restaurantsId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();

  async function getRestaurant() {
    const restaurantData = await hootService.show(restaurantsId);
    setRestaurant(restaurantData);
    setComment(restaurantData.comments);
    props.setRestId(restaurantsId);
  }

  useEffect(() => {
    getRestaurant();
  }, [restaurantsId]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.create(restaurantsId, formData);

    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      comments: [...prevRestaurant.comments, newComment],
    }));
  };

  const handlesubmitC = async (e) => {
    e.preventDefault();
    await props.handleDeleteRestaurant(restaurantsId);
  };

  const handlesubmitDelete = async (e) => {
    e.preventDefault();
    handleDeleteComment(restaurantsId, e.target.id);

    const newRes = restaurant.comments.filter(
      (comment) => comment._id !== e.target.id
    );

    const updateRestaurant = { ...restaurant, comments: newRes };
    setRestaurant(updateRestaurant);
  };

  const handleDeleteComment = async (rId, commentId) => {
    await commentService.deleteC(rId, commentId);
  };

  if (!restaurant) {
    return (
      <main className="restaurant-details-container">
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main className="restaurant-details-container">
      <header className="restaurant-header">
        <div className="restaurant-info">
          <h1>{restaurant.name.toUpperCase()}</h1>
          <h2>{restaurant.type}</h2>
          <h3>Description: {restaurant.description}</h3>
          <h3>Location: {restaurant.location}</h3>
          <h3>Cuisine: {restaurant.cuisine}</h3>
        </div>
        <div className="menu-section">
          {restaurant.menu.filter((item) => item.type === "Main Course").length > 0 && (
            <>
              <h3>Main Courses: </h3>
              <ul>
                {restaurant.menu
                  .filter((item) => item.type === "Main Course")
                  .map((item) => (
                    <li key={item._id}>
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {restaurant.menu.filter((item) => item.type === "Appetizer").length > 0 && (
            <>
              <h3>Appetizers: </h3>
              <ul>
                {restaurant.menu
                  .filter((item) => item.type === "Appetizer")
                  .map((item) => (
                    <li key={item._id}>
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {restaurant.menu.filter((item) => item.type === "Dessert").length > 0 && (
            <>
              <h3>Desserts: </h3>
              <ul>
                {restaurant.menu
                  .filter((item) => item.type === "Dessert")
                  .map((item) => (
                    <li key={item._id}>
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {restaurant.menu.filter((item) => item.type === "Beverage").length > 0 && (
            <>
              <h3>Beverages: </h3>
              <ul>
                {restaurant.menu
                  .filter((item) => item.type === "Beverage")
                  .map((item) => (
                    <li key={item._id}>
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </header>

      <section className="action-section">
        {props.user.id === restaurant.owner && (
          <div>
            <Link to={`/restaurants/${restaurant._id}/edit`} className="action-link">
              Edit Restaurant
            </Link>
            <Link to={`/restaurants/${restaurant._id}/add-food`} className="action-link">
              Add Food
            </Link>
            <form onSubmit={handlesubmitC} className="delete-form">
              <button type="submit">Delete the Restaurant</button>
            </form>
          </div>
        )}
      </section>

      <section className="comments-section">
        <h2>Comments on {restaurant.name.toUpperCase()}:</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {restaurant.comments.length === 0 ? (
          <p>There are no comments.</p>
        ) : (
          restaurant.comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <form action="" id={comment._id} onSubmit={handlesubmitDelete} className="comment-form">
                <p>
                  <b>{comment.authorName}</b>: {comment.text}
                </p>
                {comment.authorId === props.user.id && (
                  <button type="submit">Delete</button>
                )}
              </form>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default RestaurantDetails;
