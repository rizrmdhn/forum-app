import React from "react";
import "./styles/styles.css";
import PropTypes from "prop-types";
import UpVote from "../Buttons/UpVote";
import DownVote from "../Buttons/DownVote";
import TotalComment from "../Buttons/TotalComment";
import postedAt from "../../utils";

function DetailThreadCards({
  category,
  title,
  body,
  createdAt,
  name,
  comment,
  upVotesBy,
  downVotesBy,
  totalComments,
  threadId,
  userId,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <div className="detailThreadCards card">
      <div className="card-body">
        <h6 className="detailThreadTags card-tags">{category}</h6>
        <h6 className="detailThreadTitle card-title mb-2">{title}</h6>
        <div
          className="detailthreadContents card-text"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
      </div>
      <div className="detailthreadFooter card-footer">
        <div className="thread-action-button">
          <UpVote
            count={upVotesBy}
            threadId={threadId}
            userId={userId}
            isUpVoted={isUpVoted}
          />
          <DownVote
            count={downVotesBy}
            threadId={threadId}
            userId={userId}
            isDownVoted={isDownVoted}
          />
          <TotalComment count={totalComments} />
        </div>
        <small className="UpdatedAt text-muted">{postedAt(createdAt)}</small>
        <small className="Creator text-muted">
          Dibuat oleh <b>{name}</b>
        </small>
      </div>
      <div className="detailThreadComments">
        <div className="addNewCommentContainer">
          <div className="addNewCommentTitle">
            <h6>Beri Komentar</h6>
          </div>
          <div className="addNewCommentContainerInput">
            <input type="text" placeholder="Add a comment" />
          </div>
        </div>
        <div className="detailThreadCommentsTitle">
          <h6>Comments</h6>
        </div>
        {comment.map((item) => (
          <div className="detailThreadCommentsBody" key={item.id}>
            <div className="detailThreadCommentsBodyContainer">
              <div className="detailThreadCommentsBodyContainerUser">
                <img src={item.owner.avatar} alt={item.owner.name} />
                <h5>{item.owner.name}</h5>
              </div>
              <div className="detailThreadCommentsBodyContainerComment">
                <p className="comment-content">{item.content}</p>
                <p className="commentPosted text-muted">
                  <small>{postedAt(item.createdAt)}</small>
                </p>
              </div>
              <div className="detailThreadCommentsBodyContainerAction">
                {/* <UpVote
                  count={upVotesBy}
                  threadId={threadId}
                  userId={userId}
                  isUpVoted={isUpVoted}
                />
                <DownVote
                  count={downVotesBy}
                  threadId={threadId}
                  userId={userId}
                  isDownVoted={isDownVoted}
                /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

DetailThreadCards.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  upVotesBy: PropTypes.number.isRequired,
  downVotesBy: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isUpVoted: PropTypes.array.isRequired,
  isDownVoted: PropTypes.array.isRequired,
};

export default DetailThreadCards;
