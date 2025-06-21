import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import PriceChanges from './PriceChanges';
import OutOfStock from './OutOfStock';
import axios from 'axios';
import { Package, AlertTriangle, ClipboardList, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8080/api/products');
        const productData = res.data || [];
        setProducts(productData);

        setStats([
          {
            title: 'Tổng số sản phẩm',
            value: productData.length.toString(),
            icon: Package,
            color: 'orange'
          },
          {
            title: 'Sắp hết hàng',
            value: productData.filter(p => p.quantity < 5).length.toString(),
            icon: AlertTriangle,
            color: 'orange'
          },
          {
            title: 'Đơn chờ duyệt',
            value: '8',
            changeType: 'positive',
            icon: ClipboardList,
            color: 'orange'
          },
          {
            title: 'Doanh thu hôm nay',
            value: 'đ2,450,000',
            change: '+8% so với tháng trước',
            changeType: 'positive',
            icon: DollarSign,
            color: 'orange'
          }
        ]);

        const lowStockItems = productData
          .filter(p => p.quantity < 5)
          .map(p => ({
            name: p.name,
            type: p.type,
            remaining: `Còn ${p.quantity}`,
            icon: getIconByType(p.type)
          }));
        setOutOfStock(lowStockItems);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error.message);
        setStats([]);
        setOutOfStock([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getIconByType = (type) => {
    const icons = { Book: 'Book', CD: 'Disc', LP: 'Disc', DVD: 'Film' };
    return icons[type] || 'Package';
  };

  const handlePriceChange = (priceChange) => {
    if (priceChange) {
      setPriceChanges(prev => [priceChange, ...prev].slice(0, 3)); // Giữ 3 thay đổi gần nhất
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((card, index) => (
          <StatsCard key={index} card={card} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChanges data={priceChanges} />
        <OutOfStock data={outOfStock} />
      </div>
    </>
  );
};

export default Dashboard;