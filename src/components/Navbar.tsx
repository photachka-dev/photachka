import { Link, useLocation } from "react-router-dom";
import { Camera } from "lucide-react";

const navItems = [
  { label: "Početna", path: "/" },
  { label: "Galerija", path: "/gallery" },
  { label: "Kontakt", path: "/contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <nav className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl tracking-tight">
          <Camera className="w-5 h-5" />
          Portfolio
        </Link>
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-foreground ${
                  pathname === item.path ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
