import { Link } from "react-router-dom";

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4 font-roboto justify-center h-10 w-full bg-mywhite text-xl">
      <Link
        href="/"
        className="text-muted-foreground transition-colors hover:text-myblack "
      >
        Overview
      </Link>
      <Link
        href="/"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Contractors
      </Link>
      <Link
        href="/"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Billings
      </Link>
      <Link
        href="/"
        className="text-muted-foreground transition-colors hover:text-myblack"
      >
        Settings
      </Link>
    </nav>
  );
}
