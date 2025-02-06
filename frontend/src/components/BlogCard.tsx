import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";

interface BlogProps{
  id:string;
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
}

function BlogCard({id,authorName,publishedDate,title,content}:BlogProps) {
  
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-5 my-4 bg-white rounded-lg shadow-sm border-b-2">
        <div className="flex items-center">
           <Avatar name={authorName}/> 
           <h1 className="flex items-center pl-2 font-semibold">{authorName} <span className="flex items-center text-gray-400 font-medium"><LuDot/>{publishedDate}</span></h1> 
        </div> 
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div>
          <h1 className="text-xl font-mono font-medium">{content.length>100?content.substring(0,100)+'...':content}</h1>
        </div>
        <div>
          <h1 className="text-sm font-light text-gray-400">{Math.ceil(content.length/100)} min read</h1>
        </div>
    </div>
    </Link>
    
  )
}

export default BlogCard

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
  <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
      {name[0]}
  </span>
</div>
}