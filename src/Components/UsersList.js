import { useEffect, useState, useContext, useCallback } from "react";
import "./UsersList.css";
import UserDetails from "./UserDetails";
import UserContext from "../Utils/UserContext";
import { useNavigate } from "react-router-dom";

const Loader = () => (
  <div>
    <div className="loader">
      <div className="first loaderContainer" />
      <div className="detailsLoader">
        <div className="detail1 loaderContainer" />
        <div className="detail2 loaderContainer" />
        <div className="detail3 loaderContainer" />
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
  return (
    <div className="userList">
      <div className="header">
        <div className="userTitle">User List</div>
        <div className="logout">
          <button onClick={() => callLogout()}>Logout</button>
        </div>
      </div>
      <div className="allUsers">
        {users.map((user, index) => (
          <UserDetails key={index} user={user} index={index} />
        ))}
        {!loaded ? [1, 2, 3, 4].map((x, idx) => <Loader key={idx} />) : <></>}
      </div>
    </div>
  );
}

export default UsersList;
