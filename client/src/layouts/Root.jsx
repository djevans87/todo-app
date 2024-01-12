import { NavLink, Link, Outlet } from "react-router-dom";
import { useStore } from "../store/store";

const Root = () => {
  const [access, removeAccess] = useStore((state) => [
    state.access,
    state.removeAccess,
  ]);

  const headers = {
    "Content-Type": "application/json",
    // You might need additional headers, depending on your server requirements
  };

  const logoutHandler = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
        headers: headers,
        credentials: "include", // Ensure credentials are included for cross-origin requests
      });

      if (response.ok) {
        removeAccess();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1 className="title">Personal ToDo-List</h1>
          <NavLink className="nav__link" to="/">
            Home
          </NavLink>
          {!access && (
            <NavLink className="nav__link" to="/login">
              Login
            </NavLink>
          )}
          {!access && (
            <NavLink className="nav__link" to="/register">
              Register
            </NavLink>
          )}
          {access && (
            <NavLink className="nav__link" to="/dashboard">
              Dashboard
            </NavLink>
          )}
          {access && (
            <Link
              className="nav__link logout"
              to="/"
              onClick={() => logoutHandler()}
              replace={true}
            >
              Logout
            </Link>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">
        <span>&copy; Djevans87 ToDo List - 2024</span>
      </footer>
    </div>
  );
};

export default Root;
