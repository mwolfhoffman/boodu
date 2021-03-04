import "../assets/styles/table.scss";
import supabase from "../supabase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { table } from "console";

export default function (props) {
  let { id }: any = useParams();
  let [tableItems, setTableItems] = useState<any[] | []>([]);
  let [newColumnName, setNewColumnName] = useState("");
  let [newColumnType, setNewColumnType] = useState("Bool");

  const fetchTableItems = async () => {
    const { data, error } = await supabase
      .from("table_item")
      .select("*")
      .filter("table_id", "eq", props.table.id);
    if (data) {
      setTableItems((t: any[]) => (t = data));
    }
  };

  useEffect(() => {
    fetchTableItems();
  }, [id]);

  const createNewColumn = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("table_item").insert({
      table_id: props.table.id,
      name: newColumnName,
      type: newColumnType,
    });
    if (data) {
      await fetchTableItems();
      setNewColumnName((n) => (n = ""));
      setNewColumnType((t) => (t = "Bool"));
    }
  };

  const setColumnTypeOption = (value: string) => {
    setNewColumnType((t) => (t = value));
  };
  const deleteColumn = async (e: any, id: string) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("table_item")
      .delete()
      .match({ id: id });
    if (data) {
      debugger;
      await fetchTableItems();
    }
  };
  return (
    <>
      <h2>{props.table.name}</h2>

      <table>
        {tableItems?.map((t) => {
          return (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.type}</td>
              <td>
                <button onClick={(event: any) => deleteColumn(event, t.id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <td>
            <input
              type="text"
              placeholder="New Column Name"
              value={newColumnName}
              onChange={(e: any) => {
                setNewColumnName((n) => (n = e.target.value));
              }}
            />
          </td>
          <td>
            <select
              name="data-type-select"
              id="data-type-select"
              value={newColumnType}
              onChange={(e) => setColumnTypeOption(e.target.value)}
            >
              <option value="Bool">Bool</option>
              <option value="Date">Date</option>
              <option value="Int4">Int4</option>
              <option value="Int8">Int8</option>
              <option value="Text">Text</option>
              <option value="Time">Time</option>
              <option value="Timestamp">Timestamp</option>
            </select>
          </td>
          <td>
            <button onClick={(event: any) => createNewColumn(event)}>
              Add
            </button>
          </td>
        </tr>
      </table>
    </>
  );
}
