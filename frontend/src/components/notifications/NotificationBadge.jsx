import { useGetMyNotificationsQuery } from '../../redux/services/notificationApiSlice';

export default function NotificationBadge() {
  const { data: notifications = [] } = useGetMyNotificationsQuery();
  
  const unreadCount = notifications.filter(notif => !notif.read_status).length;
  
  if (unreadCount === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  );
}