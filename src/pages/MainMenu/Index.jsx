import { useState } from "react";
import Navbar from "../../Components/Navbar";
import MainMenuPage from "./MainMenuPage";

const MainMenuIndex = () => {
  const [user, setUser] = useState(null); // State to hold user data
  return (
    <Navbar setUser={setUser}>
      <MainMenuPage data={user} />
    </Navbar>
  );
};

export default MainMenuIndex;
