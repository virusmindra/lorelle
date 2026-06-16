import React, { useState, useEffect, useRef } from 'react'
import { Search, X, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

const trending = ['VT Reedle Shot', 'COSRX улитка', 'MARY&MAY ретинол', 'Пилинг-гель', 'LED маска', 'beplain']

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const results = query.length >= 2
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl animate-slide-up overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по косметике, бренду..."
            className="flex-1 text-base focus:outline-none text-gray-800 placeholder-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          )}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 pl-2 border-l border-gray-200">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {query.length < 2 ? (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <TrendingUp size={12} /> Популярные запросы
              </p>
              <div className="flex flex-wrap gap-2">
                {trending.map(t => (
                  <button
                    key={t}
                    onClick={() => setQuery(t)}
                    className="px-3 py-1.5 bg-forest-50 text-forest-700 rounded-full text-sm hover:bg-forest-100 transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-1">😕 Ничего не найдено</p>
              <p className="text-sm">Попробуйте другой запрос</p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Результаты ({results.length})
              </p>
              <div className="space-y-2">
                {results.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-forest-50 transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-forest-700 font-semibold">{product.brand}</p>
                      <p className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-forest-700">
                        {product.name}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-gray-900 flex-shrink-0">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                to={`/catalog`}
                onClick={onClose}
                className="block text-center text-sm text-forest-600 font-medium hover:text-forest-800 mt-4 py-2 border-t border-gray-100"
              >
                Смотреть все результаты →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
