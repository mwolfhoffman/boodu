import "../assets/styles/table.scss";
import supabase from "../supabase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <>
      <h2>{props.table.name}</h2>

      <table>
        {tableItems?.length ? (
          <>
            {tableItems?.map((t) => {
              return (
                <tr>
                  <td>{t.name}</td>
                  <td>{t.type}</td>
                  <td></td>
                </tr>
              );
            })}
          </>
        ) : <p>No columns yet...</p>}
      </table>

      {/* <div>
        <form onSubmit={(event: any) => createNewColumn(event)}>
          <input
            type="text"
            placeholder="Column Name"
            value={newColumnName}
            onChange={(e: any) => {
              setNewColumnName((c) => (c = e?.target?.value));
            }}
          />
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
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </>
  );
}
