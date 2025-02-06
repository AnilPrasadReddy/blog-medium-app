// import React from 'react'
import {useParams} from 'react-router-dom'
import { useBlog } from "../hooks"
import CompleteBlog from '../components/CompleteBlog'
import AppBar from '../components/AppBar'
import Loader from '../components/Loader'

function Blog() {
    const {id} = useParams()
    const {loading,blog}=useBlog({
        id: id || ""
    })
    if (loading) {
        <AppBar/>
        return <div className='h-screen flex flex-col justify-center'>
            <Loader/>
        </div>
    }
    return (
        <div>
            <AppBar/>
            <CompleteBlog blog={blog}/>
        </div>
    )
}

export default Blog
