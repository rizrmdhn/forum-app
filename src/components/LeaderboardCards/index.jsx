import React from "react";
import PropTypes from "prop-types";
import "./styles/styles.css";

function LeaderboardCards({ leaderboards }) {
  return (
    <div className="LeaderboardsCard card">
      <div className="LeaderboardsCard-header card-header">
        Klasemen Pengguna Aktif
      </div>
      <ul className="LeaderboardsCard-list list-group list-group-flush">
        {leaderboards.map((leaderboard) => (
          <li
            className="LeaderboardsCard-item-list list-group-item"
            key={leaderboard.user.id}
          >
            <div className="LeaderboardsCard-user">
              <img
                className="LeaderboardsCard-user-image"
                src={leaderboard.user.avatar}
                alt="user"
              />
              <div className="LeaderboardsCard-user-name">
                {leaderboard.user.name}
              </div>
            </div>
            <div className="LeaderboardsCard-user-score">
              {leaderboard.score}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

LeaderboardCards.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardCards;
