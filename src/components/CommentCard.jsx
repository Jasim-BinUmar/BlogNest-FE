import React, { useState } from 'react';

const CommentCard = ({ user, comment, isLoggedInUser, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(editedComment);
  };

  return (
    <div className="bg-primary border border-orange rounded-md p-4 mb-4">
      <h3 className="font-bold bg-lightBlue text-blue rounded-lg mb-3 shadow-md p-2">{user}</h3>

      {isEditing ? (
        <textarea
          className="w-full p-2 border border-orange rounded-md mb-2"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
      ) : (
        <p className="text-blue">{comment}</p>
      )}

      {isLoggedInUser && (
        <div className="mt-2 flex gap-2">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-3 py-1 rounded-md"
            >
              Save
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-3 py-1 rounded-md"
            >
              Edit
            </button>
          )}
          <button
            onClick={onDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
