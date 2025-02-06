import React from 'react'
import { Avatar } from './BlogCard'
import { IoIosMore } from 'react-icons/io'
import { Link } from 'react-router-dom'

function AppBar() {
  return (
    <div className='bg-white px-7 py-5 flex justify-between items-center'>
      <Link to={'/'}>
        <img src="https://logos-world.net/wp-content/uploads/2023/07/Medium-Logo.jpg" alt="logo" className='h-[80px] object-cover cursor-pointer' />
      </Link>
      <div className='flex gap-4 items-center'>
      <Link to={`/publish`}>
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
      </Link>
        <IoIosMore className='text-2xl' />
        <Avatar size='big' name='Anil' />
      </div>
    </div>
  )
}

export default AppBar
