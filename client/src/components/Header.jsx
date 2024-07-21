import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { authActions } from "../store/ReduxStore";
import { useLogoutMutation } from "../store/usersApiSlice";
import { toast } from "react-toastify";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  async function logoutHandler() {
    try {
      await logout().unwrap();
      navigate("/");
      toast.success("Logged out..");
      // to make the navigation work first
      setTimeout(() => {
        dispatch(authActions.logout());
      }, 0);
    } catch (error) {
      toast.error("Failed to logout");
      //
    }
  }

  return (
    <header className={styles.header}>
      <Link to={"/"}>MERN AUTH</Link>
      <nav className={styles.navbar}>
        {!userInfo && (
          <>
            <Link className={styles.link} to={"/login"}>
              Sign In
            </Link>
            <Link className={styles.link} to={"/register"}>
              Sign Up
            </Link>
          </>
        )}

        {userInfo && (
          <div
            className={styles.userName}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div>
              <span> {userInfo.name} </span>
              {isOpen ? (
                <IoMdArrowDropup />
              ) : (
                <IoMdArrowDropdown color="white" />
              )}
            </div>

            {isOpen && (
              <div className={styles.modal}>
                <Link to={"/profile"}>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
