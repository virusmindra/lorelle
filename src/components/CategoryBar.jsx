import React from 'react'
import { categories } from '../data/products'

export default function CategoryBar({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
            active === cat.id
              ? 'bg-forest-600 text-white shadow-md shadow-forest-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-forest-300 hover:text-forest-700'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  )
}
