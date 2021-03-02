import Navbar from "../components/navbar";
import "../assets/styles/projects.scss";
import supabase from "../supabase";
import { useEffect, useState } from "react";
import User from "../types/User";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import CreateProject from "./create-project";

export default function () {
  let location = useLocation();
  let { path, url } = useRouteMatch();
  let [user, setUser] = useState<User | undefined>();
  let [projectIds, setProjectIds] = useState<string[]>([]);

  const getUser = async () => {
    const res = await supabase.auth.user();
    setUser((u) => (u = res));
  };

  const getProjects = async (projectIds) => {
    const { data, error } = await supabase.from("project").select("id, name");
  };

  const getProjectIds = async () => {
    if (user) {
      const { data, error } = await supabase
        .from("project_member")
        .select("user_id, project_id")
        .filter("user_id", "eq", user.id);
      if (data) {
        let projectIds: string[] = [];
        data.forEach((p: any) => {
          projectIds.push(p.project_id);
        });
        getProjects(projectIds);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getProjectIds();
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
          <div className="col">
            {/* TODO: List organization links */}
            You Have {projectIds.length || "0"} Projects.
          </div>
        </div>
        {!location?.pathname.includes("create") ? (
          <div className="row">
            <div className="col">
              Create A Project. <Link to={`${url}/create`}>Click Here</Link>
            </div>
          </div>
        ) : null}
      </div>

      <Switch>
        <Route path={`${path}/create`}>
          <CreateProject user={user} />
        </Route>
      </Switch>
    </>
  );
}
