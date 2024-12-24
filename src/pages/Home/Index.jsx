import { useState } from "react";
import HomePage from "./HomePage";
import Navbar from "../../Components/Navbar";

const HomeIndex = () => {
  const [user, setUser] = useState(null); // State to hold user data
  return (
    <Navbar setUser={setUser}>
      <HomePage data={user} />
    </Navbar>
  );
};

export default HomeIndex;
