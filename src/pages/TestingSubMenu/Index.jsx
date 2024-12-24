import { useState } from "react";
import Navbar from "../../Components/Navbar";
import TestingSubMenuPage from "./TestingSubMenuPage";

const TestingSubMenuIndex = () => {
  const [user, setUser] = useState(null); // State to hold user data
  return (
    <Navbar setUser={setUser}>
      <TestingSubMenuPage data={user} />
    </Navbar>
  );
};

export default TestingSubMenuIndex;
