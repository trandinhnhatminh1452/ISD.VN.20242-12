// Trả về màu theo loại sản phẩm
export function getColorByCategory(category) {
  switch (category) {
    case 'Book': return 'blue';
    case 'CD': return 'green';
    case 'DVD': return 'red';
    case 'LP': return 'purple';
    default: return 'gray';
  }
}

// Trả về class Tailwind tương ứng màu
export function getTypeColorClass(color) {
  switch (color) {
    case 'blue': return 'bg-blue-100 text-blue-800';
    case 'green': return 'bg-green-100 text-green-800';
    case 'red': return 'bg-red-100 text-red-800';
    case 'purple': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
