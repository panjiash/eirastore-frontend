import { useState } from "react";
import Navbars from "../../Components/Navbars";
import ProductPage from "./ProductPage";

const ProductIndex = () => {
  const [user, setUser] = useState(null); // State to hold user data

  return (
    <div>
      <Navbars setUser={setUser} />
      <ProductPage data={user} />
    </div>
  );
};

export default ProductIndex;
