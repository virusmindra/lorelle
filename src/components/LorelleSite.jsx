import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight, AlertCircle, Plus, Minus, Trash2, ArrowRight, Camera, Upload, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { lorelleBrands, vtProducts, anuaProducts, medicubeProducts, maryMayProducts, finoProducts, centellaProducts, shippingInfo } from '../data/products'

/* ─── LORELLE HEADER ─────────────────────────────────────────── */
export function LorelleMasthead({ onCartOpen, onMenuOpen }) {
  const { language, toggleLanguage } = useLanguage()
  
  return (
    <header className="sticky top-0 z-40 bg-lorelle-100 border-b border-gray-300">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <button onClick={onMenuOpen} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-ink transition-colors">
          <Menu size={15} /> <span className="hidden sm:inline">{language === 'ua' ? 'Меню' : 'Menu'}</span>
        </button>
        <Link to="/" className="font-serif font-black tracking-[0.18em] text-4xl md:text-5xl text-ink leading-none select-none">
          LORELLE
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-ink transition-colors">
            {language === 'ua' ? 'UA' : 'EN'}
          </button>
          <button onClick={onCartOpen} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-ink transition-colors">
            <ShoppingBag size={15} /> <span className="hidden sm:inline">{language === 'ua' ? 'Кошик' : 'Cart'}</span>
          </button>
        </div>
      </div>
      {/* Sub labels row */}
      <div className="flex items-center justify-between px-6 py-1">
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Beauty</span>
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-semibold">Korea Edition</span>
      </div>
      {/* Brand nav */}
      <nav className="flex items-center justify-start md:justify-center gap-0 border-t border-gray-200 overflow-x-auto scrollbar-hide">
        {lorelleBrands.map((b) => (
          b.available ? (
            <Link key={b.slug} to={`/brand/${b.slug}`}
              className="flex-shrink-0 px-4 py-2.5 text-center border-r border-gray-200 hover:bg-lorelle-200 transition-colors group">
              {b.label.map((l, i) => (
                <div key={i} className={`leading-tight font-semibold text-ink ${i === 0 ? 'text-[13px]' : 'text-[9px] uppercase tracking-wide'}`}>{l}</div>
              ))}
            </Link>
          ) : (
            <div key={b.slug}
              className="flex-shrink-0 px-4 py-2.5 text-center border-r border-gray-200 opacity-40 cursor-not-allowed last:border-r-0">
              {b.label.map((l, i) => (
                <div key={i} className={`leading-tight font-semibold text-ink ${i === 0 ? 'text-[13px]' : 'text-[9px] uppercase tracking-wide'}`}>{l}</div>
              ))}
            </div>
          )
        ))}
      </nav>
    </header>
  )
}

/* ─── SIDE MENU ──────────────────────────────────────────────── */
export function SideMenu({ open, onClose }) {
  const { language, convertPrice, getCurrencySymbol } = useLanguage()
  const minOrder = convertPrice(14000)
  const freeShipping = convertPrice(20000)

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed left-0 top-0 h-full w-72 bg-lorelle-100 z-50 shadow-2xl transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <span className="font-serif font-black text-2xl tracking-widest text-ink">LORELLE</span>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>
        <nav className="flex-1 px-6 py-6 space-y-1">
          {[
            { to: '/', label: language === 'ua' ? 'Головна' : 'Home' },
            { to: '/skin-analysis', label: language === 'ua' ? 'Аналіз шкіри' : 'Skin analysis' },
            { to: '/brand/vt-cosmetics', label: 'VT Cosmetics' },
            { to: '/checkout', label: language === 'ua' ? 'Оформити замовлення' : 'Checkout' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} onClick={onClose}
              className="block py-3 border-b border-gray-100 text-sm font-medium text-gray-700 hover:text-ink transition-colors tracking-wide">
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-gray-200 text-[10px] text-gray-400 space-y-1">
          <p>{language === 'ua' ? 'Мінімальне замовлення:' : 'Minimum order:'} {minOrder.toLocaleString()}{getCurrencySymbol()}</p>
          <p>{language === 'ua' ? 'Безкоштовна доставка: від' : 'Free shipping: from'} {freeShipping.toLocaleString()}{getCurrencySymbol()}</p>
          <p>{language === 'ua' ? 'Доставка тільки по Україні' : 'Delivery only in Ukraine'}</p>
        </div>
      </div>
    </>
  )
}

/* ─── CART ───────────────────────────────────────────────────── */
export function LorellCart({ open, onClose }) {
  const { items, totalPrice, totalQty, removeItem, updateQty, clearCart } = useCart()
  const { language, convertPrice, getCurrencySymbol } = useLanguage()
  const [showMin, setShowMin] = useState(false)
  const navigate = useNavigate()
  const freeAt = convertPrice(shippingInfo.freeThreshold)
  const minOrder = convertPrice(14000)

  const handleCheckout = () => {
    if (totalPrice < minOrder) { setShowMin(true); return }
    onClose(); navigate('/checkout')
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-lorelle-100 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-vt-700" />
            <span className="font-serif font-bold text-xl text-ink">{language === 'ua' ? 'Кошик' : 'Cart'}</span>
            {totalQty > 0 && <span className="text-[10px] bg-vt-100 text-vt-700 font-bold px-2 py-0.5 uppercase tracking-wider">{totalQty} {language === 'ua' ? 'шт' : 'items'}</span>}
          </div>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>

        {totalQty > 0 && (
          <div className="px-6 py-2 bg-vt-50 border-b border-vt-100">
            {totalPrice < freeAt
              ? <p className="text-[11px] text-vt-700">{language === 'ua' ? 'До безкоштовної доставки:' : 'To free shipping:'} <strong>{(freeAt - totalPrice).toLocaleString()}{getCurrencySymbol()}</strong></p>
              : <p className="text-[11px] text-vt-700 font-semibold">{language === 'ua' ? '✓ Безкоштовна доставка активована' : '✓ Free shipping activated'}</p>
            }
            <div className="mt-1 h-0.5 bg-vt-100"><div className="h-full bg-vt-500 transition-all" style={{ width: `${Math.min((totalPrice / freeAt) * 100, 100)}%` }} /></div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-lorelle-300" />
              <p className="font-serif text-lg text-gray-600">{language === 'ua' ? 'Кошик порожній' : 'Cart is empty'}</p>
              <Link to="/brand/vt-cosmetics" onClick={onClose} className="btn-primary">{language === 'ua' ? 'Дивитись каталог' : 'View catalog'}</Link>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 bg-white p-3 border border-gray-100">
              <img src={item.image} alt={item.nameEn} className="w-16 h-16 object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5">{item.brand}</p>
                <p className="text-sm font-semibold text-ink leading-tight line-clamp-2">{item.nameEn}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.volume}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2 border border-gray-200">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-ink"><Minus size={11} /></button>
                    <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-ink"><Plus size={11} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{convertPrice(item.price * item.qty).toLocaleString()}{getCurrencySymbol()}</span>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-200 space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{language === 'ua' ? 'Товари' : 'Items'} ({totalQty})</span><span>{convertPrice(totalPrice).toLocaleString()}{getCurrencySymbol()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-ink border-t border-gray-100 pt-2">
              <span>{language === 'ua' ? 'Разом' : 'Total'}</span><span>{convertPrice(totalPrice).toLocaleString()}{getCurrencySymbol()}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full flex items-center justify-center gap-2">
              {language === 'ua' ? 'Оформити замовлення' : 'Checkout'} <ArrowRight size={14} />
            </button>
            <button onClick={clearCart} className="w-full text-[11px] text-gray-400 hover:text-red-400 transition-colors py-1">{language === 'ua' ? 'Очистити кошик' : 'Clear cart'}</button>
          </div>
        )}
      </div>

      {/* Min order modal */}
      {showMin && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setShowMin(false)} />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-lorelle-100 max-w-sm w-full shadow-2xl">
              <div className="bg-ink px-6 py-4 flex justify-between items-center">
                <span className="text-[9px] uppercase tracking-widest text-lorelle-400 font-semibold">LORELLE · {language === 'ua' ? 'Умови замовлення' : 'Order conditions'}</span>
                <button onClick={() => setShowMin(false)}><X size={14} className="text-lorelle-400" /></button>
              </div>
              <div className="px-8 py-8 text-center">
                <AlertCircle size={28} className="text-vt-700 mx-auto mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{language === 'ua' ? 'Мінімальне замовлення' : 'Minimum order'}</p>
                <p className="font-display text-5xl text-ink mb-2">{minOrder.toLocaleString()}{getCurrencySymbol()}</p>
                <div className="w-8 h-px bg-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-1">{language === 'ua' ? 'У кошику:' : 'In cart:'} <strong>{convertPrice(totalPrice).toLocaleString()}{getCurrencySymbol()}</strong></p>
                <p className="text-xs text-gray-400 mb-6">{language === 'ua' ? 'Додайте ще на' : 'Add'} <strong className="text-vt-700">{(minOrder - totalPrice).toLocaleString()}{getCurrencySymbol()}</strong></p>
                <Link to="/brand/vt-cosmetics" onClick={() => { setShowMin(false); onClose() }}
                  className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                  <ShoppingBag size={13} /> {language === 'ua' ? 'Додати товари' : 'Add items'}
                </Link>
                <button onClick={() => setShowMin(false)} className="text-[11px] text-gray-400 hover:text-gray-600 py-1">{language === 'ua' ? 'Повернутися в кошик' : 'Return to cart'}</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

/* ─── HOME PAGE ──────────────────────────────────────────────── */
export function HomePage() {
  const { language } = useLanguage()
  
  const content = {
    ua: {
      section1: {
        title: 'Чому<br />у кореянок<br />така<br />красива<br />шкіра?',
        subtitle: 'Багато хто вважає, що секрет корейської шкіри прихований в одному дорогому кремі.<br />Але справжня причина зовсім інша.',
        points: [
          'Красива шкіра — це результат систематичного догляду, де кожний засіб виконує свою задачу і посилює дію наступного.',
          'У Кореї догляд за шкірою — це щоденна звичка, така ж природна, як чищення зубів або заняття спортом.',
        ],
        stepsTitle: 'Корейський догляд складається з кількох етапів',
        steps: [
          { n: '1', title: 'ОЧИЩЕННЯ', desc: 'Видаляє забруднення, надлишки себуму та залишки макіяжу' },
          { n: '2', title: 'ПІДГОТОВКА ШКІРИ', desc: 'Тонер відновлює баланс шкіри і підвищує ефективність наступних засобів' },
          { n: '3', title: 'АКТИВНА СИРОВАТКА', desc: 'Доставляє активні компоненти глибоко в шкіру і вирішує конкретні задачі' },
          { n: '4', title: 'ЗВОЛОЖУЮЧИЙ КРЕМ', desc: 'Утримує вологу, живить і зміцнює захисний бар\'єр шкіри' },
          { n: '5', title: 'ЗАХИСТ ВІД СОНЦЯ', desc: 'SPF-захист запобігає фотостарінню і допомагає зберегти молодість' },
        ],
        result1: 'Кожен етап працює на загальний результат: здорову, зволожену і сяючу шкіру. Коли засоби підібрані правильно і використовуються регулярно, шкіра починає виглядати помітно краще вже через кілька тижнів.',
        result2: 'Краса шкіри починається не з одного крему. Вона починається з правильної системи догляду.',
        resultsTitle: 'Результат комплексного догляду',
        results: [
          { icon: '💧', label: 'Глибоке зволоження' },
          { icon: '✨', label: 'Природне сяйво' },
          { icon: '🛡', label: 'Сильний захисний бар\'єр' },
          { icon: '🌊', label: 'Рівна текстура і тон' },
          { icon: '⏳', label: 'Профілактика вікових змін' },
        ],
      },
      section2: {
        title: 'Ви оплачуєте косметику,<br />а не чужі комісії.',
        text: [
          'Сьогодні вартість товару часто визначається не тільки його якістю.',
          'При покупці на великих маркетплейсах в ціну включені комісії майданчика, витрати на рекламу, логістику, зберігання, обробку повернень та інші операційні витрати продавця. Всі ці витрати в кінцевому підсумку відображаються на вартості для покупця.',
          'Ми обрали інший шлях.',
          'Замість довгої ланцюжки посередників ми закуповуємо оригінальну косметику безпосередньо у перевірених постачальників у Кореї та В\'єтнамі і продаємо її через власний магазин.',
          'Тому ви оплачуєте перш за все оригінальний продукт, а не численні комісії та додаткові націнки.',
          'Менше посередників.<br />Більше цінності.',
        ],
      },
    },
    en: {
      section1: {
        title: 'Why<br />Korean<br />women<br />have such<br />beautiful<br />skin?',
        subtitle: 'Many think the secret of Korean skin is hidden in one expensive cream.<br />But the real reason is quite different.',
        points: [
          'Beautiful skin is the result of systematic care, where each product performs its task and enhances the action of the next.',
          'In Korea, skin care is a daily habit, as natural as brushing teeth or exercising.',
        ],
        stepsTitle: 'Korean care consists of several stages',
        steps: [
          { n: '1', title: 'CLEANSING', desc: 'Removes dirt, excess sebum and makeup residue' },
          { n: '2', title: 'SKIN PREPARATION', desc: 'Toner restores skin balance and increases the effectiveness of subsequent products' },
          { n: '3', title: 'ACTIVE SERUM', desc: 'Delivers active ingredients deep into the skin and solves specific problems' },
          { n: '4', title: 'MOISTURIZING CREAM', desc: 'Retains moisture, nourishes and strengthens the skin\'s protective barrier' },
          { n: '5', title: 'SUN PROTECTION', desc: 'SPF protection prevents photoaging and helps maintain youth' },
        ],
        result1: 'Each stage works towards the overall result: healthy, hydrated and glowing skin. When products are chosen correctly and used regularly, skin starts to look noticeably better within just a few weeks.',
        result2: 'Skin beauty doesn\'t start with one cream. It starts with the right care system.',
        resultsTitle: 'Result of comprehensive care',
        results: [
          { icon: '💧', label: 'Deep hydration' },
          { icon: '✨', label: 'Natural glow' },
          { icon: '🛡', label: 'Strong protective barrier' },
          { icon: '🌊', label: 'Even texture and tone' },
          { icon: '⏳', label: 'Prevention of age-related changes' },
        ],
      },
      section2: {
        title: 'You pay for cosmetics,<br />not other people\'s commissions.',
        text: [
          'Today, the cost of a product is often determined not only by its quality.',
          'When buying on large marketplaces, the price includes platform commissions, advertising costs, logistics, storage, return processing and other operational costs of the seller. All these costs are ultimately reflected in the price for the buyer.',
          'We chose a different path.',
          'Instead of a long chain of intermediaries, we purchase original cosmetics directly from verified suppliers in Korea and Vietnam and sell it through our own store.',
          'Therefore, you pay primarily for the original product, not for numerous commissions and additional markups.',
          'Fewer intermediaries.<br />More value.',
        ],
      },
    },
  }

  const t = content[language]

  return (
    <main className="bg-lorelle-100">

      {/* SECTION 1 */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="font-serif text-6xl md:text-7xl text-ink leading-none uppercase mb-4">
              {t.section1.title}
            </h1>
            <p className="mag-body mb-5">{t.section1.subtitle}</p>
            <div className="space-y-4">
              {t.section1.points.map((point, i) => (
                <div key={i} className="flex gap-3 bg-lorelle-200 p-4">
                  <span className="text-lg flex-shrink-0">🌿</span>
                  <p className="mag-body">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>
            <img src="/images/korean-skin.png" alt="Korean skin beauty" className="w-full h-full object-cover" style={{ objectPosition: 'center 15%' }} />
          </div>
        </div>

        <div className="border border-gray-200 bg-white p-8 mt-8 mb-8">
          <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-6">{t.section1.stepsTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {t.section1.steps.map(s => (
              <div key={s.n} className="text-center">
                <div className="w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-display text-xl text-gray-500">{s.n}</span>
                </div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-1.5 leading-tight">{s.title}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
          <p className="mag-body">{t.section1.result1}</p>
          <p className="font-editorial italic text-lg text-gray-600 leading-relaxed">{t.section1.result2}</p>
        </div>

        <div className="mt-8">
          <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-5">{t.section1.resultsTitle}</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {t.section1.results.map(({ icon, label }) => (
              <div key={label} className="text-center p-4 border border-gray-200">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-[10px] text-gray-600 leading-tight font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight mb-5">
              {t.section2.title}
            </h2>
            <div className="space-y-3 mag-body">
              {t.section2.text.map((text, i) => (
                <p key={i} className={i === 2 ? 'font-semibold text-ink' : i === 5 ? 'font-editorial italic text-base text-gray-500 pt-1' : ''}>{text}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="overflow-hidden" style={{ height: '270px' }}>
              <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&h=540&fit=crop&q=90" alt="Korean cosmetics store" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ height: '230px' }}>
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=460&fit=crop&q=90" alt="Production quality control" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-8 border border-gray-200 bg-white p-6">
          <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-5">{language === 'ua' ? 'Ціна на маркетплейсі' : 'Marketplace price'}</p>
          <div className="flex flex-wrap items-start gap-2">
            {[
              { icon: '🏭', label: language === 'ua' ? 'Виробник' : 'Manufacturer' },
              { icon: '📦', label: language === 'ua' ? 'Імпортер' : 'Importer' },
              { icon: '🚛', label: language === 'ua' ? 'Дистриб\'ютор' : 'Distributor' },
              { icon: '🛒', label: language === 'ua' ? 'Маркетплейс' : 'Marketplace' },
              { icon: '📣', label: language === 'ua' ? 'Реклама' : 'Advertising' },
              { icon: '🏢', label: language === 'ua' ? 'Логістика і зберігання' : 'Logistics & storage' },
              { icon: '👤', label: language === 'ua' ? 'Покупець' : 'Buyer' },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <div className="text-center">
                  <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-1 text-base">{step.icon}</div>
                  <p className="text-[9px] text-gray-500 leading-tight max-w-[58px]">{step.label}</p>
                </div>
                {i < arr.length - 1 && <span className="text-gray-300 text-sm mt-3">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 bg-white p-6">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-5">Lorelle</p>
            <div className="flex items-start gap-3">
              {[{ icon: '🏭', label: language === 'ua' ? 'Виробник' : 'Manufacturer' }, { icon: 'L', label: 'Lorelle' }, { icon: '👤', label: language === 'ua' ? 'Покупець' : 'Buyer' }].map((step, i, arr) => (
                <React.Fragment key={step.label}>
                  <div className="text-center">
                    <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold text-ink">{step.icon}</div>
                    <p className="text-[9px] text-gray-500">{step.label}</p>
                  </div>
                  {i < arr.length - 1 && <span className="text-gray-300 text-sm mt-3">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center p-2">
            <p className="font-serif text-2xl text-ink mb-3 leading-tight">{language === 'ua' ? 'Пряма ланцюжок —<br />чесна ціна.' : 'Direct chain —<br />honest price.'}</p>
            <p className="mag-body">{language === 'ua' ? 'Ми працюємо напряму з перевіреними постачальниками з Кореї та В\'єтнаму, тому вартість наших товарів максимально відображає ціну самого продукту, а не витрати численних посередників.' : 'We work directly with verified suppliers from Korea and Vietnam, so the cost of our products maximally reflects the price of the product itself, not the expenses of numerous intermediaries.'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
          {[
            { icon: '⭐', text: language === 'ua' ? 'Тільки оригінальна продукція' : 'Only original products' },
            { icon: '🌏', text: language === 'ua' ? 'Прямі поставки з Кореї та В\'єтнаму' : 'Direct supplies from Korea and Vietnam' },
            { icon: '✓', text: language === 'ua' ? 'Перевірені бренди та свіжі поставки' : 'Verified brands and fresh supplies' },
            { icon: '💬', text: language === 'ua' ? 'Безкоштовний підбір догляду та підтримка після покупки' : 'Free care selection and support after purchase' },
            { icon: '🏷', text: language === 'ua' ? 'Чесна ціна без переплат за чужі комісії' : 'Honest price without overpayments for others\' commissions' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex gap-2 p-3 border border-gray-200 bg-white items-start">
              <span className="text-base flex-shrink-0">{icon}</span>
              <p className="text-[10px] text-gray-600 leading-tight">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Free skin analysis */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <h2 className="font-serif text-6xl md:text-7xl text-ink leading-none uppercase mb-4">
              {language === 'ua' ? 'Безкоштовний<br />аналіз<br />шкіри' : 'Free<br />skin<br />analysis'}
            </h2>
            <p className="mag-body max-w-md">{language === 'ua' ? 'Завантажте фотографію обличчя анфас і отримайте детальний аналіз стану шкіри з рекомендаціями по догляду' : 'Upload a frontal face photo and get a detailed analysis of your skin condition with care recommendations'}</p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <div className="bg-lorelle-200 p-4 flex items-center gap-3">
              <span className="text-xl">🌿</span>
              <p className="font-editorial italic text-sm text-gray-600">{language === 'ua' ? 'Ваша шкіра унікальна.<br />Догляд має бути персональним.' : 'Your skin is unique.<br />Care should be personal.'}</p>
            </div>
            <Link to="/skin-analysis" className="btn-secondary flex items-center gap-2 w-fit">
              <Camera size={14} /> {language === 'ua' ? 'Пройти аналіз шкіри' : 'Take skin analysis'}
            </Link>
          </div>
        </div>

        {/* Desktop: photo in center, 7 cards surrounding */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          <div className="md:col-start-1 md:row-start-1 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">🔍</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'ВИЗНАЧЕННЯ ТИПУ ШКІРИ' : 'SKIN TYPE DETERMINATION'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Дізнайтеся свій тип шкіри та її особливості' : 'Learn your skin type and its features'}</p>
          </div>
          <div className="md:col-start-2 md:row-start-1 md:row-span-2 rounded-2xl overflow-hidden">
            <img src="/images/korean-analysis.png" alt="Skin Analysis" className="w-full h-full object-cover object-center" />
          </div>
          <div className="md:col-start-3 md:row-start-1 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">💧</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'ОЦІНКА РІВНЯ ЗВОЛОЖЕННЯ' : 'HYDRATION LEVEL ASSESSMENT'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Перевірка рівня зволоженості шкіри' : 'Checking skin hydration level'}</p>
          </div>
          <div className="md:col-start-1 md:row-start-2 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">🔬</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'АНАЛІЗ ПОР І ТЕКСТУРИ' : 'PORE AND TEXTURE ANALYSIS'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Виявимо особливості пор, рельєфу і текстури шкіри' : 'Identify pore features, relief and skin texture'}</p>
          </div>
          <div className="md:col-start-3 md:row-start-2 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">🌡</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'ВИЯВЛЕННЯ ЧУТЛИВОСТІ' : 'SENSITIVITY DETECTION'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Визначимо схильність до почервонінь і подразнень' : 'Determine tendency to redness and irritation'}</p>
          </div>
          <div className="md:col-start-1 md:row-start-3 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">🌅</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО РАНКОВОМУ ДОГЛЯДУ' : 'MORNING CARE RECOMMENDATIONS'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Покрокова схема догляду для захисту і сяйва шкіри' : 'Step-by-step care routine for protection and skin glow'}</p>
          </div>
          <div className="md:col-start-2 md:row-start-3 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">🌙</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО ВЕЧІРНЬОМУ ДОГЛЯДУ' : 'EVENING CARE RECOMMENDATIONS'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Покрокова схема догляду для відновлення шкіри' : 'Step-by-step care routine for skin recovery'}</p>
          </div>
          <div className="md:col-start-3 md:row-start-3 text-center p-5 border border-gray-200 bg-white flex flex-col items-center justify-center" style={{ minHeight: '170px' }}>
            <div className="text-3xl mb-3">✨</div>
            <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{language === 'ua' ? 'ПІДБІР КОРЕЙСЬКОЇ КОСМЕТИКИ' : 'KOREAN COSMETICS SELECTION'}</p>
            <p className="text-[10px] text-gray-500 leading-snug">{language === 'ua' ? 'Індивідуальні рекомендації з підбором засобів саме для вашої шкіри' : 'Individual recommendations with product selection specifically for your skin'}</p>
          </div>
        </div>

        {/* Mobile: photo + cards grid */}
        <div className="md:hidden">
          <div className="rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: '3/4' }}>
            <img src="/images/korean-analysis.png" alt="Skin Analysis" className="w-full h-full object-cover object-center" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🔍', title: language === 'ua' ? 'ВИЗНАЧЕННЯ ТИПУ ШКІРИ' : 'SKIN TYPE DETERMINATION', desc: language === 'ua' ? 'Дізнайтеся свій тип шкіри та її особливості' : 'Learn your skin type and its features' },
              { icon: '💧', title: language === 'ua' ? 'ОЦІНКА РІВНЯ ЗВОЛОЖЕННЯ' : 'HYDRATION LEVEL ASSESSMENT', desc: language === 'ua' ? 'Перевірка рівня зволоженості шкіри' : 'Checking skin hydration level' },
              { icon: '🔬', title: language === 'ua' ? 'АНАЛІЗ ПОР І ТЕКСТУРИ' : 'PORE AND TEXTURE ANALYSIS', desc: language === 'ua' ? 'Виявимо особливості пор, рельєфу і текстури шкіри' : 'Identify pore features, relief and skin texture' },
              { icon: '🌡', title: language === 'ua' ? 'ВИЯВЛЕННЯ ЧУТЛИВОСТІ' : 'SENSITIVITY DETECTION', desc: language === 'ua' ? 'Визначимо схильність до почервонінь і подразнень' : 'Determine tendency to redness and irritation' },
              { icon: '🌅', title: language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО РАНКОВОМУ ДОГЛЯДУ' : 'MORNING CARE RECOMMENDATIONS', desc: language === 'ua' ? 'Покрокова схема догляду для захисту і сяйва шкіри' : 'Step-by-step care routine for protection and skin glow' },
              { icon: '🌙', title: language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО ВЕЧІРНЬОМУ ДОГЛЯДУ' : 'EVENING CARE RECOMMENDATIONS', desc: language === 'ua' ? 'Покрокова схема догляду для відновлення шкіри' : 'Step-by-step care routine for skin recovery' },
              { icon: '✨', title: language === 'ua' ? 'ПІДБІР КОРЕЙСЬКОЇ КОСМЕТИКИ' : 'KOREAN COSMETICS SELECTION', desc: language === 'ua' ? 'Індивідуальні рекомендації з підбором засобів саме для вашої шкіри' : 'Individual recommendations with product selection specifically for your skin' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-4 border border-gray-200 bg-white">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-1 leading-tight">{title}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-8 border border-gray-200">
          <div className="bg-lorelle-200 p-8 flex flex-col justify-between" style={{ minHeight: '260px' }}>
            <div>
              <h3 className="font-serif text-3xl text-ink mb-3">{language === 'ua' ? 'Готові рішення<br />для вашої шкіри' : 'Ready solutions<br />for your skin'}</h3>
              <p className="mag-body mb-6">{language === 'ua' ? 'Ми вже зібрали ефективні комплекси корейської косметики для різних типів шкіри і задач. Вам залишається тільки вибрати свій ідеальний догляд.' : 'We have already assembled effective complexes of Korean cosmetics for different skin types and tasks. You just have to choose your ideal care.'}</p>
              <Link to="/brand/vt-cosmetics" className="btn-primary inline-flex items-center gap-2">
                {language === 'ua' ? 'Підібрати свій догляд' : 'Choose your care'} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden" style={{ minHeight: '260px' }}>
            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=520&fit=crop&q=90" alt="Skincare products" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

    </main>
  )
}

/* ─── SKIN ANALYSIS ──────────────────────────────────────────── */
export function SkinAnalysisPage() {
  const { language } = useLanguage()
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setPhoto(f); setPreview(URL.createObjectURL(f))
  }
  const handleInput = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }
  const validate = () => {
    const e = {}
    if (!photo) e.photo = language === 'ua' ? 'Завантажте фотографію' : 'Upload a photo'
    if (!form.firstName.trim()) e.firstName = language === 'ua' ? 'Введіть ім\'я' : 'Enter first name'
    if (!form.lastName.trim()) e.lastName = language === 'ua' ? 'Введіть прізвище' : 'Enter last name'
    if (!form.email.includes('@')) e.email = language === 'ua' ? 'Введіть коректний email' : 'Enter valid email'
    if (!form.phone.trim()) e.phone = language === 'ua' ? 'Введіть номер телефону' : 'Enter phone number'
    return e
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) return (
    <main className="max-w-2xl mx-auto px-6 py-20 text-center bg-lorelle-100 min-h-screen">
      <CheckCircle size={44} className="text-vt-600 mx-auto mb-6" />
      <p className="mag-label mb-3">{language === 'ua' ? 'Аналіз відправлено' : 'Analysis sent'}</p>
      <h1 className="font-serif text-6xl text-ink mb-4">{language === 'ua' ? 'Заявка прийнята' : 'Application received'}</h1>
      <div className="w-8 h-px bg-gray-300 mx-auto mb-5" />
      <p className="mag-body mb-2">{language === 'ua' ? 'Дякуємо,' : 'Thank you,'} <strong>{form.firstName}</strong>! {language === 'ua' ? 'Наші спеціалісти вивчать фотографію і складуть персональні рекомендації.' : 'Our specialists will study the photo and prepare personal recommendations.'}</p>
      <p className="text-sm text-gray-500 mb-1">⏱ {language === 'ua' ? 'Очікування:' : 'Waiting time:'} <strong>{language === 'ua' ? 'до 24 годин' : 'up to 24 hours'}</strong></p>
      <p className="text-sm text-gray-500 mb-8">{language === 'ua' ? 'Результати прийдуть на:' : 'Results will be sent to:'} <strong className="text-vt-700">{form.email}</strong></p>
      <Link to="/brand/vt-cosmetics" className="btn-primary inline-flex items-center gap-2"><ShoppingBag size={13} /> {language === 'ua' ? 'Дивитись каталог' : 'View catalog'}</Link>
    </main>
  )

  return (
    <main className="bg-lorelle-100">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h1 className="font-serif text-6xl md:text-7xl text-ink leading-none uppercase mb-4">
              {language === 'ua' ? 'Безкоштовний<br />аналіз<br />шкіри' : 'Free<br />skin<br />analysis'}
            </h1>
            <p className="mag-body mb-5">{language === 'ua' ? 'Завантажте фотографію обличчя анфас і отримайте детальний аналіз стану шкіри з рекомендаціями по догляду' : 'Upload a frontal face photo and get a detailed analysis of your skin condition with care recommendations'}</p>
            <div className="bg-lorelle-200 p-4 mb-5 flex items-center gap-3">
              <span className="text-xl">🌿</span>
              <p className="font-editorial italic text-base text-gray-600">{language === 'ua' ? 'Ваша шкіра унікальна.<br />Догляд має бути персональним.' : 'Your skin is unique.<br />Care should be personal.'}</p>
            </div>
            <button onClick={() => document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary flex items-center gap-2">
              <Camera size={14} /> {language === 'ua' ? 'Пройти аналіз шкіри' : 'Take skin analysis'}
            </button>
          </div>
          <div className="md:col-span-3 flex items-start justify-center">
            <div className="rounded-3xl overflow-hidden w-4/5" style={{ aspectRatio: '3/4' }}>
              <img src="/images/korean-analysis.png" alt="Skin Analysis" className="w-full h-full object-cover object-center" />
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-8">{language === 'ua' ? 'Що ви отримаєте' : 'What you will get'}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: language === 'ua' ? 'ВИЗНАЧЕННЯ ТИПУ ШКІРИ' : 'SKIN TYPE DETERMINATION', desc: language === 'ua' ? 'Дізнайтеся свій тип шкіри та її особливості' : 'Learn your skin type and its features' },
            { icon: '💧', title: language === 'ua' ? 'ОЦІНКА РІВНЯ ЗВОЛОЖЕННЯ' : 'HYDRATION LEVEL ASSESSMENT', desc: language === 'ua' ? 'Перевірка рівня зволоженості шкіри' : 'Checking skin hydration level' },
            { icon: '🔬', title: language === 'ua' ? 'АНАЛІЗ ПОР І ТЕКСТУРИ' : 'PORE AND TEXTURE ANALYSIS', desc: language === 'ua' ? 'Виявимо особливості пор, рельєфу і текстури шкіри' : 'Identify pore features, relief and skin texture' },
            { icon: '🌡', title: language === 'ua' ? 'ВИЯВЛЕННЯ ЧУТЛИВОСТІ' : 'SENSITIVITY DETECTION', desc: language === 'ua' ? 'Визначимо схильність до почервонінь і подразнень' : 'Determine tendency to redness and irritation' },
            { icon: '🌅', title: language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО РАНКОВОМУ ДОГЛЯДУ' : 'MORNING CARE RECOMMENDATIONS', desc: language === 'ua' ? 'Покрокова схема догляду для захисту і сяйва шкіри' : 'Step-by-step care routine for protection and skin glow' },
            { icon: '🌙', title: language === 'ua' ? 'РЕКОМЕНДАЦІЇ ПО ВЕЧІРНЬОМУ ДОГЛЯДУ' : 'EVENING CARE RECOMMENDATIONS', desc: language === 'ua' ? 'Покрокова схема догляду для відновлення шкіри' : 'Step-by-step care routine for skin recovery' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center p-4 border border-gray-200 bg-white">
              <div className="text-3xl mb-3">{icon}</div>
              <p className="text-[9px] uppercase tracking-widest font-bold text-ink mb-2 leading-tight">{title}</p>
              <p className="text-[10px] text-gray-500 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section id="analysis-form" className="max-w-2xl mx-auto px-6 py-12">
        <p className="text-center mag-label mb-3">{language === 'ua' ? 'Заповніть форму' : 'Fill out the form'}</p>
        <h2 className="font-serif text-5xl text-ink text-center mb-2">{language === 'ua' ? 'Аналіз шкіри' : 'Skin analysis'}</h2>
        <div className="w-8 h-px bg-gray-300 mx-auto mb-8" />
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo */}
          <div>
            <p className="mag-label mb-2">{language === 'ua' ? 'Фотографія обличчя' : 'Face photo'}</p>
            <div onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${errors.photo ? 'border-red-300 bg-red-50' : preview ? 'border-vt-400 bg-vt-50' : 'border-lorelle-300 hover:border-vt-400'}`}>
              {preview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={preview} alt="Preview" className="w-24 h-24 object-cover" />
                  <p className="text-xs text-vt-700 font-medium">{language === 'ua' ? '✓ Фото завантажено' : '✓ Photo uploaded'}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gray-400" />
                  <p className="text-sm text-gray-600">{language === 'ua' ? 'Завантажити фотографію обличчя анфас' : 'Upload frontal face photo'}</p>
                  <p className="text-xs text-gray-400">JPG, PNG · {language === 'ua' ? 'до 10 МБ' : 'up to 10 MB'}</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[{ name: 'firstName', label: language === 'ua' ? 'Ім\'я' : 'First name', ph: language === 'ua' ? 'Анна' : 'Anna' }, { name: 'lastName', label: language === 'ua' ? 'Прізвище' : 'Last name', ph: language === 'ua' ? 'Іванова' : 'Ivanova' }].map(({ name, label, ph }) => (
              <div key={name}>
                <label className="mag-label mb-2 block">{label}</label>
                <input name={name} value={form[name]} onChange={handleInput} placeholder={ph}
                  className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-vt-500 transition-colors ${errors[name] ? 'border-red-300' : 'border-gray-200'}`} />
                {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
              </div>
            ))}
          </div>

          {[{ name: 'email', label: language === 'ua' ? 'Email — сюди прийдуть результати' : 'Email — results will be sent here', ph: 'anna@example.com', type: 'email' }, { name: 'phone', label: language === 'ua' ? 'Номер телефону' : 'Phone number', ph: language === 'ua' ? '+380 (999) 000-00-00' : '+7 (999) 000-00-00', type: 'tel' }].map(({ name, label, ph, type }) => (
            <div key={name}>
              <label className="mag-label mb-2 block">{label}</label>
              <input name={name} type={type} value={form[name]} onChange={handleInput} placeholder={ph}
                className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-vt-500 transition-colors ${errors[name] ? 'border-red-300' : 'border-gray-200'}`} />
              {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
            </div>
          ))}

          <p className="text-xs text-gray-400">{language === 'ua' ? 'Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.' : 'By clicking the button, you agree to the processing of personal data.'}</p>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            <Camera size={14} /> {language === 'ua' ? 'Надіслати на аналіз' : 'Send for analysis'}
          </button>
        </form>
      </section>
    </main>
  )
}

/* ─── VT BRAND PAGE ──────────────────────────────────────────── */
export function BrandPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const { language, convertPrice, getCurrencySymbol } = useLanguage()
  const [pageIdx, setPageIdx] = useState(0)
  const [added, setAdded] = useState(null)
  const brandProductMap = { 'vt-cosmetics': vtProducts, 'anua': anuaProducts, 'medicube': medicubeProducts, 'mary-may': maryMayProducts, 'fino': finoProducts, 'skin1004': centellaProducts }
  const allProducts = brandProductMap[slug]
  const total = allProducts?.length ?? 0

  useEffect(() => {
    setPageIdx(0)
  }, [slug])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') setPageIdx(i => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft')  setPageIdx(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total])

  if (!allProducts) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center bg-lorelle-100 min-h-screen">
        <p className="font-display text-6xl text-ink mb-4">{lorelleBrands.find(b => b.slug === slug)?.name || (language === 'ua' ? 'Бренд' : 'Brand')}</p>
        <p className="mag-body">{language === 'ua' ? 'Продукція цього бренду скоро з\'явиться' : 'Products from this brand coming soon'}</p>
        <Link to="/" className="btn-primary inline-block mt-6">{language === 'ua' ? 'На головну' : 'Back to home'}</Link>
      </div>
    )
  }

  const safeIdx = Math.min(pageIdx, total - 1)
  const product = allProducts[safeIdx]

  const handleAdd = () => {
    addItem(product)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <main className="relative bg-lorelle-100 overflow-hidden" style={{ minHeight: 'calc(100vh - 130px)' }}>

      {/* ← Left arrow */}
      <button
        onClick={() => setPageIdx(i => Math.max(i - 1, 0))}
        disabled={pageIdx === 0}
        aria-label={language === 'ua' ? 'Попередній продукт' : 'Previous product'}
        className="fixed left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-20 bg-white border border-gray-200 shadow hover:shadow-md hover:bg-lorelle-200 transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} className="text-ink" />
      </button>

      {/* → Right arrow */}
      <button
        onClick={() => setPageIdx(i => Math.min(i + 1, total - 1))}
        disabled={pageIdx === total - 1}
        aria-label={language === 'ua' ? 'Наступний продукт' : 'Next product'}
        className="fixed right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-20 bg-white border border-gray-200 shadow hover:shadow-md hover:bg-lorelle-200 transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} className="text-ink" />
      </button>

      {/* Page dots */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {allProducts.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setPageIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === safeIdx ? 'bg-ink w-6' : 'bg-gray-300 w-1.5 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Product page — key change triggers fade-in re-mount */}
      <div key={product.id} className="max-w-7xl mx-auto px-10 md:px-16 py-6 animate-fade-in">
        <p className="mag-label mb-3">{product.brand} · {product.line}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ minHeight: 'calc(100vh - 210px)' }}>

          {/* LEFT: Info */}
          <div className="flex flex-col order-2 md:order-1">
            <h2 className="font-display text-5xl md:text-6xl text-vt-700 leading-none mb-2 uppercase">
              {product.nameEn}
            </h2>
            <p className="font-serif text-base text-ink leading-snug mb-4 uppercase tracking-wide">
              {language === 'ua' ? product.nameUa : product.nameRu}
            </p>
            <p className="text-sm text-gray-500 mb-3 italic">{language === 'ua' ? product.subtitleUa : (language === 'en' ? product.subtitleEn : product.subtitleRu)}</p>
            <p className="mag-body mb-5">{language === 'ua' ? product.descriptionUa : (language === 'en' ? product.descriptionEn : product.descriptionRu)}</p>

            <div className="space-y-3 mb-5">
              {(language === 'ua' ? product.benefitsUa : (language === 'en' ? product.benefitsEn : product.benefitsRu))?.map((b, i) => (
                <div key={i} className="border-l-2 border-vt-200 pl-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ink mb-0.5">{b.title}</p>
                  <p className="text-xs text-gray-500 leading-snug">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 bg-white p-5 mt-auto">
              <div className="grid grid-cols-3 gap-4 mb-4 text-[10px]">
                <div>
                  <p className="mag-label mb-1">{language === 'ua' ? 'Об\'єм' : 'Volume'}</p>
                  <p className="font-semibold text-ink">{product.volume}</p>
                </div>
                <div>
                  <p className="mag-label mb-1">{language === 'ua' ? 'Активні компоненти' : 'Active ingredients'}</p>
                  <div className="space-y-0.5">
                    {(language === 'ua' ? product.ingredientsUa : (language === 'en' ? product.ingredientsEn : product.ingredientsRu))?.slice(0, 3).map((ing, i) => (
                      <p key={i} className="text-gray-600">· {ing}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mag-label mb-1">{language === 'ua' ? 'Для якої шкіри' : 'For skin type'}</p>
                  <div className="space-y-0.5">
                    {(language === 'ua' ? product.skinTypesUa : (language === 'en' ? product.skinTypesEn : product.skinTypesRu))?.slice(0, 4).map((st, i) => (
                      <p key={i} className="text-gray-600">✓ {st}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-display text-3xl text-ink">{convertPrice(product.price).toLocaleString()}{getCurrencySymbol()}</span>
                <button
                  onClick={handleAdd}
                  className={`transition-all px-6 py-2.5 text-xs uppercase tracking-widest font-semibold ${
                    added === product.id ? 'bg-vt-600 text-white' : 'bg-ink text-white hover:bg-vt-700'
                  }`}
                >
                  {added === product.id ? (language === 'ua' ? '✓ Додано' : '✓ Added') : (language === 'ua' ? '+ В кошик' : '+ Add to cart')}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative overflow-hidden order-1 md:order-2 min-h-[320px] md:min-h-[480px] bg-lorelle-200">
            <img
              src={product.image}
              alt={product.nameEn}
              className="absolute inset-0 w-full h-full object-contain"
            />
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1">
              <span className="text-[9px] uppercase tracking-widest font-semibold text-vt-700">
                {String(safeIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
