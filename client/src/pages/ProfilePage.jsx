import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../store/usersApiSlice";
import { authActions } from "../store/ReduxStore";
import { toast } from "react-toastify";

function ProfilePage() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(userInfo?.email);
    setName(userInfo?.name);
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateProfile({ name }).unwrap();
      dispatch(authActions.setCredentials({ ...data }));
      toast.success("Updated Successfully");
      // navigate("/");
    } catch (error) {
      console.log(error?.message);
      toast.error("Failed to Update Your Profile");
    }
  };

  return (
    <>
      <h1>Profile </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            disabled
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${isLoading ? styles.loading : ""}`}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </>
  );
}

export default ProfilePage;
