import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const searchBar = () => {
  return (
    <div className="flex items-center justify-center my-4">
      <div className="w-1/3 relative">
        <MagnifyingGlassIcon className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search books..."
          className="w-full py-4 pl-10 px-6 text-lg text-gray-700 border border-ocean-blue rounded-md focus:outline-none focus:ring-1 focus:ring-deep-ocean"
        />
      </div>
    </div>
  )
}

export default searchBar