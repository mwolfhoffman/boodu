import "../assets/styles/navbar.scss";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../supabase";
import Navbar from "../components/navbar";


export default function () {
  let history = useHistory();

  useEffect(() => {
    const checkUser = async () => {
      const user = await supabase.auth.user();
      if (!user) {
        history.push("/login");
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Dashboard</h1>

      <div className="content">
        <p>Hi! Not much going on here yet. Click the Projects tab to map some data!</p>
      </div>
    </>
  );
}
