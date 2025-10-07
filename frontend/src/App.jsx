import store from "./redux/store";
import { Provider } from "react-redux";
import AppRoutes from "./routes"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">

        {/* Main App Routing */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}

export default App;
