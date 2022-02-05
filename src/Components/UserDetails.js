import { useState } from "react";
import styles from "./UserDetails.module.css";
import cx from "classnames";

function UserDetails({ user, index }) {
  const months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (date) => {
    var OurDate = new Date(date);
    return (
      OurDate.getDate() +
      " " +
      months[OurDate.getMonth()] +
      " " +
      OurDate.getFullYear()
    );
  };
  const formatAddr = ({ location }) => {
    return (
      <div>
        <div>
          {location?.street?.number} -{location?.street?.name}
        </div>
        <div>
          {location?.city} - {location?.postcode}
        </div>
        <div>{location?.state}</div>
      </div>
    );
  };
  const [hovered, setHover] = useState(false);
  return (
    <>
      <div
        className={styles.users}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={styles.userDetails}>
          <div className={styles.userImg}>
            <img
              id="image"
              className={styles.image}
              src={user?.picture?.medium}
            />
          </div>
          <div className={styles.userOtherDtls}>
            <div className={styles.userName}>
              {user?.name?.first} {user?.name?.last}
            </div>
            <div className={styles.userAge}>{user?.dob?.age} Years</div>
            <div className={styles.userPhone}>{user?.phone}</div>
          </div>
        </div>
        <div className={cx(styles.popupDtls, { [styles.hide]: !hovered })}>
          <div>Date of Birth: {formatDate(user?.dob?.date)}</div>
          <div>Email: {user?.email}</div>
          <div style={{ display: "flex" }}>Address: {formatAddr(user)}</div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
