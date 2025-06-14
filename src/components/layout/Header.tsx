
import { UserCircle } from "lucide-react";

const Header = () => (
  <header className="flex items-center justify-between px-6 h-16 bg-white shadow-sm border-b border-gray-100">
    <div className="flex items-center gap-3">
      {/* Logo Placeholder */}
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg uppercase shadow-soft mr-2">
        MR
      </div>
      <span className="font-semibold tracking-wide text-lg text-primary">Medical Records</span>
      <span className="ml-4 px-2 py-0.5 rounded bg-secondary text-sm text-gray-500">Acme Health Firm</span>
    </div>
    <div className="flex items-center gap-4">
      {/* Future: notifications */}
      {/* User Dropdown Placeholder */}
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition text-primary">
        <UserCircle size={24} />
        <span className="font-medium text-base hidden sm:inline">John Doe</span>
      </button>
    </div>
  </header>
);

export default Header;
