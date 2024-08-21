import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import hootService from "../../services/hootService";
import commentService from "../../services/commentService";

// Components
import CommentForm from "../CommentForm/CommentForm";
import './FoodDetails.css'; // Import the CSS file

const FoodDetails = (props) => {
  const { restaurantId, foodId } = useParams();

  const [food, setFood] = useState(null);
  const [restoId, setRestoId] = useState(null);

  useEffect(() => {
    async function getFood() {
      const foodData = await hootService.showFood(restaurantId, foodId);
      setFood(foodData);
      setRestoId(restaurantId);
    }
    getFood();
  }, [foodId]);

  const handleAddComment = async (formData) => {
    const newComment = await commentService.createFC(
      restaurantId,
      foodId,
      formData
    );

    const copyFood = { ...food };
    copyFood.comments.push(newComment);
    setFood(copyFood);
  };

  const handlesubmitDelete = async (e) => {
    e.preventDefault();
    handleDeleteComment(restaurantId, foodId, e.target.id);

    const newRes = food.comments.filter((comment) => comment._id !== e.target.id);

    const updateFood = { ...food, comments: newRes };
    setFood(updateFood);
  };

  const handleDeleteComment = async (rId, foodId, commentId) => {
    await commentService.deleteFoodComment(rId, foodId, commentId);
  };

  if (!food) {
    return <main className="food-details-container">Loading...</main>;
  }

  return (
    <div className="food-details-container">
      <div className="food-info">
        <h4>{food.name}</h4>
        <ul>
          <li>Dish Type: {food.type}</li>
          <li>Dish Description: {food.description}</li>
          <li>Price: {food.price}</li>
        </ul>
      </div>

      <div className="comments-section">
        {food.comments.length === 0 ? (
          <>
            <h4>No comments yet</h4>
            <CommentForm handleAddComment={handleAddComment} />
          </>
        ) : (
          <>
            <h4>Comments:</h4>
            <CommentForm handleAddComment={handleAddComment} />
            <ul className="comments-list">
              {food.comments.map((comment) => (
                <li key={comment._id} className="comment-item">
                  <form action="" id={comment._id} onSubmit={handlesubmitDelete}>
                    <p>
                      <b>{comment.authorName}</b>: {comment.text}
                    </p>
                    {comment.authorId === props.user.id && (
                      <button type="submit">Delete</button>
                    )}
                  </form>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
