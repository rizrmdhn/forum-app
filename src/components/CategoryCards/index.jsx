import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";

function CategoryCards({ categories, FilterThreadAsCategory, datas }) {
  const [isShowAllCategory] = useState(false);

  const onHandleFilterThreadAsCategory = (category) => {
    FilterThreadAsCategory(category === datas ? "" : category);
  };

  return (
    <div className="CategoryCards card">
      <div className="CategoryCards-header card-header">Kategory Popular</div>
      <div className="CategoryCards-body card-body">
        <div className="CategoryCards-body-item">
          <div className="CategoryCards-tags">
            {categories
              .sort((a, b) => b.threadId.length - a.threadId.length)
              .slice(0, isShowAllCategory ? categories.length : 5)
              .map((item) => (
                <button
                  id={`kategori-${item.category}`}
                  className={
                    datas === item.category
                      ? "Tags-item item-active"
                      : "Tags-item"
                  }
                  key={item.id}
                  onClick={() => onHandleFilterThreadAsCategory(item.category)}
                >
                  <span className="CategoryCards-tags-item">#</span>
                  <span className="CategoryCards-tags-item">
                    {item.category}
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
  categories: PropTypes.array.isRequired,
  FilterThreadAsCategory: PropTypes.func.isRequired,
  datas: PropTypes.string.isRequired,
};

export default CategoryCards;
