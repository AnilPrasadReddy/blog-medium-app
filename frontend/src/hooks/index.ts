import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface BlogProps{
    "id": string,
    "title": string,
    "content": string
    "author": {
        "name": string
    }
}

export const useBlog=({id}:{id:string})=>{
  const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<BlogProps>();
    async function fetchBlogs(){
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        });
        const data = response.data.blog;
        
        setblog(data);
        setloading(false);
    }
    useEffect(() => {
      fetchBlogs();
    },[id]);
    return {
      loading,blog
    }
}

export const useBlogs=()=>{
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<BlogProps[]>([]);
    async function fetchBlogs(){
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
          headers:{
            Authorization:localStorage.getItem('token')
          }
        });
        const data = response.data.blogs;
        
        setblogs(data);
        setloading(false);
    }
    useEffect(() => {
      fetchBlogs();
    },[]);
    
    return {
      loading,blogs
    }
}