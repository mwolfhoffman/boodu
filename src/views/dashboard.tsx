import { useHistory } from "react-router-dom";
import {useEffect } from "react";
import supabase from "../supabase";

export default function () {
  let history = useHistory();

  useEffect(() => {
    const checkUser = async () => {
      const user = await supabase.auth.user();
      debugger
      if (!user) {
        history.push("/login");
      }
    };
    checkUser();
  }, []);

  return <>Dashboard</>;
}
