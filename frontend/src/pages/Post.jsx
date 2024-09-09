import React from "react";
import { useParams } from "react-router-dom";
import CreateForm from "../components/Post/CreateForm";
import UpdateForm from "../components/Post/UpdateForm";

export const Post = () => {
  const { operation } = useParams();
  console.log(operation);

  if (operation === "create") {
    return <CreateForm />;
  }
  else if(operation === "update"){
    return <UpdateForm />;
  }
  return ;
};
