import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./styles/styles.css";
import UpVote from "../Buttons/UpVote";
import DownVote from "../Buttons/DownVote";
import TotalComment from "../Buttons/TotalComment";
import postedAt from "../../utils";

function ThreadCards({ threads, authUser }) {
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
                threadId={thread.id}
                userId={authUser.id}
                isUpVoted={thread.upVotesBy}
              />
              <DownVote
                count={thread.downVotesBy.length}
                threadId={thread.id}
                userId={authUser.id}
                isDownVoted={thread.downVotesBy}
              />
              <TotalComment count={thread.totalComments} />
            </div>
            <small className="UpdatedAt text-muted">
              {postedAt(thread.createdAt)}
            </small>
            <small className="Creator text-muted">
              Dibuat oleh <b>{thread.creator.name}</b>
            </small>
          </div>
        </div>
      ))}
    </>
  );
}

ThreadCards.propTypes = {
  threads: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default ThreadCards;
