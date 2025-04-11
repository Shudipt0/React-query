import { Link } from "react-router-dom";
import { DeletePost, fetchPosts } from "../dataFetch/Api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Posts = () => {

  const [pageNumber, setPageNumber] = useState(0)
  const queryClient = useQueryClient();
// get data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // like useState
    // queryFn: fetchPosts, // like useEffect
    queryFn: () => fetchPosts(pageNumber), // for pagination
    placeholderData: keepPreviousData, // for pagination
    // gcTime: 1000,
    // staleTime: 10000,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
  });

  // mutation function to delete the post
  const deleteMutation = useMutation({
    mutationFn: (id) => DeletePost(id),
    onSuccess: (data, id) => {
        // console.log(data, id)
        queryClient.setQueryData(["posts", pageNumber], (curItem)=> {
          return curItem?.filter((post)=> post.id !== id);
        })
    },
  })

  // conditional rendering based on loading, error and data
  if (isLoading) return <p>Loading....</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong"}</p>;
  return (
    <div>
      <Link to="/" className="text-lg font-light underline ">
        Back to home
      </Link>

      <ul>
        {data?.map((post,index) => (
          <li key={index} className="flex gap-5">
            <Link to={`/posts/${post.id}`} ><span>{post.id}</span> {post.title}</Link>
            <button onClick={() => deleteMutation.mutate(post.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-5">
        <button onClick={()=> setPageNumber((prev)=> prev-5)} 
        disabled={pageNumber === 0? true : false}
        className="bg-blue-500 rounded px-4 py-1 text-white">Prev</button>
        <h2>{(pageNumber/5)+1}</h2>
        <button onClick={()=> setPageNumber((prev)=> prev+5)} className="bg-blue-500 rounded px-4 py-1 text-white">Next</button>
      </div>
    </div>
  );
};

export default Posts;
