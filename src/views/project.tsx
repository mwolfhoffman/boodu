import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/table";
import supabase from "../supabase";

export default function (props) {
  let { id }: any = useParams();
  let [project, setProject] = useState({ name: "" });
  let [newTableName, setNewTableName] = useState("");
  let [tables, setTables] = useState([]);

  const getProject = async () => {
    const { data, error } = await supabase
      .from("project")
      .select("id, name")
      .filter("id", "eq", id);
    if (data) {
      setProject((p) => (p = data[0]));
    }
  };

  const getTables = async () => {
    const { data, error } = await supabase
      .from("table")
      .select("id, name")
      .filter("project_id", "eq", id);
    if (data) {
      setTables((t) => (t = data));
    }
  };

  const createTable = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("table")
      .insert({ name: newTableName, project_id: id });
    setNewTableName((t) => (t = ""));
  };

  const fetchData = async()=>{
      await getProject();
      await getTables();
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
    <div className="w3-round w3-teal w3-margin-top"><h2>Project: {project?.name}</h2> </div>

      <form onSubmit={(event: any) => createTable(event)}>
        <input
          type="text"
          placeholder="Enter Table Name"
          value={newTableName}
          onChange={(event: any) => {
            setNewTableName((t) => (t = event.target.value));
          }}
        />
        <button type="submit">Create Table</button>
      </form>

      <div>
        {tables?.length ? (
          <div>
              <h3> Tables: </h3>
            {
                tables.map((t:any)=>{
                    return (<Table key={t.id} table={t} />)
                })
            }

          </div>
        ) : (
          <p>You currently have no tables for this project.</p>
        )}
      </div>
    </>
  );
}
