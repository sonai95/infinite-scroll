import { useEffect, useState, useContext, useCallback } from "react";
import styles from "./UsersList.module.css";
import UserDetails from "./UserDetails";
import UserContext from "../Utils/UserContext";
import { useNavigate } from "react-router-dom";
import cx from "classnames";

const Loader = () => (
  <div>
    <div className={styles.loader}>
      <div className={cx(styles.first, styles.loaderContainer)} />
      <div className={styles.detailsLoader}>
        <div className={cx(styles.detail1, styles.loaderContainer)} />
        <div className={cx(styles.detail2, styles.loaderContainer)} />
        <div className={cx(styles.detail3, styles.loaderContainer)} />
      </div>
    </div>
  </div>
);
function UsersList() {
  const [users, addUsers] = useState([]);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(0);
  const [pageHeight, setpageHeight] = useState(0);
  const [bottomOfPage, setbottomOfPage] = useState(false);
  const [loaded, setLoad] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [scroller, showScroller] = useState(false);
  let navigate = useNavigate();

  const handleScrollEvent = () => {
    setScrollY(window.scrollY);
    setVisible(window.innerHeight);
    setpageHeight(document.documentElement.scrollHeight);
  };

  useEffect(() => {
    if (!user && !localStorage.getItem("userDetails")) {
      navigate("/");
    } else if (!user && localStorage.getItem("userDetails")) {
      setUser(localStorage.getItem("userDetails"));
    }
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", (event) => {
      if (window.pageYOffset > 100) {
        showScroller(true);
      } else {
        showScroller(false);
      }
    });
  }, [])

  useEffect(() => {
    setbottomOfPage(visible + scrollY >= pageHeight - 50);
  }, [scrollY]);

  const fetchData = useCallback(() => {
    fetch("https://randomuser.me/api/?results=30").then((res) => {
      res.json().then((resp) => {
        addUsers([...users, ...resp.results]);
        setLoad(true);
      });
    });
  }, [users]);
  useEffect(() => {
    if (bottomOfPage === true && scrollY > 0) {
      setLoad(false);
      fetchData();
    }
  }, [bottomOfPage]);
  useEffect(() => {
    fetchData();
  }, []);
  const callLogout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
    navigate("/");
  };
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }
  return (
    <div className={styles.userList}>
      <div className={styles.header}>
        <div className={styles.userTitle}>User List</div>
        <div className={styles.logout}>
          <button onClick={() => callLogout()}>Logout</button>
        </div>
      </div>
      {scroller ? <div className={styles.scrollUp} onClick={scrollTop}>
        <i className={cx(styles.scrollIcon, "fas fa-chevron-up")}></i>
      </div> : <></>}

      <div className={styles.allUsers}>
        {users.map((user, index) => (
          <UserDetails key={index} user={user} index={index} />
        ))}
        {!loaded ? [1, 2, 3, 4].map((x, idx) => <Loader key={idx} />) : <></>}
      </div>
    </div>
  );
}
export default UsersList;
