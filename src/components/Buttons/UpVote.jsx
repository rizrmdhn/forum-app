import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./styles/styles.css";
import {
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../../states/thread/action";

function UpVote({ count = 0, threadId, userId, isUpVoted }) {
  const dispatch = useDispatch();

  const handleUpVote = (threadIds) => {
    if (isUpVoted.includes(userId)) {
      dispatch(asyncNeutralVoteThread(threadIds));
    } else {
      dispatch(asyncUpVoteThread(threadIds));
    }
  };

  return (
    <button
      title="Up-Vote"
      className="upVote-btn"
      onClick={() => handleUpVote(threadId)}
    >
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
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isUpVoted: PropTypes.array.isRequired,
};

UpVote.defaultProps = {
  count: 0,
};

export default UpVote;
