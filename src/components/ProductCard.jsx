import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addItem, items } = useCart()
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const inCart = items.some(i => i.id === product.id)
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setWished(p => !p)
  }

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="card overflow-hidden">
        {/* Image container */}
        <div className="relative bg-forest-50/50 overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`badge ${product.badgeColor} shadow-sm`}>{product.badge}</span>
            )}
            {discount && (
              <span className="badge bg-green-600 text-white shadow-sm">-{discount}%</span>
            )}
            {!product.inStock && (
              <span className="badge bg-gray-500 text-white">Нет в наличии</span>
            )}
          </div>

          {/* Hover actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleWish}
              className={`w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-all ${
                wished ? 'bg-forest-600 text-white' : 'bg-white text-gray-600 hover:text-forest-600'
              }`}
            >
              <Heart size={16} className={wished ? 'fill-white' : ''} />
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-forest-600 transition-colors"
            >
              <Eye size={16} />
            </Link>
          </div>

          {/* Add to cart hover button */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                !product.inStock
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : added
                  ? 'bg-green-500 text-white'
                  : 'bg-forest-600 hover:bg-forest-700 text-white'
              }`}
            >
              <ShoppingBag size={15} />
              {!product.inStock ? 'Нет в наличии' : added ? 'Добавлено ✓' : 'В корзину'}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-forest-700 font-semibold uppercase tracking-wide">{product.brand}</p>
            {product.origin && <span className="text-xs text-gray-400">{product.origin}</span>}
          </div>
          <h3 className="text-sm font-medium text-gray-800 leading-snug mb-2 line-clamp-2 group-hover:text-forest-700 transition-colors">
            {product.name}
          </h3>

          {/* Volume */}
          <p className="text-xs text-gray-400 mb-2">{product.volume}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star
                  key={i}
                  size={12}
                  className={i <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString('ru')})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-gray-900">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.oldPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
