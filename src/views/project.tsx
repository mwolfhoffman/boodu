import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabase";

export default function (props) {
  let { id }: any = useParams();
  let [project, setProject] = useState({name:''});

  const getProject = async () => {
    const { data, error } = await supabase
      .from("project")
      .select("id, name")
      .filter("id", "eq", id);
    if (data) {
      console.log(data);
      setProject((p) => (p = data[0]));
    }
  };

  useEffect(() => {
    getProject();
  }, [id]);

  return (
    <>
      <h2>Project: {project?.name} </h2>
    </>
  );
}
