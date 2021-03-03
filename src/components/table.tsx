import supabase from "../supabase";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function (props) {
  let { id }: any = useParams();
  let [tableItems, setTableItems] = useState([]);

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

  return (
    <>
      <h3>{props.table.name}</h3>

      {tableItems?.length ? (
        <div>
          {tableItems.map((c: any) => {
            return (
              <>
                {c.name} : {c.type}
              </>
            );
          })}
        </div>
      ) : (
        <p>You have no columns in this table yet.</p>
      )}
    </>
  );
}
