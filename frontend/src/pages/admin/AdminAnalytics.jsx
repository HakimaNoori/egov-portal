import { useListUsersQuery } from "../../redux/services/authApiSlice";
import { useListDepartmentsQuery } from "../../redux/services/departmentApiSlice";
import { useListServicesQuery } from "../../redux/services/serviceApiSlice";
import { useListRequestsQuery } from "../../redux/services/requestApiSlice";
import { useGetAllPaymentsQuery } from "../../redux/services/paymentApiSlice";
import { useListAllNotificationsQuery } from "../../redux/services/notificationApiSlice";

export default function AdminAnalytics() {
  const { data: users = [], isLoading: usersLoading } = useListUsersQuery();
  const { data: departments = [], isLoading: deptsLoading } = useListDepartmentsQuery();
  const { data: services = [], isLoading: servicesLoading } = useListServicesQuery();
  const { data: requests = [], isLoading: requestsLoading } = useListRequestsQuery();
  const { data: payments = [], isLoading: paymentsLoading } = useGetAllPaymentsQuery();
  const { data: notifications = [], isLoading: notificationsLoading } = useListAllNotificationsQuery();

  // Calculate user analytics
  const userAnalytics = {
    total: users.length,
    citizens: users.filter(u => u.role === 'citizen').length,
    officers: users.filter(u => u.role === 'officer').length,
    dheads: users.filter(u => u.role === 'dhead').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  // Calculate department analytics
  const departmentAnalytics = {
    total: departments.length,
    withServices: departments.filter(dept => 
      services.some(service => service.department_id === dept.id)
    ).length,
    withoutServices: departments.filter(dept => 
      !services.some(service => service.department_id === dept.id)
    ).length,
  };

  // Calculate service analytics
  const serviceAnalytics = {
    total: services.length,
    free: services.filter(s => parseFloat(s.fee || 0) === 0).length,
    paid: services.filter(s => parseFloat(s.fee || 0) > 0).length,
    averageFee: services.length > 0 
      ? (services.reduce((sum, s) => sum + parseFloat(s.fee || 0), 0) / services.length).toFixed(2)
      : 0,
  };

  // Calculate request analytics
  const requestAnalytics = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    reviewed: requests.filter(r => r.status === 'reviewed').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    completionRate: requests.length > 0 
      ? (((requests.filter(r => r.status === 'approved').length + requests.filter(r => r.status === 'rejected').length) / requests.length) * 100).toFixed(1)
      : 0,
  };

  // Calculate payment analytics
  const paymentAnalytics = {
    total: payments.length,
    pending: payments.filter(p => p.status === 'pending').length,
    confirmed: payments.filter(p => p.status === 'confirmed').length,
    rejected: payments.filter(p => p.status === 'rejected').length,
    totalRevenue: payments
      .filter(p => p.status === 'confirmed')
      .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
      .toFixed(2),
    averagePayment: payments.length > 0 
      ? (payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0) / payments.length).toFixed(2)
      : 0,
  };

  // Calculate notification analytics
  const notificationAnalytics = {
    total: notifications.length,
    read: notifications.filter(n => n.read_status).length,
    unread: notifications.filter(n => !n.read_status).length,
    readRate: notifications.length > 0 
      ? ((notifications.filter(n => n.read_status).length / notifications.length) * 100).toFixed(1)
      : 0,
  };

  const isLoading = usersLoading || deptsLoading || servicesLoading || requestsLoading || paymentsLoading || notificationsLoading;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="text-center py-8">Loading analytics dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Analytics Board</h1>
            <p className="text-gray-600 mt-1">Comprehensive overview of system performance and metrics</p>
          </div>
          <div className="text-sm font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">
            Real-time Analytics
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{userAnalytics.total}</div>
            <div className="text-sm opacity-90">Total Users</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{departmentAnalytics.total}</div>
            <div className="text-sm opacity-90">Departments</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{serviceAnalytics.total}</div>
            <div className="text-sm opacity-90">Services</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{requestAnalytics.total}</div>
            <div className="text-sm opacity-90">Requests</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{paymentAnalytics.total}</div>
            <div className="text-sm opacity-90">Payments</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">{notificationAnalytics.total}</div>
            <div className="text-sm opacity-90">Notifications</div>
          </div>
        </div>
      </section>

      {/* Users Analytics */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Users Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-blue-800">Citizens</p>
                <p className="text-2xl font-bold text-blue-900">{userAnalytics.citizens}</p>
                <p className="text-xs text-blue-700">
                  {userAnalytics.total > 0 ? ((userAnalytics.citizens / userAnalytics.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-blue-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-green-800">Officers</p>
                <p className="text-2xl font-bold text-green-900">{userAnalytics.officers}</p>
                <p className="text-xs text-green-700">
                  {userAnalytics.total > 0 ? ((userAnalytics.officers / userAnalytics.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-green-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-purple-800">Dept Heads</p>
                <p className="text-2xl font-bold text-purple-900">{userAnalytics.dheads}</p>
                <p className="text-xs text-purple-700">
                  {userAnalytics.total > 0 ? ((userAnalytics.dheads / userAnalytics.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-purple-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-red-800">Admins</p>
                <p className="text-2xl font-bold text-red-900">{userAnalytics.admins}</p>
                <p className="text-xs text-red-700">
                  {userAnalytics.total > 0 ? ((userAnalytics.admins / userAnalytics.total) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="text-red-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments & Services Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Departments Analytics */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Departments Analytics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Departments</span>
              <span className="font-bold text-blue-600">{departmentAnalytics.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Departments with Services</span>
              <span className="font-bold text-green-600">{departmentAnalytics.withServices}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700">Departments without Services</span>
              <span className="font-bold text-yellow-600">{departmentAnalytics.withoutServices}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Service Coverage</span>
              <span className="font-bold text-purple-600">
                {departmentAnalytics.total > 0 
                  ? ((departmentAnalytics.withServices / departmentAnalytics.total) * 100).toFixed(1) 
                  : 0}%
              </span>
            </div>
          </div>
        </section>

        {/* Services Analytics */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Services Analytics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Services</span>
              <span className="font-bold text-purple-600">{serviceAnalytics.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Free Services</span>
              <span className="font-bold text-green-600">{serviceAnalytics.free}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Paid Services</span>
              <span className="font-bold text-blue-600">{serviceAnalytics.paid}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-gray-700">Average Service Fee</span>
              <span className="font-bold text-orange-600">${serviceAnalytics.averageFee}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Requests Analytics */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Requests Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-800">Total</p>
              <p className="text-2xl font-bold text-blue-900">{requestAnalytics.total}</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="text-center">
              <p className="text-sm font-medium text-yellow-800">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">{requestAnalytics.pending}</p>
              <p className="text-xs text-yellow-700">
                {requestAnalytics.total > 0 ? ((requestAnalytics.pending / requestAnalytics.total) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-center">
              <p className="text-sm font-medium text-purple-800">Reviewed</p>
              <p className="text-2xl font-bold text-purple-900">{requestAnalytics.reviewed}</p>
              <p className="text-xs text-purple-700">
                {requestAnalytics.total > 0 ? ((requestAnalytics.reviewed / requestAnalytics.total) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-center">
              <p className="text-sm font-medium text-green-800">Approved</p>
              <p className="text-2xl font-bold text-green-900">{requestAnalytics.approved}</p>
              <p className="text-xs text-green-700">
                {requestAnalytics.total > 0 ? ((requestAnalytics.approved / requestAnalytics.total) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="text-center">
              <p className="text-sm font-medium text-red-800">Rejected</p>
              <p className="text-2xl font-bold text-red-900">{requestAnalytics.rejected}</p>
              <p className="text-xs text-red-700">
                {requestAnalytics.total > 0 ? ((requestAnalytics.rejected / requestAnalytics.total) * 100).toFixed(1) : 0}%
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Overall Completion Rate</span>
            <span className="text-lg font-bold text-green-600">{requestAnalytics.completionRate}%</span>
          </div>
        </div>
      </section>

      {/* Payments & Notifications Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payments Analytics */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payments Analytics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Payments</span>
              <span className="font-bold text-indigo-600">{paymentAnalytics.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700">Pending Payments</span>
              <span className="font-bold text-yellow-600">{paymentAnalytics.pending}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Confirmed Payments</span>
              <span className="font-bold text-green-600">{paymentAnalytics.confirmed}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700">Rejected Payments</span>
              <span className="font-bold text-red-600">{paymentAnalytics.rejected}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Total Revenue</span>
              <span className="font-bold text-blue-600">${paymentAnalytics.totalRevenue}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Average Payment</span>
              <span className="font-bold text-purple-600">${paymentAnalytics.averagePayment}</span>
            </div>
          </div>
        </section>

        {/* Notifications Analytics */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications Analytics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Notifications</span>
              <span className="font-bold text-pink-600">{notificationAnalytics.total}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Read Notifications</span>
              <span className="font-bold text-green-600">{notificationAnalytics.read}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Unread Notifications</span>
              <span className="font-bold text-blue-600">{notificationAnalytics.unread}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Read Rate</span>
              <span className="font-bold text-purple-600">{notificationAnalytics.readRate}%</span>
            </div>
          </div>
        </section>
      </div>

      {/* Summary Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">System Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{userAnalytics.total}</div>
            <div className="text-sm opacity-90">Registered Users</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{requestAnalytics.total}</div>
            <div className="text-sm opacity-90">Service Requests</div>
          </div>
          <div>
            <div className="text-2xl font-bold">${paymentAnalytics.totalRevenue}</div>
            <div className="text-sm opacity-90">Total Revenue</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{requestAnalytics.completionRate}%</div>
            <div className="text-sm opacity-90">Request Completion</div>
          </div>
        </div>
      </section>
    </div>
  );
}