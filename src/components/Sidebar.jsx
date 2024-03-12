import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 font-roboto justify-center h-10 w-full bg-mywhite text-xl">
      <Link
        to="/overview"
        className="text-muted-foreground transition-colors hover:text-myblack "
      >
        Overview
      </Link>
      <Link
        to="/contractors"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Contractors
      </Link>
      <Link
        to="/billings"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Billings
      </Link>
      <Link
        to="/settings"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Settings
      </Link>
    </nav>
  );
}
