import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, Grid3X3, List, ChevronDown, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import CategoryBar from '../components/CategoryBar'
import { products } from '../data/products'

const sortOptions = [
  { value: 'popular', label: 'По популярности' },
  { value: 'price_asc', label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'rating', label: 'По рейтингу' },
  { value: 'new', label: 'Новинки' },
]

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [onlySale, setOnlySale] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setActiveCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (id) => {
    setActiveCategory(id)
    if (id === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: id })
    }
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }
    if (onlyInStock) {
      result = result.filter(p => p.inStock)
    }
    if (onlySale) {
      result = result.filter(p => p.oldPrice)
    }
    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min))
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max))
    }

    switch (sortBy) {
      case 'price_asc': return result.sort((a, b) => a.price - b.price)
      case 'price_desc': return result.sort((a, b) => b.price - a.price)
      case 'rating': return result.sort((a, b) => b.rating - a.rating)
      case 'new': return result.sort((a, b) => b.id - a.id)
      default: return result.sort((a, b) => b.reviewCount - a.reviewCount)
    }
  }, [activeCategory, sortBy, onlyInStock, onlySale, priceRange])

  const activeFiltersCount = [onlyInStock, onlySale, priceRange.min, priceRange.max].filter(Boolean).length

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <span className="hover:text-forest-600 cursor-pointer" onClick={() => window.history.back()}>Главная</span>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Каталог</span>
      </nav>

      <h1 className="section-title mb-6">Каталог товаров</h1>

      {/* Categories */}
      <CategoryBar active={activeCategory} onChange={handleCategoryChange} />

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-6 mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              showFilters || activeFiltersCount > 0
                ? 'bg-forest-50 border-forest-300 text-forest-700'
                : 'bg-white border-gray-200 text-gray-700 hover:border-forest-300'
            }`}
          >
            <SlidersHorizontal size={15} />
            Фильтры
            {activeFiltersCount > 0 && (
              <span className="bg-forest-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>
          <p className="text-sm text-gray-500">
            Найдено: <strong className="text-gray-800">{filtered.length}</strong> товаров
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-forest-400 bg-white"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {/* Price range */}
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Цена, ₽</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="от"
                  value={priceRange.min}
                  onChange={e => setPriceRange(p => ({ ...p, min: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest-400"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  placeholder="до"
                  value={priceRange.max}
                  onChange={e => setPriceRange(p => ({ ...p, max: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-forest-400"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Наличие</p>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-forest-600"
                />
                <span className="text-sm text-gray-600">Только в наличии</span>
              </label>
            </div>

            <div>
              <p className="font-semibold text-sm text-gray-700 mb-2">Цена</p>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={e => setOnlySale(e.target.checked)}
                  className="w-4 h-4 accent-forest-600"
                />
                <span className="text-sm text-gray-600">Только со скидкой</span>
              </label>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setOnlyInStock(false)
                  setOnlySale(false)
                  setPriceRange({ min: '', max: '' })
                }}
                className="flex items-center gap-1.5 text-sm text-forest-600 hover:text-forest-800 font-medium transition-colors"
              >
                <X size={14} /> Сбросить фильтры
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Товары не найдены</h3>
          <p className="text-gray-500 text-sm">Попробуйте изменить фильтры</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
