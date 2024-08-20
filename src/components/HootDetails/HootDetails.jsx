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

const RestaurantDetails = (props) => {
  const { restaurantsId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [comment, setComment] = useState(null);
  const navigate = useNavigate();



  async function getRestaurant() {
    const restaurantData = await hootService.show(restaurantsId);
    // console.log(restaurantData);
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
    // const res = await hootService.deleter(restaurantsId);
    // console.log(res);
    // props.setRestId(null);
    await props.handleDeleteRestaurant(restaurantsId);
    //navigate(`restaurants/owner/${props.user.id}`);
  };



  const handlesubmitDelete = async (e) => {

e.preventDefault();
handleDeleteComment(restaurantsId,e.target.id);

const newRes=restaurant.comments.filter((comment)=>comment._id!==e.target.id);  

const updateRestaurant = { ...restaurant, comments: newRes }; ;
setRestaurant(updateRestaurant);

console.log(newRes);
//setRestaurant(newRes);

  }
  const handleDeleteComment = async (rId,commentId) => {
    commentService.deleteC(rId, commentId);


    // await props.handleDeleteRestaurant(restaurantsId);
    // navigate(`/owners/${props.user.id}`);
  };



  if (!restaurant) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  // console.log(restaurant);
  return (
    <main>
      <header>
        <h1>{restaurant.name.toUpperCase()}</h1>
        <h2>{restaurant.type}</h2>
        <h3>Description: {restaurant.describtion}</h3>
        <h3>Location: {restaurant.location}</h3>
        <h3>Cuisine: {restaurant.cuisine}</h3>

        <hr />
        <ul>
          <h3>Main Course: </h3>
          {restaurant.menu
            .filter((item) => item.type === "Main Course")
            .map((item) => (
              <li key={item._id}>
                <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                  {item.name}
                </Link>
                {props.user.id === restaurant.owner && (
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}/edit`}>
                        Edit 
                      </Link>
                    )}
              </li>
            ))}
        </ul>

        <hr />
        <br />

        <ul>
          <h3>Appetizer:</h3>
          {restaurant.menu
            .filter((item) => item.type === "Appetizer")
            .map((item) => (
              <li key={item._id}>
                <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                  {item.name}
                </Link>
                {props.user.id === restaurant.owner && (
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}/edit`}>
                        Edit 
                      </Link>
                    )}
              </li>
            ))}
        </ul>

        <hr />
        <br />

        <ul>
          <h3>Desserts:</h3>
          {restaurant.menu
            .filter((item) => item.type === "Dessert")
            .map((item) => (
              <li key={item._id}>
                <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                  {item.name}
                </Link>
                {props.user.id === restaurant.owner && (
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}/edit`}>
                        Edit 
                      </Link>
                    )}
                
              </li>
            ))}
        </ul>

        <hr />
        <br />

        <ul>
          <h3>Beverages: </h3>
          {restaurant.menu
            .filter((item) => item.type === "Beverage")
            .map((item) => (
              <li key={item._id}>
                <Link to={`/restaurants/${restaurant._id}/menu/${item._id}`}>
                  {item.name}
                </Link>
                  {props.user.id === restaurant.owner && (
                      <Link to={`/restaurants/${restaurant._id}/menu/${item._id}/edit`}>
                        Edit 
                      </Link>
                    )}
              </li>
            ))}
        </ul>

        <hr />
      </header>

      <section>
        {props.user.id === restaurant.owner && (
          <Link to={`/restaurants/${restaurant._id}/edit`}>
            Edit Restaurant
          </Link>
        )}

        {props.user.id === restaurant.owner && (
          <Link to={`/restaurants/${restaurant._id}/add-food`}>Add Food</Link>
        )}
        {props.user.id === restaurant.owner ? (
          <form onSubmit={handlesubmitC} action="">
            <button type="submit">delete the restaurant</button>
          </form>
        ) : null}

        <section>
          <h2>Comments on {restaurant.name.toUpperCase()}:</h2>
          <CommentForm handleAddComment={handleAddComment} />
          {restaurant.comments.length === 0 ? (
            <p>There are no comments.</p>
          ) : (
            restaurant.comments.map((comment) => (
              <div key={comment._id}>
                <form action="" id={comment._id} onSubmit={handlesubmitDelete}>
                  <p>
                    <b>{comment.authorName}</b>: {comment.text}
                  </p>

                {comment.authorId===props.user.id?<button type="submit">delete</button>:null} 
                </form>
              </div>
            ))
          )}
        </section>
      </section>
    </main>
  );
};

export default RestaurantDetails;
