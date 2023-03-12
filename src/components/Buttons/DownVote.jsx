import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";
import { useDispatch } from "react-redux";
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
} from "../../states/thread/action";

function DownVote({ count = 0, threadId, userId, isDownVoted }) {
  const dispatch = useDispatch();

  const handleDownVote = (threadIds) => {
    if (isDownVoted.includes(userId)) {
      dispatch(asyncNeutralVoteThread(threadIds));
    } else {
      dispatch(asyncDownVoteThread(threadIds));
    }
  };
  return (
    <button
      title="Down-Vote"
      className="downVote-btn"
      onClick={() => handleDownVote(threadId)}
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
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isDownVoted: PropTypes.array.isRequired,
};

DownVote.defaultProps = {
  count: 0,
};

export default DownVote;
