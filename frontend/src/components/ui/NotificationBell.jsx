import { useState } from 'react';

const NotificationBell = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          padding: 0,
        }}
        aria-label="Notifications"
      >
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: '12px',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            marginTop: '8px',
            background: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            minWidth: '220px',
            zIndex: 100,
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
            {notifications.length === 0 ? (
              <li style={{ padding: '8px 16px', color: '#888' }}>No notifications</li>
            ) : (
              notifications.map((n, idx) => (
                <li
                  key={idx}
                  style={{
                    padding: '8px 16px',
                    background: n.read ? 'white' : '#f0f8ff',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {n.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;