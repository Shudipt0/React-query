import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchSinglePost } from "../dataFetch/Api";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", id], // like useState
    queryFn: () => fetchSinglePost(id), // like useEffect
  });
  //   console.log(id)

  // conditional rendering based on loading, error and data
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong"}</p>;
  return (
    <div>
      <p>{data.id}</p>
      <h1>{data.title}</h1>
      <h3>{data.body}</h3>
    </div>
  );
};

export default SinglePost;
