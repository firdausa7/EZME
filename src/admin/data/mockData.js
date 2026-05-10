import { products } from '../../data/products';

export const ADMIN_USERS = [
  { id: 1, email: 'admin@ezme.ke', password: 'Ezme@2025', name: 'Ezme Admin', role: 'super_admin', avatar: 'EA' },
  { id: 2, email: 'staff@ezme.ke', password: 'staff123', name: 'Staff User', role: 'staff', avatar: 'SU' },
];

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const STATUS_COLORS = {
  Pending:    { bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-400' },
  Confirmed:  { bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-400' },
  Processing: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-400' },
  Shipped:    { bg: 'bg-indigo-100', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  Delivered:  { bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-400' },
  Cancelled:  { bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-400' },
};

export const MOCK_ORDERS = [
  { id: 'EZME-1001', customer: { name: 'Amina Hassan', phone: '0712345678', email: 'amina@gmail.com', county: 'Nairobi' }, product: products[4], qty: 1, size: 'M', color: 'Powder Blue', amount: 5800, status: 'Delivered', mpesa: 'QHX7Y3K2LP', date: '2025-05-08', address: 'Westlands, Nairobi', notes: '' },
  { id: 'EZME-1002', customer: { name: 'Fatuma Omar', phone: '0723456789', email: 'fatuma@gmail.com', county: 'Mombasa' }, product: products[6], qty: 2, size: 'L', color: 'Black', amount: 11600, status: 'Shipped', mpesa: 'QHX8Z4M3NQ', date: '2025-05-09', address: 'Nyali, Mombasa', notes: 'Please wrap nicely' },
  { id: 'EZME-1003', customer: { name: 'Zara Abdullahi', phone: '0734567890', email: 'zara@gmail.com', county: 'Nairobi' }, product: products[2], qty: 1, size: 'S', color: 'Black & Gold', amount: 8500, status: 'Processing', mpesa: 'QHX9A5N4PR', date: '2025-05-09', address: 'Kilimani, Nairobi', notes: '' },
  { id: 'EZME-1004', customer: { name: 'Khadija Mwangi', phone: '0745678901', email: 'khadija@gmail.com', county: 'Kisumu' }, product: products[3], qty: 1, size: 'XL', color: 'Royal Blue', amount: 4200, status: 'Pending', mpesa: null, date: '2025-05-10', address: 'Milimani, Kisumu', notes: 'Call before delivery' },
  { id: 'EZME-1005', customer: { name: 'Maryam Said', phone: '0756789012', email: 'maryam@gmail.com', county: 'Nairobi' }, product: products[1], qty: 1, size: 'M', color: 'Cream & Lavender', amount: 6200, status: 'Confirmed', mpesa: 'QHX0B6P5QS', date: '2025-05-10', address: 'South C, Nairobi', notes: '' },
  { id: 'EZME-1006', customer: { name: 'Halima Juma', phone: '0767890123', email: 'halima@gmail.com', county: 'Mombasa' }, product: products[5], qty: 1, size: 'L', color: 'Burgundy', amount: 7200, status: 'Delivered', mpesa: 'QHX1C7Q6RT', date: '2025-05-07', address: 'Old Town, Mombasa', notes: '' },
  { id: 'EZME-1007', customer: { name: 'Nasrin Ahmed', phone: '0778901234', email: 'nasrin@gmail.com', county: 'Nakuru' }, product: products[0], qty: 1, size: 'M', color: 'Grey Marble', amount: 9800, status: 'Cancelled', mpesa: 'QHX2D8R7SU', date: '2025-05-06', address: 'Milimani, Nakuru', notes: 'Customer cancelled' },
  { id: 'EZME-1008', customer: { name: 'Safia Osman', phone: '0789012345', email: 'safia@gmail.com', county: 'Nairobi' }, product: products[4], qty: 2, size: 'S', color: 'Powder Blue', amount: 11600, status: 'Processing', mpesa: 'QHX3E9S8TV', date: '2025-05-10', address: 'Lavington, Nairobi', notes: '' },
];

export const MOCK_CUSTOMERS = [
  { id: 1, name: 'Amina Hassan', email: 'amina@gmail.com', phone: '0712345678', county: 'Nairobi', orders: 4, totalSpent: 23200, joinDate: '2024-11-12', status: 'active' },
  { id: 2, name: 'Fatuma Omar', email: 'fatuma@gmail.com', phone: '0723456789', county: 'Mombasa', orders: 6, totalSpent: 41800, joinDate: '2024-09-03', status: 'active' },
  { id: 3, name: 'Zara Abdullahi', email: 'zara@gmail.com', phone: '0734567890', county: 'Nairobi', orders: 2, totalSpent: 17000, joinDate: '2025-01-20', status: 'active' },
  { id: 4, name: 'Khadija Mwangi', email: 'khadija@gmail.com', phone: '0745678901', county: 'Kisumu', orders: 3, totalSpent: 14600, joinDate: '2024-12-05', status: 'active' },
  { id: 5, name: 'Maryam Said', email: 'maryam@gmail.com', phone: '0756789012', county: 'Nairobi', orders: 1, totalSpent: 6200, joinDate: '2025-05-10', status: 'active' },
  { id: 6, name: 'Halima Juma', email: 'halima@gmail.com', phone: '0767890123', county: 'Mombasa', orders: 5, totalSpent: 34500, joinDate: '2024-08-17', status: 'active' },
  { id: 7, name: 'Nasrin Ahmed', email: 'nasrin@gmail.com', phone: '0778901234', county: 'Nakuru', orders: 2, totalSpent: 12400, joinDate: '2025-02-14', status: 'suspended' },
  { id: 8, name: 'Safia Osman', email: 'safia@gmail.com', phone: '0789012345', county: 'Nairobi', orders: 3, totalSpent: 28600, joinDate: '2024-10-30', status: 'active' },
];

export const REVENUE_DATA = [
  { month: 'Nov', revenue: 42000, orders: 18 },
  { month: 'Dec', revenue: 78000, orders: 34 },
  { month: 'Jan', revenue: 55000, orders: 24 },
  { month: 'Feb', revenue: 63000, orders: 28 },
  { month: 'Mar', revenue: 91000, orders: 41 },
  { month: 'Apr', revenue: 84000, orders: 37 },
  { month: 'May', revenue: 64600, orders: 29 },
];

export const CATEGORY_DATA = [
  { name: 'Luxury', value: 45, color: '#C9B8E8' },
  { name: 'Occasion', value: 30, color: '#0D0D0D' },
  { name: 'Everyday', value: 25, color: '#E8B4B8' },
];

export const WEEKLY_DATA = [
  { day: 'Mon', revenue: 8400, orders: 4 },
  { day: 'Tue', revenue: 12600, orders: 6 },
  { day: 'Wed', revenue: 6200, orders: 3 },
  { day: 'Thu', revenue: 15800, orders: 7 },
  { day: 'Fri', revenue: 21000, orders: 9 },
  { day: 'Sat', revenue: 18400, orders: 8 },
  { day: 'Sun', revenue: 9800, orders: 4 },
];

export const ACTIVITY_LOGS = [
  { id: 1, user: 'Ezme Admin', action: 'Updated price for Powder Blue Butterfly Abaya', time: '2 min ago', type: 'product' },
  { id: 2, user: 'Ezme Admin', action: 'Order EZME-1008 status changed to Processing', time: '15 min ago', type: 'order' },
  { id: 3, user: 'Staff User', action: 'New product "Grey Marble Cape Abaya" added', time: '1 hr ago', type: 'product' },
  { id: 4, user: 'Ezme Admin', action: 'Customer Nasrin Ahmed account suspended', time: '2 hrs ago', type: 'customer' },
  { id: 5, user: 'Staff User', action: 'Homepage banner updated', time: '3 hrs ago', type: 'content' },
  { id: 6, user: 'Ezme Admin', action: 'Exported orders to Excel (May 2025)', time: '5 hrs ago', type: 'export' },
];

export const NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'New Order Received', message: 'EZME-1008 from Safia Osman — KES 11,600', time: '2 min ago', read: false },
  { id: 2, type: 'payment', title: 'M-PESA Payment Confirmed', message: 'QHX3E9S8TV — KES 11,600 received', time: '2 min ago', read: false },
  { id: 3, type: 'stock', title: 'Low Stock Alert', message: 'Lavender Floral Print Abaya — 2 units remaining', time: '1 hr ago', read: false },
  { id: 4, type: 'order', title: 'Order Delivered', message: 'EZME-1001 delivered to Amina Hassan', time: '3 hrs ago', read: true },
  { id: 5, type: 'whatsapp', title: 'New WhatsApp Inquiry', message: 'Customer asking about Royal Blue Abaya sizing', time: '4 hrs ago', read: true },
  { id: 6, type: 'payment', title: 'Payment Failed', message: 'Order EZME-1009 — STK Push timed out', time: '6 hrs ago', read: true },
];

export const CONTENT_SECTIONS = {
  hero: { title: 'Hero Section', subtitle: 'New Collection · @ezme.ke', cta: 'Shop Now', video: 'reel5.mp4' },
  about: { heading: 'Made with Love in Nairobi', body: 'Ezme was born from a simple belief — that modest fashion should never compromise on beauty.' },
  announcement: { text: 'Free delivery within Nairobi on orders above KES 5,000', active: true },
  contact: { phone: '+254 799 932 131', email: 'hello@ezme.ke', instagram: '@ezme.ke', mpesa: '123456' },
};

export const STORE_SETTINGS = {
  currency: 'KES',
  deliveryFee: 350,
  freeDeliveryThreshold: 5000,
  nairobi_fee: 0,
  counties: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  vat: 0,
  returnPolicy: '7 days',
  storeHours: '8:00 AM – 8:00 PM',
  mpesaTill: '123456',
  mpesaName: 'EZME Abayas',
};
