import {BrowserRouter, Route, Routes} from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import SinglePost from "./pages/SinglePost"
import InfinitePosts from "./pages/InfinitePosts"


function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
               <Route index element={<Home/>} />
               <Route path="/posts" element={<Posts/>} />
               <Route path="/posts/:id" element={<SinglePost/>} />
               <Route path="/infinite-posts" element={<InfinitePosts/>} />

          </Route>
        </Routes>     
    </BrowserRouter>
  )
}

export default App
