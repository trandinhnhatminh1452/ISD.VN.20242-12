import React from 'react';

const StatsCard = ({ card }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${card.color}-100`}>
          <card.icon className={`w-6 h-6 text-${card.color}-600`} />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
      <p className={`text-sm ${card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
        {card.change}
      </p>
    </div>
  );
};

export default StatsCard;