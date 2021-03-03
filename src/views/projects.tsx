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
import asyncForEach from "../assets/js/async-foreach";
import Project from "./project";

export default function () {
  let location = useLocation();
  let { path, url } = useRouteMatch();
  let [user, setUser] = useState<User | undefined>();
  let [projects, setProjects] = useState<any[]>([]);

  const getUser = async () => {
    const res = await supabase.auth.user();
    setUser((u) => (u = res));
  };

  const getProjects = async (projectIds) => {
    let projects: any[] = [];
    await asyncForEach(projectIds, async (id) => {
      const { data, error } = await supabase
        .from("project")
        .select("id, name")
        .filter("id", "eq", id);
      projects.push(data[0]);
    });
    setProjects((p) => (p = projects));
    console.log(projects);
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
            <h2> You Have {projects.length || "0"} Projects. </h2>
          </div>
        </div>
        {!location?.pathname.includes("create") && projects?.length < 2 ? (
          <div className="row">
            <div className="col">
              Create A Project. <Link to={`${url}/create`}>Click Here</Link>
            </div>
          </div>
        ) : null}

        {projects && projects.length > 0 ? (
          <div className="row">
            {projects.map((p) => {
              return (
                <div key={p.id}>
                  <Link to={`${url}/${p.id}`}>
                    <span>{p.name}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <Switch>
        <Route path={`${path}/create`}>
          <CreateProject user={user} projects={projects} />
        </Route>
        <Route path={`${path}/:id`}>
          <Project user={user} />
        </Route>
      </Switch>
    </>
  );
}
