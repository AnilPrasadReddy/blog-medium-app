import Auth from "../components/Auth";
import Quote from "../components/Quote";

function Signup() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <Auth type="signup" />
            <div className="hidden lg:flex items-center justify-center bg-gray-100 p-8">
                <Quote 
                    quote='"It’s a refreshing experience — a perfect blend of simplicity and creativity, empowering writers and engaging readers seamlessly."' 
                    author="- Sundar Pichai" 
                    company="CEO, Google" 
                />
            </div>
        </div>
    );
}

export default Signup;
 