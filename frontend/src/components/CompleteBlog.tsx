import { BlogProps } from "../hooks";
import { Avatar } from "./BlogCard";


function CompleteBlog({ blog }: { blog?: BlogProps }) {
    if (!blog) return <div>No blog available</div>;

    return (
        <div>
            <div className='grid grid-cols-12 w-full p-5'>
                <div className='col-span-8 flex flex-col justify-center gap-5'>
                    <h1 className="text-5xl font-bold"> {blog.title}</h1>
                    <h1 className="font-medium text-gray-400 pl-1">Post on 31st January 2025</h1>
                    <h1 className="w-[80%] text-gray-600 text-xl font-mono font-medium">{blog.content}</h1>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grab the user's attention
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    );
}


export default CompleteBlog;
