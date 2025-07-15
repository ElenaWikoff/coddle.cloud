// Overall Stats Component
import React from 'react';
import "./card.css";

const StatsCard = () => {
  return (
    <div className="stats-container">
  <h2 className="stats-head-title">Project Statistics</h2>
  
  {/* Row of Stat Cards */}
  <div className="stat-cards-row">
    {/* Stat Card for Total Commits */}
    <div className="stat-card">
      <h3 className="stat-title">Total Commits: 102</h3>
    </div>

    {/* Stat Card for Total Issues */}
    <div className="stat-card">
      <h3 className="stat-title">Total Issues: 137</h3>
    </div>

    {/* Stat Card for Total Unit Tests */}
    <div className="stat-card">
      <h3 className="stat-title">Total Unit Tests: 21</h3>
    </div>
  </div>
</div>
  );
};

export default StatsCard;
