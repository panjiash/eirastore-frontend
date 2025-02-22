// import { useState } from "react";
// import HomePage from "./HomePage";
// import Navbar from "../../components/Navbar";

// const HomeIndex = () => {
//   const [user, setUser] = useState(null);
//   return (
//     <Navbar setUser={setUser}>
//       <HomePage data={user} />
//     </Navbar>
//   );
// };

// export default HomeIndex;

import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/authSlice";

const HomeIndex = ({ userLogin }) => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (!user) {
  //     dispatch(getMe());
  //   }
  // }, [dispatch, user]);

  return (
    <Navbar userLogin={userLogin}>
      <div>{userLogin?.name}</div>
    </Navbar>
  );
};

export default HomeIndex;
