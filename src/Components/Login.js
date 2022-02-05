import styles from "./Login.module.css";
import UserContext from "../Utils/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { useNavigate } from "react-router-dom";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [uName, setUname] = useState("");
  const [pwd, setPwd] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (user || localStorage.getItem("userDetails")) {
      navigate("/home");
    }
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("userDetails", { uName, pwd });
      navigate("/home");
    }
  }, [user]);
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginOption}>
        <div className={styles.optionHeader}>Login</div>
        {user?.uName}
        <div className={styles.optionBody}>
          <div>
            <input
              value={uName}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter Username"
            />
          </div>
          <div>
            <input
              value={pwd}
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Enter Password"
            />
          </div>
        </div>
        <div className={styles.optionFooter}>
          <button onClick={() => setUser({ uName, pwd })}>Login</button>
        </div>
      </div>
    </div>
  );
}
export default Login;
