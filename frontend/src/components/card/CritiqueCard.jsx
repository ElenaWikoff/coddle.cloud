import React from 'react';
import "./card.css";

const CritiqueCard = ({ icon, title, children }) => {
  return (
    <div className="critique-card">
      <h4 className="critique-card-title">{icon} {title}</h4>
      <p className="critique-card-text">
        {children}
      </p>
    </div>
  );
};

export default CritiqueCard;
