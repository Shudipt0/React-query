import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full h-[50px] flex items-center px-5 gap-8 bg-amber-100'>
      <Link to='/posts' className='text-lg font-semibold ' >Posts</Link>
    </div>
  )
}

export default Header