import { useState } from "react";
import "./UserDetails.css";

function UserDetails({ user, index }) {
    const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const formatDate = (date) => {
        var OurDate = new Date(date)
        return (
          OurDate.getDate() +
          " " +
          months[OurDate.getMonth()] +
          " " +
          OurDate.getFullYear()
        );
    }
    const formatAddr = ({location}) => {
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
    }
  const [hovered, setHover] = useState(false);
  return (
    <>
      <div
        className="users"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="userDetails">
          <div className="userImg">
            <img id="image" className="image" src={user?.picture?.medium} />
          </div>
          <div className="userOtherDtls">
            <div className="userName">
              {user?.name?.first} {user?.name?.last}
            </div>
            <div className="userAge">{user?.dob?.age} Years</div>
            <div className="userPhone">{user?.phone}</div>
          </div>
        </div>
        <div
          className={`${hovered ? "show" : "hide"} popupDtls`}
        >
          <div>Date of Birth: {formatDate(user?.dob?.date)}</div>
          <div>Email: {user?.email}</div>
          <div style={{ display: "flex" }}>
            Address: {formatAddr(user)}
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default UserDetails;
