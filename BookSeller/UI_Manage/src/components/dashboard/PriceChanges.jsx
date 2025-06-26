import React from 'react';
import { TrendingUp } from 'lucide-react';

const PriceChanges = ({ data }) => {
  const sortedData = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Thay đổi giá gần đây</h3>
      </div>
      {sortedData.length === 0 ? (
        <p className="text-gray-500">Không có thay đổi giá gần đây.</p>
      ) : (
        <div className="space-y-4">
          {sortedData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.oldPrice} → {item.newPrice}</p>
              </div>
              <span className={`font-medium ${item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceChanges;
