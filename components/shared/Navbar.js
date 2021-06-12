import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

const AppLink = ({ label, href, className }) => (
  <Link href={href}>
    <a className={className}>{label}</a>
  </Link>
);

const AppNavbar = () => {
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <AppLink
          label="PortfolioApp"
          href="/"
          className="mr-3 navbar-brand font-weight-bold"
        />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <AppLink
              label="Portfolios"
              href="/portfolios"
              className="nav-link mr-3"
            />
            <AppLink
              label="Forum"
              href="/forum/categories"
              className="nav-link mr-3"
            />
            <AppLink label="Cv" href="/cv" className="nav-link mr-3" />
          </Nav>
          <Nav>
            <AppLink label="Sign In" href="/login" className="nav-link mr-3" />
            <AppLink
              label="Sign Up"
              href="/register"
              className="nav-link mr-3 btn btn-success bg-green-2 bright"
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
