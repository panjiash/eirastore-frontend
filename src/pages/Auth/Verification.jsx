import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverMaster } from "../../config/Index.js";

const Verification = () => {
  const params = useParams();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const getVerifikasi = async () => {
      setMsg("Verifying your data..");
      const response = await axios.put(
        `${serverMaster}/verified/${params?.id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response?.status == 200) {
        setMsg("Akun Anda telah diverifikasi");
        window.location.href = "/";
      } else {
        setMsg("Gagal melakukan verifikasi, silahkan kontak admin.");
      }
    };
    getVerifikasi();
  }, [params?.id]);

  return <React.Fragment>{msg}</React.Fragment>;
};

export default Verification;
