import { useMarkAsReadMutation } from '../../redux/services/notificationApiSlice';

export default function NotificationItem({ notification }) {
  const [markAsRead] = useMarkAsReadMutation();

  const handleMarkAsRead = async () => {
    if (!notification.read_status) {
      try {
        await markAsRead(notification.id).unwrap();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
      }
    }
  };

  return (
    <div 
      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
        notification.read_status ? 'bg-white' : 'bg-blue-50'
      }`}
      onClick={handleMarkAsRead}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-gray-800 flex-1">{notification.message}</p>
        {!notification.read_status && (
          <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
        )}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {notification.Request && `Request #${notification.Request.id}`}
        </span>
        <span>
          {new Date(notification.created_at).toLocaleDateString()} •{' '}
          {new Date(notification.created_at).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}