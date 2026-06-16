import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Search, Heart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header({ onCartOpen, onSearchOpen }) {
  const { totalQty } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const navLinks = [
    { to: '/', label: 'Главная' },
    { to: '/catalog', label: 'Каталог' },
    { to: '/skin-analysis', label: 'Анализ кожи' },
    { to: '/brands', label: 'Бренды' },
    { to: '/sales', label: 'Скидки' },
    { to: '/about', label: 'О нас' },
  ]

  return (
    <>
      {/* Thin top strip */}
      <div className="bg-forest-900 text-white text-[11px] py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="tracking-widest uppercase">🇰🇷 Прямые поставки из Кореи и Вьетнама · Только оригинал</span>
          <span className="tracking-widest uppercase">Бесплатная доставка от 20 000 ₽ · +7 (800) 555-35-35</span>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/98 backdrop-blur-sm border-gray-200 shadow-sm'
          : 'bg-cream-100 border-cream-300'
      }`}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Brand row */}
          <div className="flex items-center justify-between py-4 md:py-5">
            {/* Left: editorial label */}
            <div className="hidden md:block w-36">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Beauty</p>
              <p className="text-[10px] uppercase tracking-widest text-gray-400">Korea · Vietnam</p>
            </div>

            {/* Center: Brand */}
            <Link to="/" className="flex flex-col items-center group">
              <span className="font-serif font-black text-3xl md:text-4xl tracking-[0.18em] text-gray-900 leading-none hover:text-forest-800 transition-colors">
                HANA
              </span>
              <span className="text-[9px] uppercase tracking-[0.4em] text-gray-400 mt-1 font-medium hidden sm:block">
                K‑Beauty Edition
              </span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:w-36 justify-end">
              <button
                onClick={onSearchOpen}
                className="p-2 text-gray-600 hover:text-forest-700 transition-colors"
                aria-label="Поиск"
              >
                <Search size={18} />
              </button>
              <button className="p-2 text-gray-600 hover:text-forest-700 transition-colors hidden sm:block" aria-label="Избранное">
                <Heart size={18} />
              </button>
              <button
                onClick={onCartOpen}
                className="relative p-2 text-gray-600 hover:text-forest-700 transition-colors"
                aria-label="Корзина"
              >
                <ShoppingBag size={18} />
                {totalQty > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-forest-700 text-white text-[9px] font-bold flex items-center justify-center animate-fade-in">
                    {totalQty > 99 ? '99+' : totalQty}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-forest-700 transition-colors ml-1"
                aria-label="Меню"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Nav row */}
          <div className="hidden lg:flex items-center justify-center border-t border-cream-300 py-2.5 gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[11px] uppercase tracking-widest font-semibold transition-colors pb-0.5 ${
                  location.pathname === link.to
                    ? 'text-forest-700 border-b border-forest-700'
                    : 'text-gray-500 hover:text-gray-900'
                } ${link.to === '/skin-analysis' ? 'text-forest-700 font-bold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-cream-100 border-t border-cream-300 animate-slide-up">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-3 text-[11px] uppercase tracking-widest font-semibold transition-colors border-b border-cream-300 last:border-0 ${
                    location.pathname === link.to
                      ? 'text-forest-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
