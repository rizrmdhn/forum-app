import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";
import myToast from "../Toast";

function UpVote({ count = 0, hanlderUpVote, userId, isUpVoted }) {
  const onHandleSubmitDefault = () => {
    myToast.fire({
      icon: "error",
      title: "Please login to vote",
    });
  };

  if (!userId) {
    return (
      <button
        title="Up-Vote"
        className="upVote-btn"
        onClick={() => onHandleSubmitDefault()}
      >
        <p>
          <a className="bi bi-hand-thumbs-up"></a>
          {count}
        </p>
      </button>
    );
  }

  return (
    <button title="Up-Vote" className="upVote-btn" onClick={hanlderUpVote}>
      {isUpVoted.includes(userId) ? (
        <p>
          <a className="bi bi-hand-thumbs-up-fill"></a>
          {count}
        </p>
      ) : (
        <p>
          <a className="bi bi-hand-thumbs-up"></a>
          {count}
        </p>
      )}
    </button>
  );
}

UpVote.propTypes = {
  count: PropTypes.number,
  hanlderUpVote: PropTypes.func,
  userId: PropTypes.string,
  isUpVoted: PropTypes.array,
};

UpVote.defaultProps = {
  count: 0,
  userId: null,
  isUpVoted: [],
  hanlderUpVote: () => {
    myToast.fire({
      icon: "error",
      title: "Please login to vote",
    });
  },
};

export default UpVote;
