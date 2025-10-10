// src/components/ui/NotificationBell.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetMyNotificationsQuery } from '../../redux/services/notificationApiSlice';
import NotificationBadge from '../notifications/NotificationBadge';

export default function NotificationBell() {
  const { data: notifications = [] } = useGetMyNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadNotifications = notifications.filter(notif => !notif.read_status);

  // Sort all notifications by newest first
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        {/* Bell icon */}
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24c1.104 0 2-.895 2-2h-4c0 1.105.896 2 2 2zm6.364-6V11c0-3.07-1.64-5.64-4.364-6.32V4a2 2 0 10-4 0v.68C7.276 5.36 5.636 7.93 5.636 11v7l-1.636 1.636V20h16v-0.364L18.364 18zM17 18H7v-7c0-2.48 1.516-4.5 4-4.5s4 2.02 4 4.5v7z" />
        </svg>
        <NotificationBadge count={unreadNotifications.length} />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
            <span className="text-sm text-gray-500">
              {unreadNotifications.length} unread
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {sortedNotifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            ) : (
              sortedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 ${
                    !notification.read_status ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="text-sm text-gray-800 line-clamp-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-200">
            <Link
              to={
                window.location.pathname.includes('/admin') ? '/admin/notifications' :
                window.location.pathname.includes('/dhead') ? '/dhead/notifications' :
                window.location.pathname.includes('/officer') ? '/officer/notifications' :
                '/citizen/notifications'
              }
              className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setShowDropdown(false)}
            >
              View All Notifications
            </Link>
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
