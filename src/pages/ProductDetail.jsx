import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, Star, Truck, Shield, RotateCcw, ChevronLeft, Minus, Plus, Check } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail({ onCartOpen }) {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const { addItem, items } = useCart()
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)
  const [tab, setTab] = useState('description')

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h2 className="text-2xl font-bold mb-2">Товар не найден</h2>
        <Link to="/catalog" className="btn-primary">В каталог</Link>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null
  const inCart = items.some(i => i.id === product.id)

  const handleAdd = () => {
    if (!product.inStock) return
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onCartOpen?.()
    }, 800)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-forest-600">Главная</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-forest-600">Каталог</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="relative bg-forest-50 rounded-3xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className={`absolute top-4 left-4 badge ${product.badgeColor} shadow-sm`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-4 right-4 badge bg-green-500 text-white shadow-sm">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="text-forest-700 font-bold text-sm uppercase tracking-wider">{product.brand}</p>
            {product.origin && <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{product.origin}</span>}
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          {/* Volume */}
          <p className="text-gray-500 text-sm mb-4">{product.volume}</p>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className={i <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString('ru')} отзывов)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-bold text-3xl text-gray-900">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.oldPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="text-green-600 font-semibold text-sm bg-green-50 px-2 py-0.5 rounded">
                  Экономия {(product.oldPrice - product.price).toLocaleString('ru-RU')} ₽
                </span>
              </>
            )}
          </div>

          {/* Stock status */}
          <div className={`flex items-center gap-2 text-sm font-medium mb-6 ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </div>

          {/* Qty + Add */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-forest-600 transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-forest-600 transition-colors">
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                !product.inStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : added
                  ? 'bg-green-500 text-white'
                  : 'bg-forest-600 hover:bg-forest-700 text-white shadow-md hover:shadow-forest-200 active:scale-95'
              }`}
            >
              {added ? <><Check size={16} /> Добавлено!</> : <><ShoppingBag size={16} /> В корзину</>}
            </button>

            <button
              onClick={() => setWished(p => !p)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                wished ? 'border-forest-500 bg-forest-50 text-forest-600' : 'border-gray-200 text-gray-500 hover:border-forest-300'
              }`}
            >
              <Heart size={18} className={wished ? 'fill-forest-600' : ''} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { icon: Shield, text: 'Оригинал\n100%' },
              { icon: Truck, text: 'Доставка\nСДЭК 3-7 дней' },
              { icon: RotateCcw, text: 'Возврат\n14 дней' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="bg-forest-50 rounded-xl p-3 text-center">
                <Icon size={18} className="text-forest-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600 whitespace-pre-line leading-tight font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {[
            { key: 'description', label: 'Описание' },
            { key: 'reviews', label: `Отзывы (${product.reviewCount.toLocaleString('ru')})` },
            { key: 'delivery', label: 'Доставка' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition-all ${
                tab === t.key
                  ? 'border-forest-600 text-forest-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <div className="max-w-3xl space-y-0 border border-gray-200">
            {/* What it is */}
            <div className="grid grid-cols-3 border-b border-gray-200">
              <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Что это</p>
              </div>
              <div className="p-4 col-span-2">
                <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            </div>
            {/* Skin type */}
            {product.skinType && (
              <div className="grid grid-cols-3 border-b border-gray-200">
                <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Для какого типа кожи</p>
                </div>
                <div className="p-4 col-span-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{product.skinType}</p>
                </div>
              </div>
            )}
            {/* Key ingredients */}
            {product.ingredients && (
              <div className="grid grid-cols-3 border-b border-gray-200">
                <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Ключевые ингредиенты</p>
                </div>
                <div className="p-4 col-span-2">
                  <ul className="space-y-1">
                    {product.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-forest-600 mt-0.5">·</span> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Effects */}
            {product.effects && (
              <div className="grid grid-cols-3 border-b border-gray-200">
                <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Действие</p>
                </div>
                <div className="p-4 col-span-2">
                  <ul className="space-y-1">
                    {product.effects.map((eff, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-forest-600 mt-0.5">✓</span> {eff}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* How to use */}
            {product.howToUse && (
              <div className="grid grid-cols-3 border-b border-gray-200">
                <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Как использовать</p>
                </div>
                <div className="p-4 col-span-2">
                  <ol className="space-y-1.5">
                    {product.howToUse.map((step, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-forest-700 font-bold text-xs mt-0.5 flex-shrink-0">{i + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            {/* Why popular */}
            {product.whyPopular && (
              <div className="grid grid-cols-3 border-b border-gray-200">
                <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Почему популярен</p>
                </div>
                <div className="p-4 col-span-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{product.whyPopular}</p>
                </div>
              </div>
            )}
            {/* Details */}
            <div className="grid grid-cols-3">
              <div className="p-4 bg-cream-100 border-r border-gray-200 flex items-start">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Дополнительно</p>
              </div>
              <div className="p-4 col-span-2 space-y-1">
                <p className="text-sm text-gray-700">Объём: <strong>{product.volume}</strong></p>
                <p className="text-sm text-gray-700">Бренд: <strong>{product.brand}</strong></p>
                <p className="text-sm text-gray-700">Происхождение: <strong>{product.origin}</strong></p>
              </div>
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-forest-700">{product.rating}</div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">{product.reviewCount.toLocaleString('ru')} отзывов</p>
              </div>
            </div>
            <div className="bg-forest-50 rounded-xl p-4 text-center text-gray-500 text-sm">
              Отзывы загружаются...
            </div>
          </div>
        )}

        {tab === 'delivery' && (
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center justify-between bg-forest-50 border border-forest-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🇷🇺</span>
                <div>
                  <p className="font-semibold text-sm">Россия — СДЭК</p>
                  <p className="text-xs text-gray-500">3–7 рабочих дней</p>
                </div>
              </div>
              <span className="text-sm text-forest-700 font-semibold">Бесплатно от 20 000 ₽</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🇷🇺</span>
                <div>
                  <p className="font-semibold text-sm">Россия — Почта России</p>
                  <p className="text-xs text-gray-500">7–14 рабочих дней</p>
                </div>
              </div>
              <span className="text-sm text-forest-700 font-semibold">Бесплатно от 20 000 ₽</span>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏙️</span>
                <div>
                  <p className="font-semibold text-sm">Курьер по Москве</p>
                  <p className="text-xs text-gray-500">1–2 рабочих дня</p>
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium">500 ₽</span>
            </div>
            <p className="text-xs text-gray-400 pt-2">Доставка осуществляется только по России. Стоимость без бесплатного порога — 350 ₽ (СДЭК).</p>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="section-title mb-6">Похожие товары</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  )
}
