import React from 'react';
import "./card.css";

const CritiqueCard = ({ icon, title, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:transform hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
      <h4 className="font-semibold text-gray-900 mb-2 text-sm">{icon} {title}</h4>
      <p className="text-xs text-gray-600 leading-relaxed">
        {children}
      </p>
    </div>
  );
};

export default CritiqueCard;
