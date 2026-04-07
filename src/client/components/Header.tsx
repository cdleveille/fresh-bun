import { Link } from "@tanstack/react-router";

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
        <a href="/api" className="nav-link" target="_blank" rel="noopener noreferrer">
          API
        </a>
      </nav>
    </header>
  );
};
