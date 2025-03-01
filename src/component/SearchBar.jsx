import React from 'react'
import { Search } from 'lucide-react'
export default function SearchBar() {
  return (
    <div>
        <div className='bg-white border flex gap-3  px-2 py-1 border-gray-200'>
 <div className='flex justify-center items-center'>
 <Search size={20}/>
 </div>
        <input type="text" placeholder='search' className='outline-none ' />
        </div>
    </div>
  )
}
