import { Link } from "@tanstack/react-router";

export const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href="/api">API</a>
      </nav>
    </header>
  );
};
