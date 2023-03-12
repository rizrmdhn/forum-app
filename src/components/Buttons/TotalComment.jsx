import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";

function TotalComment({ count = 0 }) {
  return (
    <button title="TotalComment-Vote" className="TotalComment-btn">
      <p className="counter">
        <a className="bi bi-chat-square"></a>
        {count}
      </p>
    </button>
  );
}

TotalComment.propTypes = {
  count: PropTypes.number,
};

TotalComment.defaultProps = {
  count: 0,
};

export default TotalComment;
