import Navbar from "../../components/Navbar";

const HomeIndex = ({ userLogin }) => {
  return (
    <Navbar userLogin={userLogin}>
      <div>{userLogin?.name}</div>
    </Navbar>
  );
};

export default HomeIndex;
