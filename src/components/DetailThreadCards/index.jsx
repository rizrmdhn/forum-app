import React from "react";
import "./styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UpVote from "../Buttons/UpVote";
import DownVote from "../Buttons/DownVote";
import TotalComment from "../Buttons/TotalComment";
import postedAt from "../../utils";
import {
  asyncDownVotecomment,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteComment,
  asyncNeutralVoteThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThreadDetail,
} from "../../states/threadDetail/action";
import useInput from "../../hooks/useInput";
import useLocale from "../../hooks/useLocale";

function DetailThreadCards({
  category,
  title,
  body,
  createdAt,
  avatar,
  name,
  comment,
  upVotesBy,
  downVotesBy,
  totalComments,
  threadId,
  userId,
  isUpVoted,
  isDownVoted,
  SendAComment,
}) {
  const { locale } = useSelector((state) => state);

  const {
    textLogin,
    textCreatedBy,
    textForComment,
    textAddComment,
    textComment,
    textSend,
  } = useLocale();
  const [comments, setComments] = useInput();

  const dispatch = useDispatch();

  const handleUpVoteThreads = (threadIds, isUpVoteds) => {
    if (isUpVoteds.includes(userId)) {
      dispatch(asyncNeutralVoteThreadDetail(threadIds));
    } else {
      dispatch(asyncUpVoteThreadDetail(threadIds));
    }
  };

  const handleDownVoteThreads = (threadIds, isDownVoteds) => {
    if (isDownVoteds.includes(userId)) {
      dispatch(asyncNeutralVoteThreadDetail(threadIds));
    } else {
      dispatch(asyncDownVoteThreadDetail(threadIds));
    }
  };

  const handleUpVoteComments = (threadIds, commentId, isUpVoteds) => {
    if (isUpVoteds.includes(userId)) {
      dispatch(asyncNeutralVoteComment({ threadId: threadIds, commentId }));
    } else {
      dispatch(asyncUpVoteComment({ threadId: threadIds, commentId }));
    }
  };

  const handleDownVoteComments = (threadIds, commentId, isDownVoteds) => {
    if (isDownVoteds.includes(userId)) {
      dispatch(asyncNeutralVoteComment({ threadId: threadIds, commentId }));
    } else {
      dispatch(asyncDownVotecomment({ threadId: threadIds, commentId }));
    }
  };

  const onHandleSubmit = () => {
    SendAComment({ content: comments });
  };

  return (
    <div className="detailThreadCards card">
      <div className="card-body">
        <h6 className="detailThreadTags card-tags">#{category}</h6>
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
            hanlderUpVote={() => handleUpVoteThreads(threadId, isUpVoted)}
            userId={userId}
            isUpVoted={isUpVoted}
          />
          <DownVote
            count={downVotesBy}
            handlerDownVote={() => handleDownVoteThreads(threadId, isDownVoted)}
            userId={userId}
            isDownVoted={isDownVoted}
          />
          <TotalComment count={totalComments} />
        </div>
        <small className="UpdatedAt text-muted">
          {postedAt({ date: createdAt, locale })}
        </small>
        <div className="threads-owner">
          <small className="Creator text-muted">
            {textCreatedBy}
            <img src={avatar} alt={name} className="userIcon" />
            <b>{name}</b>
          </small>
        </div>
      </div>
      <div className="detailThreadComments">
        <div className="addNewCommentContainer">
          <div className="addNewCommentTitle">
            <h5>{textAddComment}</h5>
          </div>
          <div className="addNewCommentContainerInput">
            {userId ? (
              <>
                <textarea
                  type="text"
                  placeholder="Add a comment"
                  value={comments}
                  onChange={(e) => setComments(e)}
                />
                <button
                  className="btn btn-kirim"
                  onClick={() => onHandleSubmit()}
                >
                  {textSend}
                </button>
              </>
            ) : (
              <h6>
                <Link to="/login">{textLogin}</Link> {textForComment}
              </h6>
            )}
          </div>
        </div>
        <div className="detailThreadCommentsTitle">
          <h6>
            {textComment} ({totalComments})
          </h6>
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
                  <small>{postedAt({ date: item.createdAt, locale })}</small>
                </p>
              </div>
              <div className="detailThreadCommentsBodyContainerAction">
                <UpVote
                  count={item.upVotesBy.length}
                  hanlderUpVote={() =>
                    handleUpVoteComments(threadId, item.id, item.upVotesBy)
                  }
                  userId={userId}
                  isUpVoted={item.upVotesBy}
                />
                <DownVote
                  count={item.downVotesBy.length}
                  handlerDownVote={() =>
                    handleDownVoteComments(threadId, item.id, item.downVotesBy)
                  }
                  userId={userId}
                  isDownVoted={item.downVotesBy}
                />
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
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.array.isRequired,
  upVotesBy: PropTypes.number.isRequired,
  downVotesBy: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
  threadId: PropTypes.string.isRequired,
  userId: PropTypes.string,
  isUpVoted: PropTypes.array.isRequired,
  isDownVoted: PropTypes.array.isRequired,
  SendAComment: PropTypes.func,
};

DetailThreadCards.defaultProps = {
  userId: null,
  SendAComment: () => {},
};

export default DetailThreadCards;
