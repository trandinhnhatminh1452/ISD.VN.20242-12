import { BarChart3, Package, ClipboardList } from 'lucide-react';

export const sidebarItems = [
  {
    name: 'Dashboard',
    icon: BarChart3,
    page: 'dashboard',
    active: (current) => current === 'dashboard'
  },
  {
    name: 'Quản lý sản phẩm',
    icon: Package,
    page: 'products',
    active: (current) => current === 'products'
  },
  {
    name: 'Đơn hàng chờ duyệt',
    icon: ClipboardList,
    page: 'productApproval',
    active: (current) => current === 'productApproval'
  },
  {
    name: 'Đăng xuất',
    icon: null,
    action: 'logout',
    active: () => false
  }
];
