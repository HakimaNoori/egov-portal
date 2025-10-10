import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  useListAllNotificationsQuery,
  useCreateNotificationMutation,
  useMarkAsReadMutation
} from '../../redux/services/notificationApiSlice';
import { useListUsersQuery } from '../../redux/services/authApiSlice';
import { useListRequestsQuery } from '../../redux/services/requestApiSlice';
import NotificationItem from '../../components/notifications/NotificationItem';

export default function AdminNotifications() {
  const { data: notifications = [] } = useListAllNotificationsQuery();
  const { data: users = [] } = useListUsersQuery();
  const { data: allRequests = [] } = useListRequestsQuery();
  const [createNotification] = useCreateNotificationMutation();
  const [markAsRead] = useMarkAsReadMutation();

  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotification, setNewNotification] = useState({ user_id: '', request_id: '', message: '' });
  const [userSearch, setUserSearch] = useState('');
  const [requestSearch, setRequestSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showRequestDropdown, setShowRequestDropdown] = useState(false);
  const [userRequests, setUserRequests] = useState([]);

  const userDropdownRef = useRef(null);
  const requestDropdownRef = useRef(null);
  const modalRef = useRef(null);

  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.role?.toLowerCase().includes(userSearch.toLowerCase())
    ), [users, userSearch]
  );

  const selectedUser = users.find(u => u.id === parseInt(newNotification.user_id));

  // Filter requests when a user is selected using applicant_id
  useEffect(() => {
    if (newNotification.user_id) {
      const filtered = allRequests.filter(
        req => req.applicant_id === parseInt(newNotification.user_id)
      );
      setUserRequests(filtered);
    } else {
      setUserRequests([]);
    }
  }, [newNotification.user_id, allRequests]);

  // Close dropdowns and modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) setShowUserDropdown(false);
      if (requestDropdownRef.current && !requestDropdownRef.current.contains(e.target)) setShowRequestDropdown(false);
      if (modalRef.current && !modalRef.current.contains(e.target) && showCreateModal) {
        setShowCreateModal(false);
        setNewNotification({ user_id: '', request_id: '', message: '' });
        setUserSearch('');
        setRequestSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCreateModal]);

  const filteredNotifications = notifications.filter(n => 
    filter === 'unread' ? !n.read_status :
    filter === 'read' ? n.read_status : true
  );

  const unreadCount = notifications.filter(n => !n.read_status).length;

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    if (!newNotification.user_id || !newNotification.message) {
      alert('Please select a user and enter a message');
      return;
    }
    try {
      await createNotification({
        ...newNotification,
        user_id: parseInt(newNotification.user_id),
        request_id: newNotification.request_id ? parseInt(newNotification.request_id) : null
      }).unwrap();
      alert('Notification created successfully!');
      setShowCreateModal(false);
      setNewNotification({ user_id: '', request_id: '', message: '' });
      setUserSearch('');
      setRequestSearch('');
    } catch (err) {
      alert(err?.data?.message || 'Failed to create notification');
    }
  };

  const handleUserSelect = (user) => {
    setNewNotification({ user_id: user.id.toString(), request_id: '', message: newNotification.message });
    setUserSearch(`${user.name} (${user.email}) - ${user.role}`);
    setShowUserDropdown(false);
    setRequestSearch('');
  };

  const handleRequestSelect = (request) => {
    setNewNotification({ ...newNotification, request_id: request.id.toString() });
    setRequestSearch(`#${request.id} - ${request.Service?.name}`);
    setShowRequestDropdown(false);
  };

  const markAllAsRead = async () => {
    for (const notif of notifications.filter(n => !n.read_status)) {
      try { await markAsRead(notif.id).unwrap(); } catch {}
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">System Notifications</h2>
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Mark All as Read
              </button>
            )}
            <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
              + Create Notification
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex gap-4">
            <span>Total: {notifications.length}</span>
            <span className="text-blue-600">Unread: {unreadCount}</span>
            <span className="text-green-600">Read: {notifications.length - unreadCount}</span>
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 border rounded-lg">
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </section>

      {/* Notification List */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications found</div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map(n => (
              <div key={n.id}>
                <NotificationItem notification={n} />
                <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t">
                  Sent to: {n.User?.name} ({n.User?.email}) • Role: {n.User?.role}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div ref={modalRef} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create Notification</h3>
            <form onSubmit={handleCreateNotification} className="space-y-4">
              {/* User Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Select User *</label>
                <div className="relative" ref={userDropdownRef}>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => { setUserSearch(e.target.value); setShowUserDropdown(true); }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder="Search users..."
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  {showUserDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredUsers.length === 0 ? (
                        <div className="p-3 text-gray-500 text-sm">No users found</div>
                      ) : (
                        filteredUsers.map(user => (
                          <div key={user.id} onClick={() => handleUserSelect(user)} className="p-3 hover:bg-gray-100 cursor-pointer">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {selectedUser && (
                  <p className="text-xs text-green-600 mt-1">
                    Selected: {selectedUser.name} ({selectedUser.email})
                  </p>
                )}
              </div>

              {/* Request Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Request (Optional)</label>
                <div className="relative" ref={requestDropdownRef}>
                  <input
                    type="text"
                    value={newNotification.request_id ? `Request #${newNotification.request_id}` : ''}
                    onFocus={() => newNotification.user_id && setShowRequestDropdown(true)}
                    placeholder={newNotification.user_id ? "Select a request..." : "Select user first"}
                    readOnly
                    disabled={!newNotification.user_id}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${!newNotification.user_id ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {showRequestDropdown && newNotification.user_id && (
                    <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {userRequests.length === 0 ? (
                        <div className="p-3 text-gray-500 text-sm">No requests found for {selectedUser?.name}</div>
                      ) : (
                        userRequests.map(req => (
                          <div key={req.id} onClick={() => handleRequestSelect(req)} className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0">
                            <div className="font-medium text-gray-800">Request #{req.id}</div>
                            <div className="text-sm text-gray-600">Service: {req.Service?.name || 'N/A'}</div>
                            <div className="text-xs text-gray-500">Status: {req.status} • Created: {new Date(req.created_at).toLocaleDateString()}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Message *</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  rows="4"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter message..."
                />
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={!newNotification.user_id || !newNotification.message} className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
