import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewThread from "../components/Buttons/AddNewThread";
import CategoryCards from "../components/CategoryCards";
import LeaderboardCards from "../components/LeaderboardCards";
import ThreadCards from "../components/ThreadCards";
import { asyncGetLeaderboard } from "../states/leaderboards/action";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";

function MainPage() {
  const {
    threads = [],
    users = [],
    leaderboards = [],
    authUser,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  const threadList = threads.map((thread) => {
    const creator = users.find((user) => user.id === thread.ownerId);
    return {
      ...thread,
      creator,
    };
  });

  const FilterThreadAsCategory = (category) =>
    threadList.filter((thread) => thread.category === category);

  return (
    <div className="main-page-container">
      <div className="container-kategori">
        <CategoryCards
          threadList={threadList}
          FilterThreadAsCategory={FilterThreadAsCategory}
        />
      </div>
      <div className="container-threads">
        <div className="thread-items">
          <ThreadCards threads={threadList} authUser={authUser} />
        </div>
        <AddNewThread />
      </div>
      <div className="container-leaderboards">
        <LeaderboardCards leaderboards={leaderboards} />
      </div>
    </div>
  );
}

export default MainPage;
