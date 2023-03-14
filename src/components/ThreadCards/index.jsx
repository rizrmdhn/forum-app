import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./styles/styles.css";
import UpVote from "../Buttons/UpVote";
import DownVote from "../Buttons/DownVote";
import TotalComment from "../Buttons/TotalComment";
import postedAt from "../../utils";
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from "../../states/thread/action";
import useLocale from "../../hooks/useLocale";

function ThreadCards({ threads, authUser }) {
  const { locale } = useSelector((state) => state);

  const { textCreatedBy } = useLocale();

  const dispatch = useDispatch();

  const handleUpVote = (threadId, isUpVoted) => {
    if (isUpVoted.includes(authUser.id)) {
      dispatch(asyncNeutralVoteThread(threadId));
    } else {
      dispatch(asyncUpVoteThread(threadId));
    }
  };

  const handleDownVote = (threadId, isDownVoted) => {
    if (isDownVoted.includes(authUser.id)) {
      dispatch(asyncNeutralVoteThread(threadId));
    } else {
      dispatch(asyncDownVoteThread(threadId));
    }
  };

  if (!authUser) {
    return (
      <>
        {threads.map((thread) => (
          <div className="threadCards card" key={thread.id}>
            <div className="card-body">
              <h6 className="threadTags card-tags">#{thread.category}</h6>
              <h6 className="threadTitle card-title mb-2">
                <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
              </h6>
              <div
                className="threadContents card-text"
                dangerouslySetInnerHTML={{ __html: thread.body }}
              ></div>
            </div>
            <div className="threadFooter card-footer">
              <div className="thread-action-button">
                <UpVote
                  count={thread.upVotesBy.length}
                  isUpVoted={thread.upVotesBy}
                />
                <DownVote
                  count={thread.downVotesBy.length}
                  isDownVoted={thread.downVotesBy}
                />
                <TotalComment count={thread.totalComments} />
              </div>
              <small className="UpdatedAt text-muted">
                {postedAt({ date: thread.createdAt, locale })}
              </small>
              <div className="threads-owner">
                <small className="Creator text-muted">
                  {textCreatedBy}
                  <img
                    src={thread.creator.avatar}
                    alt={thread.creator.name}
                    className="userIcon"
                  />
                  <b>{thread.creator.name}</b>
                </small>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {threads.map((thread) => (
        <div className="threadCards card" key={thread.id}>
          <div className="card-body">
            <h6 className="threadTags card-tags">#{thread.category}</h6>
            <h6 className="threadTitle card-title mb-2">
              <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
            </h6>
            <div
              className="threadContents card-text"
              dangerouslySetInnerHTML={{ __html: thread.body }}
            ></div>
          </div>
          <div className="threadFooter card-footer">
            <div className="thread-action-button">
              <UpVote
                count={thread.upVotesBy.length}
                hanlderUpVote={() => handleUpVote(thread.id, thread.upVotesBy)}
                userId={authUser.id}
                isUpVoted={thread.upVotesBy}
              />
              <DownVote
                count={thread.downVotesBy.length}
                handlerDownVote={() =>
                  handleDownVote(thread.id, thread.downVotesBy)
                }
                userId={authUser.id}
                isDownVoted={thread.downVotesBy}
              />
              <TotalComment count={thread.totalComments} />
            </div>
            <small className="UpdatedAt text-muted">
              {postedAt({ date: thread.createdAt, locale })}
            </small>
            <div className="threads-owner">
              <small className="Creator text-muted">
                {textCreatedBy}
                <img
                  src={thread.creator.avatar}
                  alt={thread.creator.name}
                  className="userIcon"
                />
                <b>{thread.creator.name}</b>
              </small>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

ThreadCards.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.object,
};

ThreadCards.defaultProps = {
  authUser: null,
};

export default ThreadCards;
