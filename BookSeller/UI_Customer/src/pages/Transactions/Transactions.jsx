import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import formatPrice from '../../utils/formatPrice';
import { orderAPI } from '../../utils/api';
import './Transactions.scss';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetchTransactions(user.id);
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTransactions = async (id) => {
    try {
      setLoading(true);
      const data = await orderAPI.getTransactionHistory(id);
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="transactions-container">
        <div className="transactions-content">
          <h2>Lịch sử giao dịch</h2>
          <div className="loading">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="transactions-container">
        <div className="transactions-content">
          <h2>Lịch sử giao dịch</h2>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-container">
      <div className="transactions-content">
        <h2>Lịch sử giao dịch</h2>
        
        {transactions.length === 0 ? (
          <div className="no-transactions">
            <p>Bạn chưa có giao dịch nào.</p>
          </div>
        ) : (
          <div className="transactions-list">
            {transactions.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-header">
                  <div className="transaction-id">
                    <strong>Mã giao dịch:</strong> {transaction.transactionId}
                  </div>
                  <div className="transaction-status">
                    <span className={`status ${transaction.status}`}>
                      {transaction.status === 'completed' ? 'Hoàn thành' : transaction.status}
                    </span>
                  </div>
                </div>
                
                <div className="transaction-details">
                  <div className="detail-row">
                    <span className="label">Mã đơn hàng:</span>
                    <span className="value">#{transaction.orderId}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Tên khách hàng:</span>
                    <span className="value">{transaction.orderName}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Email:</span>
                    <span className="value">{transaction.orderEmail}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Số tiền:</span>
                    <span className="value amount">{formatPrice(transaction.amount)}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Phương thức thanh toán:</span>
                    <span className="value">{transaction.content}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Thời gian:</span>
                    <span className="value">{formatDateTime(transaction.datetime)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions; 