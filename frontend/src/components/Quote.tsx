// import React from 'react'
interface quoteProps {
    quote: string;
    author: string;
    company: string;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function Quote({ quote, author, company }: quoteProps) {
    return (
        <div className="bg-gray-100 h-screen w-full flex flex-col justify-center items-center">
            <div className="border border-gray-300 p-4 rounded-lg w-[70%]">
            <h1 className="quote text-2xl font-bold ">{quote}</h1>
            <h1 className="text-lg font-medium mt-3">{author}</h1>
            <p className="text-sm font-medium text-gray-400">{company}</p>
            </div>
        </div>
    )
}

export default Quote;
