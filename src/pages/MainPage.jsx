import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import AddNewThread from "../components/Buttons/AddNewThread";
import CategoryCards from "../components/CategoryCards";
import LeaderboardCards from "../components/LeaderboardCards";
import ThreadCards from "../components/ThreadCards";
import { setDataFilterThreadCategory } from "../states/filterThreadByCategory/action";
import { asyncGetLeaderboard } from "../states/leaderboards/action";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";

function MainPage({ searchQuery }) {
  const {
    threads = [],
    users = [],
    leaderboards = [],
    filterThreadByCategory = "",
    authUser,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  const threadList = threads
    .filter((thread) =>
      thread.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((thread) => {
      const creator = users.find((user) => user.id === thread.ownerId);
      return {
        ...thread,
        creator,
      };
    })
    .filter((thread) =>
      filterThreadByCategory !== ""
        ? thread.category.includes(filterThreadByCategory)
        : thread
    );

  const FilterThreadAsCategory = (categories) => {
    dispatch(setDataFilterThreadCategory(categories));
  };

  const categories = [];

  threads.forEach((thread) => {
    if (thread.category) {
      thread.category.split(" ").forEach((category) => {
        const categoriesIndex = categories.findIndex(
          (item) => item === category
        );
        if (categoriesIndex < 0) {
          categories.push({
            id: categories.length + 1,
            category,
            threadId: [thread.id],
          });
        } else {
          const threadInCategory = categories[
            categoriesIndex
          ].threadId.findIndex((item) => item === thread.id);
          if (threadInCategory < 0) {
            categories[categoriesIndex].threadId.push(thread.id);
          }
        }
      });
    }
  });

  return (
    <div className="main-page-container">
      <div className="container-kategori">
        <CategoryCards
          categories={categories}
          threadList={threadList}
          FilterThreadAsCategory={FilterThreadAsCategory}
          datas={filterThreadByCategory}
        />
      </div>
      <div className="container-threads">
        <div className="thread-items">
          <ThreadCards threads={threadList} authUser={authUser} />
        </div>
        {authUser && <AddNewThread />}
      </div>
      <div className="container-leaderboards">
        <LeaderboardCards leaderboards={leaderboards} />
      </div>
    </div>
  );
}

MainPage.propTypes = {
  searchQuery: PropTypes.string,
};

MainPage.defaultProps = {
  searchQuery: "",
};

export default MainPage;
