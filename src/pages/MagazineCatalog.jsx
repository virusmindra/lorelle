import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home, BookOpen, ScanFace, Info, ShoppingBag, Menu, X, Tag } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

const sideNav = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/catalog', icon: BookOpen, label: 'Каталог' },
  { to: '/skin-analysis', icon: ScanFace, label: 'Анализ кожи' },
  { to: '/sales', icon: Tag, label: 'Скидки' },
  { to: '/about', icon: Info, label: 'О нас' },
]

const buildSpreads = () => {
  const s = [{ type: 'cover' }]
  for (let i = 0; i < products.length; i += 2) {
    s.push({ type: 'products', left: products[i], right: products[i + 1] || null, page: i + 2 })
  }
  s.push({ type: 'skinanalysis' })
  s.push({ type: 'backcover' })
  return s
}
const allSpreads = buildSpreads()

function ProductPage({ product, pageNum }) {
  const { addItem } = useCart()
  if (!product) return <div className="flex-1 bg-cream-50" />
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white relative" style={{ borderLeft: '1px solid #eee' }}>
      <div className="px-5 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
        <span className="text-[8px] uppercase tracking-widest text-gray-400 font-semibold">{product.brand}</span>
        <span className="text-[8px] text-gray-300">{product.origin}</span>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[8px] px-2 py-0.5 font-semibold ${product.badgeColor}`}>{product.badge}</span>
        )}
      </div>
      <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
        <p className="font-serif italic text-sm leading-snug text-gray-900 mb-0.5 line-clamp-2">{product.name}</p>
        {product.skinType && (
          <p className="text-[9px] text-gray-400 mb-2 line-clamp-1 leading-tight">{product.skinType.split('.')[0]}</p>
        )}
        {product.effects && (
          <div className="mb-2 space-y-0.5">
            {product.effects.slice(0, 2).map((e, i) => (
              <p key={i} className="text-[8px] text-gray-500 flex items-center gap-1"><span className="text-forest-500">✓</span>{e}</p>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-serif font-bold text-base text-forest-700">{product.price.toLocaleString('ru-RU')} ₽</span>
          <button
            onClick={() => addItem(product)}
            className="text-[9px] uppercase tracking-wider font-bold border border-forest-700 text-forest-700 hover:bg-forest-700 hover:text-white px-2.5 py-1 transition-colors"
          >
            + В корзину
          </button>
        </div>
      </div>
      <div className="px-5 pb-1.5 text-[8px] text-gray-200 text-right flex-shrink-0">{pageNum}</div>
    </div>
  )
}

function CoverSpread() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 bg-forest-900 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 text-center px-8">
          <p className="text-[8px] uppercase tracking-[0.5em] text-cream-500 mb-5">Korea & Vietnam Beauty</p>
          <h1 className="font-serif font-black text-7xl tracking-[0.2em] leading-none text-cream-100 mb-4">HANA</h1>
          <div className="w-10 h-px bg-cream-500 mx-auto mb-5" />
          <p className="text-[9px] uppercase tracking-widest text-cream-400">Каталог · 2025</p>
          <p className="text-[9px] uppercase tracking-widest text-cream-600 mt-1">Spring / Summer Edition</p>
        </div>
        <div className="absolute bottom-4 left-5 text-[8px] text-cream-700 uppercase tracking-widest">hana-beauty.ru</div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=900&fit=crop" alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 text-white">
          <p className="font-serif italic text-xl leading-snug mb-1">«Красота из Азии — без переплат»</p>
          <p className="text-[9px] uppercase tracking-widest text-white/60">Прямые поставки · Только оригинал</p>
        </div>
        <div className="absolute top-5 right-5 text-white/30 text-[9px] uppercase tracking-widest">Стр. 1</div>
      </div>
    </div>
  )
}

function SkinAnalysisSpread() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=600&h=900&fit=crop&crop=face" alt="Skin Analysis" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/80 via-forest-900/20 to-transparent" />
        <div className="absolute bottom-8 left-8 right-6 text-white">
          <p className="text-[8px] uppercase tracking-widest text-cream-400 mb-2">Бесплатный сервис HANA</p>
          <h2 className="font-serif font-black text-5xl leading-none mb-2 text-cream-50">Анализ<br />кожи</h2>
          <div className="w-8 h-px bg-cream-500 mb-3" />
          <p className="text-[10px] text-white/70 leading-relaxed">Персональные рекомендации по уходу — в течение 24 часов на ваш email</p>
        </div>
      </div>
      <div className="flex-1 bg-cream-100 flex flex-col justify-center px-10 py-8">
        <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-6">Как это работает</p>
        <div className="space-y-5 mb-8">
          {[
            ['01', 'Загрузите фото лица анфас'],
            ['02', 'Заполните имя, email и адрес'],
            ['03', 'Отправьте форму — бесплатно'],
            ['04', 'Ответ придёт до 24 часов'],
          ].map(([num, text]) => (
            <div key={num} className="flex items-start gap-4">
              <span className="font-serif text-2xl font-bold text-forest-200 leading-none flex-shrink-0">{num}</span>
              <p className="text-xs text-gray-700 leading-snug pt-1">{text}</p>
            </div>
          ))}
        </div>
        <Link to="/skin-analysis" className="btn-primary text-center text-[10px] py-3">
          Пройти анализ →
        </Link>
        <p className="text-[9px] text-gray-400 mt-4 text-center">Бесплатно · Без обязательств</p>
      </div>
    </div>
  )
}

function BackCoverSpread() {
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 bg-cream-50 flex flex-col items-center justify-center p-10 border-r border-gray-100">
        <p className="text-[8px] uppercase tracking-widest text-gray-400 mb-6 text-center">Доставка по всей России</p>
        <div className="space-y-3 w-full max-w-xs">
          {['🚚 СДЭК · 3–7 рабочих дней', '📬 Почта России · 7–14 дней', '🏙 Курьер по Москве · 1–2 дня'].map(m => (
            <div key={m} className="border border-gray-200 px-4 py-2.5 text-[10px] text-gray-600 text-center tracking-wide">{m}</div>
          ))}
        </div>
        <p className="text-[9px] text-forest-600 mt-5 font-semibold text-center">Бесплатно от 20 000 ₽</p>
        <p className="text-[8px] text-gray-300 mt-2 text-center">Минимальный заказ 14 000 ₽</p>
      </div>
      <div className="flex-1 bg-forest-900 flex flex-col items-center justify-center text-white p-10">
        <p className="font-serif font-black text-6xl tracking-[0.2em] text-cream-100 mb-4">HANA</p>
        <div className="w-8 h-px bg-cream-600 mb-5" />
        <p className="text-[9px] uppercase tracking-widest text-cream-400 text-center leading-loose">
          hana-beauty.ru<br />+7 (800) 555-35-35<br />info@hana-beauty.ru
        </p>
        <div className="mt-8 pt-8 border-t border-forest-700 w-full text-center">
          <p className="text-[8px] text-cream-700">© 2025 HANA. Все права защищены.</p>
          <p className="text-[8px] text-cream-800 mt-1">Корейская и вьетнамская косметика</p>
        </div>
      </div>
    </div>
  )
}

export default function MagazineCatalog() {
  const [idx, setIdx] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [flipDir, setFlipDir] = useState('next')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const touchStartX = useRef(null)

  const flip = (dir) => {
    if (animating) return
    const next = dir === 'next' ? idx + 1 : idx - 1
    if (next < 0 || next >= allSpreads.length) return
    setFlipDir(dir)
    setAnimating(true)
    setTimeout(() => setIdx(next), 275)
    setTimeout(() => setAnimating(false), 560)
  }

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') flip('next')
      if (e.key === 'ArrowLeft') flip('prev')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 60) flip(dx < 0 ? 'next' : 'prev')
    touchStartX.current = null
  }

  const spread = allSpreads[idx]
  const pageNum = idx * 2

  return (
    <div className="fixed inset-0 flex overflow-hidden" style={{ background: 'linear-gradient(135deg, #c8b49a 0%, #d4c4a8 50%, #bfaa90 100%)' }}>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed md:relative left-0 top-0 h-full w-52 bg-forest-900 text-white flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex-shrink-0`}>
        <div className="p-6 border-b border-forest-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-serif font-black text-2xl tracking-widest text-cream-100">HANA</p>
              <p className="text-[8px] uppercase tracking-widest text-cream-600 mt-0.5">K-Beauty Edition</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-cream-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
          <p className="text-[8px] uppercase tracking-widest text-cream-700 px-3 pb-2 pt-1">Навигация</p>
          {sideNav.map(({ to, icon: Icon, label }) => (
            <Link key={to} to={to} className="flex items-center gap-3 px-3 py-2.5 text-[11px] uppercase tracking-widest font-semibold text-cream-300 hover:text-white hover:bg-forest-700 transition-colors">
              <Icon size={12} strokeWidth={2.5} />
              {label}
            </Link>
          ))}

          <div className="pt-4">
            <p className="text-[8px] uppercase tracking-widest text-cream-700 px-3 pb-2">Разделы каталога</p>
            {allSpreads.map((s, i) => (
              <button
                key={i}
                onClick={() => { setIdx(i); setSidebarOpen(false) }}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[10px] transition-colors ${i === idx ? 'text-white bg-forest-700' : 'text-cream-500 hover:text-cream-200'}`}
              >
                <span className="text-[8px] w-5 opacity-50">{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">
                  {s.type === 'cover' ? 'Обложка' :
                   s.type === 'skinanalysis' ? 'Анализ кожи' :
                   s.type === 'backcover' ? 'Контакты' :
                   s.left?.brand || 'Продукты'}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-5 border-t border-forest-700">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[8px] uppercase tracking-widest text-cream-600">Страница</p>
            <p className="text-[8px] text-cream-400">{idx + 1} / {allSpreads.length}</p>
          </div>
          <div className="h-0.5 bg-forest-700 w-full">
            <div className="h-full bg-cream-400 transition-all duration-500" style={{ width: `${((idx + 1) / allSpreads.length) * 100}%` }} />
          </div>
        </div>
      </aside>

      {/* Book area */}
      <div className="flex-1 flex flex-col items-center justify-center relative min-w-0">

        {/* Mobile menu button */}
        <button onClick={() => setSidebarOpen(true)} className="absolute top-4 left-4 md:hidden z-20 w-9 h-9 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md">
          <Menu size={16} />
        </button>

        {/* The Book */}
        <div className="w-full px-10 md:px-14 max-w-5xl">
          <div
            className={`relative bg-white overflow-hidden ${animating ? (flipDir === 'next' ? 'animate-flip-next' : 'animate-flip-prev') : ''}`}
            style={{
              aspectRatio: '16/9',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.2)',
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Spine */}
            <div className="absolute left-1/2 top-0 bottom-0 w-5 -translate-x-1/2 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.06), rgba(0,0,0,0.12), rgba(0,0,0,0.06))' }} />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 z-10 pointer-events-none" />

            {/* Spread */}
            <div className="flex h-full">
              {spread.type === 'cover' && <CoverSpread />}
              {spread.type === 'products' && (
                <>
                  <ProductPage product={spread.left} pageNum={pageNum} />
                  <ProductPage product={spread.right} pageNum={pageNum + 1} />
                </>
              )}
              {spread.type === 'skinanalysis' && <SkinAnalysisSpread />}
              {spread.type === 'backcover' && <BackCoverSpread />}
            </div>

            {/* Page-curl hint corners */}
            <div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none" style={{ background: 'linear-gradient(135deg, #d4c4a8 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none" style={{ background: 'linear-gradient(225deg, #d4c4a8 0%, transparent 60%)' }} />
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-[9px] text-black/25 mt-3 uppercase tracking-widest hidden md:block">← → клавиши или стрелки для листания</p>
        </div>

        {/* Arrow: Prev */}
        <button
          onClick={() => flip('prev')}
          disabled={idx === 0 || animating}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition disabled:opacity-20 disabled:cursor-default"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        {/* Arrow: Next */}
        <button
          onClick={() => flip('next')}
          disabled={idx === allSpreads.length - 1 || animating}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/70 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition disabled:opacity-20 disabled:cursor-default"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {allSpreads.map((_, i) => (
            <button
              key={i}
              onClick={() => { if (!animating) setIdx(i) }}
              className={`w-1.5 h-1.5 transition-all ${i === idx ? 'bg-forest-800 w-4' : 'bg-black/20 hover:bg-black/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
