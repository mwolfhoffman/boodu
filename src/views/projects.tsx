import Navbar from "../components/navbar";
import "../assets/styles/organizations.scss";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import User from "../types/User";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import CreateProject from "./create-project";

export default function () {
  let { path, url } = useRouteMatch();
  let [user, setUser] = useState<User | undefined>();
  let [projectIds, setProjectIds] = useState<string[]>([]);

  const getUser = async () => {
    const res = await supabase.auth.user();
    setUser((u) => (u = res));
  };

  const getOrganizations = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("project_members")
        .select("id, user_id, project_id")
        .filter("user_id", "eq", user.id);
      if (data) {
        setProjectIds((o) => (o = data));
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
        <h1>Projects</h1>
        <p>Manage Your Projects.</p>
      </div>

      <div className="content">
        <div className="row">
          <div className="col">{user ? user.email : ""}</div>
        </div>

        {projectIds && projectIds.length ? (
          <div className="row">
            <div className="col">
              {/* TODO: List organization links */}
              You Have {projectIds.length} Projects.
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col">
              Create Your First Project.{" "}
              <Link to={`${url}/create`}>Click Here</Link>
            </div>
          </div>
        )}
      </div>

      <Switch>
        <Route path={`${path}/create`}>
          <CreateProject />
        </Route>
      </Switch>
    </>
  );
}
