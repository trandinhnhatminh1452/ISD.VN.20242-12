import React from 'react';
import { AlertTriangle } from 'lucide-react';

const OutOfStock = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Sản phẩm sắp hết hàng</h3>
      </div>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg mr-3">
                <item.icon className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">{item.type}</p>
              </div>
            </div>
            <span className="text-red-600 font-medium text-sm">
              {item.remaining}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutOfStock;
