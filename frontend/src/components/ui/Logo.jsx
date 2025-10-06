import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="p-4 border-b flex items-center space-x-2">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
      </Link>
    </div>
  );
}
