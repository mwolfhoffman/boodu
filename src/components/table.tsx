import supabase from "../supabase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function (props) {
  let { id }: any = useParams();
  let [tableItems, setTableItems] = useState([]);
  let [newColumnName, setNewColumnName] = useState("");
  let [newColumnType, setNewColumnType] = useState("Bool");

  const fetchTableItems = async () => {
    const { data, error } = await supabase
      .from("table_item")
      .select("*")
      .filter("table_id", "eq", props.table.id);
    if (data) {
      console.log("TableItems ", data);
      setTableItems((t) => (t = data));
      console.log("table items state ", tableItems);
    }
  };

  useEffect(() => {
    fetchTableItems();
  }, [id]);

  const createNewColumn = async (e: any) => {
    e.preventDefault();
    console.log(newColumnName, newColumnType);
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
      <h3>{props.table.name}</h3>

      {tableItems?.length ? (
        <div>
          {tableItems.map((c: any) => {
            return (
              <div key={c.id}>
                {c.name} : {c.type}
              </div>
            );
          })}
        </div>
      ) : (
        <p>You have no columns in this table yet.</p>
      )}

      <div>
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
      </div>
    </>
  );
}
