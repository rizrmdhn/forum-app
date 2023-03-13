import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";
import myToast from "../Toast";

function DownVote({ count = 0, handlerDownVote, userId, isDownVoted }) {
  const onHandleSubmitDefault = () => {
    myToast.fire({
      icon: "error",
      title: "Please login to vote",
    });
  };

  if (!userId) {
    return (
      <button
        title="Down-Vote"
        className="downVote-btn"
        onClick={() => onHandleSubmitDefault()}
      >
        <p className="counter">
          <a className="bi bi-hand-thumbs-down"></a>
          {count}
        </p>
      </button>
    );
  }

  return (
    <button
      title="Down-Vote"
      className="downVote-btn"
      onClick={handlerDownVote}
    >
      {isDownVoted.includes(userId) ? (
        <p className="counter">
          <a className="bi bi-hand-thumbs-down-fill"></a>
          {count}
        </p>
      ) : (
        <p className="counter">
          <a className="bi bi-hand-thumbs-down"></a>
          {count}
        </p>
      )}
    </button>
  );
}

DownVote.propTypes = {
  count: PropTypes.number,
  handlerDownVote: PropTypes.func,
  userId: PropTypes.string,
  isDownVoted: PropTypes.array,
};

DownVote.defaultProps = {
  count: 0,
  userId: null,
  isDownVoted: [],
  handlerDownVote: () => {
    myToast.fire({
      icon: "error",
      title: "Please login to vote",
    });
  },
};

export default DownVote;
