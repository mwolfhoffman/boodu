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
      .filter("id", "eq", props.project.id);
    if (data) {
      setProject((p) => (p = data[0]));
    }
  };

  const getTables = async () => {
    const { data, error } = await supabase
      .from("table")
      .select("id, name")
      .filter("project_id", "eq", props.project.id);
    if (data) {
      setTables((t) => (t = data));
    }
  };

  const createTable = async (e: any) => {
    debugger;
    e.preventDefault();
    const { data, error } = await supabase
      .from("table")
      .insert({ name: newTableName, project_id: props.project.id });
    if (data) {
      fetchData();
      setNewTableName((t) => (t = ""));
    }
  };

  const fetchData = async () => {
    await getProject();
    await getTables();
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <div>
        <div>
          <h3>
            {" "}
            Tables:
            <table>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="New Table name"
                    value={newTableName}
                    onChange={(event: any) => {
                      setNewTableName((t) => (t = event.target.value));
                    }}
                  />
                </td>
                <td>
                  <button onClick={(event: any) => createTable(event)}>
                    Create Table
                  </button>
                </td>
              </tr>
            </table>
          </h3>
          {tables.map((t: any) => {
            return <Table key={t.id} table={t} />;
          })}
        </div>
      </div>
    </>
  );
}
