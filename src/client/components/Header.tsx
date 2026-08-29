import { Link } from "@tanstack/react-router";

import { Theme } from "@/client/components/Theme";

export const Header = () => {
  return (
    <header className="site-header">
      <nav>
        <Link to="/" className="nav-link" activeProps={{ className: "nav-link active" }}>
          Home
        </Link>
        <Link to="/about" className="nav-link" activeProps={{ className: "nav-link active" }}>
          About
        </Link>
        <Theme />
      </nav>
    </header>
  );
};
