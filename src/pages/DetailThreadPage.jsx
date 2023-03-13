import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailThreadCards from "../components/DetailThreadCards";
import LeaderboardCards from "../components/LeaderboardCards";
import myToast from "../components/Toast";
import { asyncGetLeaderboard } from "../states/leaderboards/action";
import { asyncGetAllUsers } from "../states/shared/action";
import {
  asyncCreateComment,
  asyncGetThreadDetail,
} from "../states/threadDetail/action";
import "./styles/styles.css";

function DetailThreadPage() {
  const {
    threadDetail = [],
    users = [],
    leaderboards = [],
    authUser,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { threadId } = useParams();

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId));
    dispatch(asyncGetAllUsers());
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  if (!threadDetail) {
    return <div className="loading">Loading Data.....</div>;
  }

  const creator = users.find((user) => user.id === threadDetail.owner.id);

  if (!creator) {
    return <div className="loading">Loading Data.....</div>;
  }

  if (!leaderboards) {
    return <div className="loading">Loading Data.....</div>;
  }

  const SendAComment = ({ content }) => {
    dispatch(asyncCreateComment({ threadId, content }));
  };

  if (!authUser) {
    return (
      <div className="detail-page-container">
        <div className="container-leaderboards">
          <LeaderboardCards leaderboards={leaderboards} />
        </div>
        <div className="container-detail-threads">
          <DetailThreadCards
            category={threadDetail.category}
            title={threadDetail.title}
            body={threadDetail.body}
            createdAt={threadDetail.createdAt}
            avatar={creator.avatar}
            name={creator.name}
            comment={threadDetail.comments}
            upVotesBy={threadDetail.upVotesBy.length}
            downVotesBy={threadDetail.downVotesBy.length}
            totalComments={threadDetail.comments.length}
            threadId={threadDetail.id}
            // userId={authUser.id}
            isUpVoted={threadDetail.upVotesBy}
            isDownVoted={threadDetail.downVotesBy}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      <div className="container-leaderboards">
        <LeaderboardCards leaderboards={leaderboards} />
      </div>
      <div className="container-detail-threads">
        <DetailThreadCards
          category={threadDetail.category}
          title={threadDetail.title}
          body={threadDetail.body}
          createdAt={threadDetail.createdAt}
          avatar={creator.avatar}
          name={creator.name}
          comment={threadDetail.comments}
          upVotesBy={threadDetail.upVotesBy.length}
          downVotesBy={threadDetail.downVotesBy.length}
          totalComments={threadDetail.comments.length}
          threadId={threadDetail.id}
          userId={authUser.id}
          isUpVoted={threadDetail.upVotesBy}
          isDownVoted={threadDetail.downVotesBy}
          SendAComment={SendAComment}
        />
      </div>
    </div>
  );
}

DetailThreadPage.propTypes = {};

export default DetailThreadPage;
