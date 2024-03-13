import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 font-roboto justify-center h-10 w-full bg-myblack">
      <Link
        to="/overview"
        className="text-mygray transition-colors hover:text-mywhite"
      >
        Overview
      </Link>
      <Link
        to="/contractors"
        className="text-mygray transition-colors hover:text-mywhite"
      >
        Contractors
      </Link>
      <Link
        to="/billings"
        className="text-mygray transition-colors hover:text-mywhite"
      >
        Billings
      </Link>
      <Link
        to="/settings"
        className="text-mygray transition-colors hover:text-mywhite"
      >
        Settings
      </Link>
    </nav>
  );
}
