import BlogCard from "../components/BlogCard"
import AppBar from "../components/AppBar"
import { useBlogs } from "../hooks"
import Loader from "../components/Loader";


function Blogs() {
    const {loading,blogs} = useBlogs();
    if(loading){
        return <div className='h-screen flex flex-col justify-center'>
        <Loader/>
    </div>
    }
    return (
        <>
            <AppBar/>
            <div>
                {blogs.map((blog)=><BlogCard
                    id={blog.id} 
                    authorName={blog.author.name || "Anonymous"}
                    publishedDate='2021-10-10'
                    title={blog.title}
                    content={blog.content} 
                />)}
                
            </div>
        </>

    )
}

export default Blogs
