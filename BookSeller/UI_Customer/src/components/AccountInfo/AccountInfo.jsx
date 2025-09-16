import React, { useState, useEffect } from 'react';

const AccountInfo = ({ onEditUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/all', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản này không?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          throw new Error('Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Quản lý tài khoản người dùng</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Số điện thoại</th>
                <th className="px-6 py-3">Vai trò</th>
                <th className="px-6 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    {user.roles?.map((role, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                        {role}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onEditUser(user)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
