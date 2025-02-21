
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              GreenStake
            </Link>
            <div className="hidden md:flex md:ml-10">
              <Link
                to="/projects"
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/projects")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                Projects
              </Link>
              <Link
                to="/dao"
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/dao")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                DAO
              </Link>
              <Link
                to="/profile"
                className={`ml-4 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/profile")
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                }`}
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
