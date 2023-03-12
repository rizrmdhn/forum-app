import React from "react";
import "./styles/styles.css";

function CategoryCards() {
  return (
    <div className="CategoryCards card">
      <div className="CategoryCards-header card-header">Kategory Popular</div>
      <div className="CategoryCards-body card-body">
        <div className="CategoryCards-body-item">
          <div className="CategoryCards-tags">
            <a className="Tags-item">
              <span className="CategoryCards-tags-item">#</span>
              <span className="CategoryCards-tags-item">Kategori</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryCards;
