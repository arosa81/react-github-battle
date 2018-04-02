import React from 'react';
import PropTypes from 'prop-types';

function PlayerPreview({ avatar, userName, children }) {
  return (
    <div className="column">
      <img
        className="avatar"
        src={avatar}
        alt={`Avatar for ${userName}`}
      />
      <h2 className="username">@{userName}</h2>
      {children}
    </div>
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

export default PlayerPreview;
