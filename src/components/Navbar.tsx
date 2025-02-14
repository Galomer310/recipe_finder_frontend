import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Recipe Finder</h1>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/search" style={styles.link}>
            Search Recipes
          </Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/saved" style={styles.link}>
                Saved Recipes
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
  },
  title: {
    margin: "0",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    margin: "0",
    padding: "0",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default Navbar;
