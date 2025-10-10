import { useState } from 'react';
import { 
  useGetMyNotificationsQuery, 
  useMarkAsReadMutation 
} from '../../redux/services/notificationApiSlice';
import NotificationItem from '../../components/notifications/NotificationItem';

export default function OfficerNotifications() {
  const { data: notifications = [], isLoading, isError } = useGetMyNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read_status;
    if (filter === 'read') return notif.read_status;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read_status).length;

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(notif => !notif.read_status);
    for (const notif of unreadNotifications) {
      try {
        await markAsRead(notif.id).unwrap();
      } catch (err) {
        console.error('Failed to mark notification as read:', err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
          Loading notifications...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Officer Notifications</h2>
            <p className="text-gray-600 text-sm mt-1">
              Updates on requests and system activities
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Stats and Filters */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-sm">
            <span className="text-gray-600">Total: {notifications.length}</span>
            <span className="text-blue-600">Unread: {unreadCount}</span>
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </section>

      {/* Notifications List */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium text-gray-600">No notifications</p>
            <p className="text-sm text-gray-400 mt-1">
              {filter === 'all' 
                ? "You're all caught up!"
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}