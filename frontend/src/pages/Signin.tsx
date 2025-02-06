
import Auth from "../components/Auth"
import Quote from "../components/Quote"

function Signin() {
    return (
        <div className="grid grid-cols-2">
            <Auth type="signin"/>
            <div className="hidden md:block">
            <Quote quote='"Exploring it felt like unlocking a world of endless stories and inspiration — a must-visit for every writer and reader."' author="- Satya Nadella" company="CEO, Microsoft"/>
            </div>
        </div>
    )
}

export default Signin;
