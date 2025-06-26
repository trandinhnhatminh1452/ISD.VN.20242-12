import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import PriceChanges from './PriceChanges';
import OutOfStock from './OutOfStock';
import axios from 'axios';
import {
  Package,
  AlertTriangle,
  ClipboardList,
  DollarSign,
  Book,
  Disc,
  Film
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [priceChanges, setPriceChanges] = useState([]);
  const [outOfStock, setOutOfStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIconByType = (type) => {
    const icons = {
      Book: Book,
      CD: Disc,
      LP: Disc,
      DVD: Film
    };
    return icons[type] || Package;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get('http://localhost:8080/api/products'),
          axios.get('http://localhost:8080/api/orders')
        ]);

        const productData = productRes.data || [];
        const orders = orderRes.data || [];

        const pendingOrdersCount = orders.filter(order => order.status === '0').length;

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
            value: pendingOrdersCount.toString(),
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
            title: p.name || p.title || '[Không rõ tên]',
            type: p.type || p.category || '[Không rõ loại]',
            remaining: `Còn ${p.quantity}`,
            icon: getIconByType(p.type || p.category)
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

  const handlePriceChange = (priceChange) => {
    if (priceChange) {
      setPriceChanges(prev => [priceChange, ...prev].slice(0, 3));
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Đang tải dữ liệu...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((card, index) => (
          <StatsCard key={index} card={card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PriceChanges data={priceChanges} />
        <OutOfStock data={outOfStock} />
      </div>
    </>
  );
};

export default Dashboard;
