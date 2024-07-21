import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../store/usersApiSlice";
import { authActions } from "../store/ReduxStore";
import { toast } from "react-toastify";

function SignUpPage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await register({ name, email, password }).unwrap();
      dispatch(authActions.setCredentials({ ...data }));
      toast.success("Registered Successfully");
      navigate("/");
    } catch (error) {
      console.log(error.data.message);
      toast.error(`Failed to register, ${error?.data?.message}`);
    }
  }

  return (
    <>
      <h1>Sign Up </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Your Email"
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
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <div className={styles.link}>
          <Link to={"/login"}>Already Have an Account ?</Link>
        </div>
      </form>
    </>
  );
}

export default SignUpPage;
