import { useState } from "react";
import supabase from "../supabase";
import { useHistory } from "react-router-dom";

export default function (props) {
  let history = useHistory();
  let [newProjectName, setNewProjectName] = useState<string>("");

  const createProjectMember = async (newProject) => {
    const { data, error } = await supabase
      .from("project_member")
      .insert({ user_id: props.user.id, project_id: newProject.id });
    debugger;
    if (data) {
      setNewProjectName((n) => (n = ""));
      history.goBack();
    }
  };

  const createProject = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("project")
      .insert({ name: newProjectName });
    if (data?.length > 0) {
      await createProjectMember(data[0]);
    }
  };

  return (
    <>
      <div className="container">
        <h2>Create Project</h2>
        <form onSubmit={(event) => createProject(event)}>
          <div className="container">
            <label htmlFor="project-name">
              <b>Project Name</b>
            </label>
            <input
              type="text"
              placeholder="Project Name"
              name="project-name"
              value={newProjectName}
              onChange={(event) => {
                setNewProjectName((current) => (current = event.target.value));
              }}
              required
            />

            <button type="submit">Create Project</button>
          </div>
        </form>
      </div>
    </>
  );
}
