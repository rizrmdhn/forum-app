import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";

function CategoryCards({ threadList, FilterThreadAsCategory }) {
  const onHandleFilterThreadAsCategory = (category) => {
    FilterThreadAsCategory(category);
  };

  return (
    <div className="CategoryCards card">
      <div className="CategoryCards-header card-header">Kategory Popular</div>
      <div className="CategoryCards-body card-body">
        <div className="CategoryCards-body-item">
          <div className="CategoryCards-tags">
            {threadList.map((thread) => (
              <button
                className="Tags-item"
                key={thread.id}
                onClick={() => onHandleFilterThreadAsCategory(thread.category)}
              >
                <span className="CategoryCards-tags-item">#</span>
                <span className="CategoryCards-tags-item">
                  {thread.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

CategoryCards.propTypes = {
  threadList: PropTypes.array.isRequired,
  FilterThreadAsCategory: PropTypes.func.isRequired,
};

export default CategoryCards;
