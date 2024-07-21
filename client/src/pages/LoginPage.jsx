import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/ReduxStore";
import { useLoginMutation } from "../store/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useToast } from "../context/ToastContext";

function LoginPage() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // this like a custom hook to make the http login req
  const [login, { isLoading }] = useLoginMutation();

  const notify = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // to get a specific slice from the whole store
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // if there is userInfo so the user is already logged in
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      dispatch(authActions.setCredentials({ ...data }));
      // toast.success(`Welcome ${data?.name}`);
      notify.success(`Welcome ${data?.name}`);

      navigate("/");
    } catch (error) {
      toast.error("Login failed", {
        closeButton: false,
        closeOnClick: true,
      });
    }
  }

  return (
    <>
      <h1>Login </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        >
          {isLoading ? "Logging..." : "Login"}
        </button>
        <div className={styles.link}>
          <Link to={"/register"}>Create Account ?</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
