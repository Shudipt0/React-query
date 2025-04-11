import axios from "axios";

const api = axios.create({
    // baseURL: 'https://dummyjson.com',
    baseURL: 'https://jsonplaceholder.typicode.com',
});

// get posts
export const fetchPosts = async(pageNumber) => {
  try{
    const response = await api.get(`/posts?_start=${pageNumber}&_limit=5`)

    return response.status === 200 ? response.data : [];
  }catch(error){
        console.log(error)
  }
};

// get single post

export const fetchSinglePost = async(id) => { 
    try{
      const response = await api.get(`/posts/${id}`);
    // const response = await api.get(`/posts/1`)
      return response.status === 200 ? response.data : [];
    }catch(error){
          console.log(error)
    }
  };

  // delete post
  export const DeletePost = (id) => {
    return api.delete(`/posts/${id}`);
  };










// export async function getProducts() {
//     const res = await axios.get(BASE_URL+'/products/categories');
//     if(res.status === 200){
//         return res.data;
//     }else{
//         return [];
//     }
// };