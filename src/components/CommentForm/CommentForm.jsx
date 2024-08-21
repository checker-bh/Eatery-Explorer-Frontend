// src/components/CommentForm/CommentForm.jsx

import { useState } from 'react';
import './CommentForm.css'; // Import the CSS file

const CommentForm = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <div className="comment-form-container">
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-group">
          <textarea
            required
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
            placeholder="Write your comment here..."
            className="comment-textarea"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Submit Comment</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
