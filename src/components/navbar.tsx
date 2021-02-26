import supabase from "../supabase";
import { useHistory } from "react-router-dom";

export default function () {
  let history = useHistory();
  const onNavMenuClick = (e: any) => {
    e.preventDefault();
    var x: any = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  };

  const logout = async (e: any) => {
    e.preventDefault();
    debugger;
    let { error } = await supabase.auth.signOut();
    history.push("/login");
  };

  return (
    <div className="topnav" id="myTopnav">
      <a href="#home">Boodu</a>
      <a href="#news">Organizations</a>
      <a href="#contact">Settings</a>
      <a onClick={(e) => logout(e)}>Logout</a>
      <a
        href="javascript:void(0);"
        className="icon"
        onClick={(e) => onNavMenuClick(e)}
      >
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
}
