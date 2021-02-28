import Navbar from "../components/navbar";
import "../assets/styles/organizations.scss";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import User from "../types/User";

export default function () {
  let [user, setUser] = useState<User | undefined>();
  let [organizationIds, setOrganizationIds] = useState<string[]>([]);

  const getUser = async () => {
    const res = await supabase.auth.user();
    setUser((u) => (u = res));
  };

  const getOrganizations = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("organizations_members")
        .select("id, user_id, organization_id")
        .filter("user_id", "eq", user.id);
      if (data) {
        setOrganizationIds((o) => (o = data));
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getOrganizations();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="header">
        <h1>Organizations</h1>
        <p>Manage your teams and organizations.</p>
      </div>

      <div className="content">
        <div className="row">
          <div className="col">{user ? user.email : "poop"}</div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            You have {organizationIds.length} organizations
          </div>
        </div>
      </div>
    </>
  );
}
