import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight, AlertCircle, Plus, Minus, Trash2, ArrowRight, Camera, Upload, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { lorelleBrands, vtProducts, shippingInfo } from '../data/products'

/* ─── LORELLE HEADER ─────────────────────────────────────────── */
export function LorelleMasthead({ onCartOpen, onMenuOpen }) {
  return (
    <header className="sticky top-0 z-40 bg-lorelle-100 border-b border-gray-300">
      {/* Top row */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <button onClick={onMenuOpen} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-ink transition-colors">
          <Menu size={15} /> <span className="hidden sm:inline">Меню</span>
        </button>
        <Link to="/" className="font-serif font-black tracking-[0.18em] text-4xl md:text-5xl text-ink leading-none select-none">
          LORELLE
        </Link>
        <button onClick={onCartOpen} className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gray-500 hover:text-ink transition-colors">
          <ShoppingBag size={15} /> <span className="hidden sm:inline">Корзина</span>
        </button>
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
            { to: '/', label: 'Главная' },
            { to: '/skin-analysis', label: 'Анализ кожи' },
            { to: '/brand/vt-cosmetics', label: 'VT Cosmetics' },
            { to: '/checkout', label: 'Оформить заказ' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} onClick={onClose}
              className="block py-3 border-b border-gray-100 text-sm font-medium text-gray-700 hover:text-ink transition-colors tracking-wide">
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-gray-200 text-[10px] text-gray-400 space-y-1">
          <p>Минимальный заказ: 14 000 ₽</p>
          <p>Бесплатная доставка: от 20 000 ₽</p>
          <p>Доставка только по России</p>
        </div>
      </div>
    </>
  )
}

/* ─── CART ───────────────────────────────────────────────────── */
const MIN_ORDER = 14000
export function LorellCart({ open, onClose }) {
  const { items, totalPrice, totalQty, removeItem, updateQty, clearCart } = useCart()
  const [showMin, setShowMin] = useState(false)
  const navigate = useNavigate()
  const freeAt = shippingInfo.freeThreshold

  const handleCheckout = () => {
    if (totalPrice < MIN_ORDER) { setShowMin(true); return }
    onClose(); navigate('/checkout')
  }

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-lorelle-100 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <ShoppingBag size={18} className="text-vt-700" />
            <span className="font-serif font-bold text-xl text-ink">Корзина</span>
            {totalQty > 0 && <span className="text-[10px] bg-vt-100 text-vt-700 font-bold px-2 py-0.5 uppercase tracking-wider">{totalQty} шт</span>}
          </div>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>

        {totalQty > 0 && (
          <div className="px-6 py-2 bg-vt-50 border-b border-vt-100">
            {totalPrice < freeAt
              ? <p className="text-[11px] text-vt-700">До бесплатной доставки: <strong>{(freeAt - totalPrice).toLocaleString('ru-RU')} ₽</strong></p>
              : <p className="text-[11px] text-vt-700 font-semibold">✓ Бесплатная доставка активирована</p>
            }
            <div className="mt-1 h-0.5 bg-vt-100"><div className="h-full bg-vt-500 transition-all" style={{ width: `${Math.min((totalPrice / freeAt) * 100, 100)}%` }} /></div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={40} className="text-lorelle-300" />
              <p className="font-serif text-lg text-gray-600">Корзина пуста</p>
              <Link to="/brand/vt-cosmetics" onClick={onClose} className="btn-primary">Смотреть каталог</Link>
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
                    <span className="font-bold text-sm">{(item.price * item.qty).toLocaleString('ru-RU')} ₽</span>
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
              <span>Товары ({totalQty})</span><span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-ink border-t border-gray-100 pt-2">
              <span>Итого</span><span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full flex items-center justify-center gap-2">
              Оформить заказ <ArrowRight size={14} />
            </button>
            <button onClick={clearCart} className="w-full text-[11px] text-gray-400 hover:text-red-400 transition-colors py-1">Очистить корзину</button>
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
                <span className="text-[9px] uppercase tracking-widest text-lorelle-400 font-semibold">LORELLE · Условия заказа</span>
                <button onClick={() => setShowMin(false)}><X size={14} className="text-lorelle-400" /></button>
              </div>
              <div className="px-8 py-8 text-center">
                <AlertCircle size={28} className="text-vt-700 mx-auto mb-4" />
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Минимальный заказ</p>
                <p className="font-display text-5xl text-ink mb-2">14 000 ₽</p>
                <div className="w-8 h-px bg-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-1">В корзине: <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong></p>
                <p className="text-xs text-gray-400 mb-6">Добавьте ещё на <strong className="text-vt-700">{(MIN_ORDER - totalPrice).toLocaleString('ru-RU')} ₽</strong></p>
                <Link to="/brand/vt-cosmetics" onClick={() => { setShowMin(false); onClose() }}
                  className="btn-primary w-full flex items-center justify-center gap-2 mb-3">
                  <ShoppingBag size={13} /> Добавить товары
                </Link>
                <button onClick={() => setShowMin(false)} className="text-[11px] text-gray-400 hover:text-gray-600 py-1">Вернуться в корзину</button>
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
  return (
    <main className="bg-lorelle-100">
      {/* PAGE 1 — Главная */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left: text column */}
          <div className="md:col-span-2">
            <h1 className="font-serif text-6xl md:text-7xl text-ink leading-none mb-4 uppercase">
              Корейская<br />косметика<br />по честным<br />ценам
            </h1>
            <p className="font-editorial italic text-base text-gray-600 mb-4 leading-relaxed">
              Оригинальный уход из Кореи<br />без лишних наценок и переплат
            </p>
            <div className="w-8 h-px bg-gray-400 mb-5" />
            <div className="space-y-3 mag-body">
              <p>Мы верим, что качественный уход за кожей должен быть доступным. Не из-за скидок, а благодаря честному подходу к делу.</p>
              <p>Мы работаем напрямую с проверенными поставщиками в Корее и Вьетнаме, закупая оригинальную продукцию по ценам местного рынка.</p>
              <p>В нашей стоимости нет наценок маркетплейсов, сетевых магазинов, дорогих торговых площадей и множества посредников.</p>
              <p>Вы платите только за оригинальный продукт, доставку и логистику — и ничего лишнего.</p>
              <p>Благодаря этому многие товары доступны по цене, максимально близкой к той, которую можно увидеть в магазинах Кореи.</p>
            </div>
            <p className="font-editorial italic text-base text-gray-500 mt-5">Красота из Кореи —<br />без переплат.</p>
          </div>
          {/* Right: images */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="flex-1 overflow-hidden" style={{ maxHeight: '340px' }}>
              <img src="https://images.unsplash.com/photo-1614823498400-93bbff0d8b1f?w=800&h=600&fit=crop&crop=face" alt="Korean beauty" className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-shrink-0 overflow-hidden" style={{ height: '200px' }}>
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=400&fit=crop" alt="Korean skincare products" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mt-8 border border-gray-200">
          <div className="relative overflow-hidden" style={{ height: '200px' }}>
            <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop" alt="Korea Beauty" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <p className="font-display text-4xl text-white tracking-[0.3em]">KOREA</p>
              <p className="font-display text-4xl text-white tracking-[0.3em]">BEAUTY</p>
              <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1">Seoul</p>
            </div>
          </div>
          <div className="bg-white p-8 flex flex-col justify-center border-l border-gray-200">
            <p className="font-serif text-2xl text-ink mb-3 leading-tight">Прямые поставки<br />из Кореи и Вьетнама</p>
            <p className="mag-body mb-4">Мы регулярно посещаем производителей, контролируем качество и выбираем только те бренды, которым доверяем. Так мы можем предложить вам лучшее сочетание качества и цены.</p>
            <div className="space-y-1">
              {['Оригинальная продукция.', 'Проверенные бренды.', 'Честные цены.'].map(t => (
                <p key={t} className="font-editorial italic text-sm text-gray-600">{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 — Почему у кореянок такая кожа */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          <div className="md:col-span-2">
            <h2 className="font-serif text-6xl md:text-7xl text-ink leading-none uppercase mb-4">
              Почему<br />у кореянок<br />такая<br />красивая<br />кожа?
            </h2>
            <p className="mag-body mb-5">Многие считают, что секрет корейской кожи скрыт в одном дорогом креме. Но настоящая причина совсем в другом.</p>
            <div className="space-y-4">
              {[
                'Красивая кожа — это результат системного ухода, где каждое средство выполняет свою задачу и усиливает действие следующего.',
                'В Корее уход за кожей — это ежедневная привычка, такая же естественная, как чистка зубов или занятия спортом.',
              ].map((t, i) => (
                <div key={i} className="flex gap-3 bg-lorelle-200 p-4">
                  <span className="text-lg flex-shrink-0">🌿</span>
                  <p className="mag-body">{t}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 overflow-hidden" style={{ maxHeight: '500px' }}>
            <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1000&fit=crop&crop=face" alt="Korean skin" className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* Steps */}
        <div className="border border-gray-200 bg-white p-8 mb-8">
          <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-6">Корейский уход состоит из нескольких этапов</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: '1', title: 'ОЧИЩЕНИЕ', desc: 'Удаляет загрязнения, излишки себума и остатки макияжа' },
              { n: '2', title: 'ПОДГОТОВКА КОЖИ', desc: 'Тонер восстанавливает баланс кожи и повышает эффективность следующих средств' },
              { n: '3', title: 'АКТИВНАЯ СЫВОРОТКА', desc: 'Доставляет активные компоненты глубоко в кожу и решает конкретные задачи' },
              { n: '4', title: 'УВЛАЖНЯЮЩИЙ КРЕМ', desc: 'Удерживает влагу, питает и укрепляет защитный барьер кожи' },
              { n: '5', title: 'ЗАЩИТА ОТ СОЛНЦА', desc: 'SPF-защита предотвращает фотостарение и помогает сохранить молодость' },
            ].map(s => (
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

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
          <div>
            <p className="mag-body mb-3">Каждый этап работает на общий результат: здоровую, увлажнённую и сияющую кожу. Когда средства подобраны правильно и используются регулярно, кожа начинает выглядеть заметно лучше уже через несколько недель.</p>
          </div>
          <div>
            <p className="font-editorial italic text-lg text-gray-600 leading-relaxed">Красота кожи начинается не с одного крема. Она начинается с правильной системы ухода.</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-5">Результат комплексного ухода</p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {['Глубокое увлажнение', 'Естественное сияние', 'Сильный защитный барьер', 'Ровная текстура и тон', 'Профилактика возрастных изменений'].map((r, i) => (
              <div key={i} className="text-center p-4 border border-gray-200">
                <div className="text-2xl mb-2">{['💧', '✨', '🛡', '🌊', '⏳'][i]}</div>
                <p className="text-[10px] text-gray-600 leading-tight font-medium">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

/* ─── SKIN ANALYSIS ──────────────────────────────────────────── */
export function SkinAnalysisPage() {
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
    if (!photo) e.photo = 'Загрузите фотографию'
    if (!form.firstName.trim()) e.firstName = 'Введите имя'
    if (!form.lastName.trim()) e.lastName = 'Введите фамилию'
    if (!form.email.includes('@')) e.email = 'Введите корректный email'
    if (!form.phone.trim()) e.phone = 'Введите номер телефона'
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
      <p className="mag-label mb-3">Анализ отправлен</p>
      <h1 className="font-serif text-6xl text-ink mb-4">Заявка принята</h1>
      <div className="w-8 h-px bg-gray-300 mx-auto mb-5" />
      <p className="mag-body mb-2">Спасибо, <strong>{form.firstName}</strong>! Наши специалисты изучат фотографию и составят персональные рекомендации.</p>
      <p className="text-sm text-gray-500 mb-1">⏱ Ожидание: <strong>до 24 часов</strong></p>
      <p className="text-sm text-gray-500 mb-8">Результаты придут на: <strong className="text-vt-700">{form.email}</strong></p>
      <Link to="/brand/vt-cosmetics" className="btn-primary inline-flex items-center gap-2"><ShoppingBag size={13} /> Смотреть каталог</Link>
    </main>
  )

  return (
    <main className="bg-lorelle-100">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <h1 className="font-serif text-6xl md:text-7xl text-ink leading-none uppercase mb-4">
              Бесплатный<br />анализ<br />кожи
            </h1>
            <p className="mag-body mb-5">Загрузите фотографию лица анфас и получите подробный анализ состояния кожи с рекомендациями по уходу</p>
            <div className="bg-lorelle-200 p-4 mb-5 flex items-center gap-3">
              <span className="text-xl">🌿</span>
              <p className="font-editorial italic text-base text-gray-600">Ваша кожа уникальна.<br />Уход должен быть персональным.</p>
            </div>
            <button onClick={() => document.getElementById('analysis-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary flex items-center gap-2">
              <Camera size={14} /> Пройти анализ кожи
            </button>
          </div>
          <div className="md:col-span-3 overflow-hidden" style={{ maxHeight: '480px' }}>
            <img src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=800&h=900&fit=crop&crop=face" alt="Skin Analysis" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-200">
        <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-8">Что вы получите</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: 'ОПРЕДЕЛЕНИЕ ТИПА КОЖИ', desc: 'Узнайте свой тип кожи и её особенности' },
            { icon: '💧', title: 'ОЦЕНКА УРОВНЯ УВЛАЖНЕНИЯ', desc: 'Проверка уровня увлажнённости кожи' },
            { icon: '🔬', title: 'АНАЛИЗ ПОР И ТЕКСТУРЫ', desc: 'Выявим особенности пор, рельефа и текстуры кожи' },
            { icon: '🌡', title: 'ВЫЯВЛЕНИЕ ЧУВСТВИТЕЛЬНОСТИ', desc: 'Определим склонность к покраснениям и раздражениям' },
            { icon: '🌅', title: 'РЕКОМЕНДАЦИИ ПО УТРЕННЕМУ УХОДУ', desc: 'Пошаговая схема ухода для защиты и сияния кожи' },
            { icon: '🌙', title: 'РЕКОМЕНДАЦИИ ПО ВЕЧЕРНЕМУ УХОДУ', desc: 'Пошаговая схема ухода для восстановления кожи' },
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
        <p className="text-center mag-label mb-3">Заполните форму</p>
        <h2 className="font-serif text-5xl text-ink text-center mb-2">Анализ кожи</h2>
        <div className="w-8 h-px bg-gray-300 mx-auto mb-8" />
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo */}
          <div>
            <p className="mag-label mb-2">Фотография лица</p>
            <div onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${errors.photo ? 'border-red-300 bg-red-50' : preview ? 'border-vt-400 bg-vt-50' : 'border-lorelle-300 hover:border-vt-400'}`}>
              {preview ? (
                <div className="flex flex-col items-center gap-2">
                  <img src={preview} alt="Preview" className="w-24 h-24 object-cover" />
                  <p className="text-xs text-vt-700 font-medium">✓ Фото загружено</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-gray-400" />
                  <p className="text-sm text-gray-600">Загрузить фотографию лица анфас</p>
                  <p className="text-xs text-gray-400">JPG, PNG · до 10 МБ</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[{ name: 'firstName', label: 'Имя', ph: 'Анна' }, { name: 'lastName', label: 'Фамилия', ph: 'Иванова' }].map(({ name, label, ph }) => (
              <div key={name}>
                <label className="mag-label mb-2 block">{label}</label>
                <input name={name} value={form[name]} onChange={handleInput} placeholder={ph}
                  className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-vt-500 transition-colors ${errors[name] ? 'border-red-300' : 'border-gray-200'}`} />
                {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
              </div>
            ))}
          </div>

          {[{ name: 'email', label: 'Email — сюда придут результаты', ph: 'anna@example.com', type: 'email' }, { name: 'phone', label: 'Номер телефона', ph: '+7 (999) 000-00-00', type: 'tel' }].map(({ name, label, ph, type }) => (
            <div key={name}>
              <label className="mag-label mb-2 block">{label}</label>
              <input name={name} type={type} value={form[name]} onChange={handleInput} placeholder={ph}
                className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-vt-500 transition-colors ${errors[name] ? 'border-red-300' : 'border-gray-200'}`} />
              {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
            </div>
          ))}

          <p className="text-xs text-gray-400">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            <Camera size={14} /> Отправить на анализ
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
  const [pageIdx, setPageIdx] = useState(0)
  const [added, setAdded] = useState(null)
  const total = vtProducts.length

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') setPageIdx(i => Math.min(i + 1, total - 1))
      if (e.key === 'ArrowLeft')  setPageIdx(i => Math.max(i - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [total])

  if (slug !== 'vt-cosmetics') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center bg-lorelle-100 min-h-screen">
        <p className="font-display text-6xl text-ink mb-4">{lorelleBrands.find(b => b.slug === slug)?.name || 'Бренд'}</p>
        <p className="mag-body">Продукция этого бренда скоро появится</p>
        <Link to="/" className="btn-primary inline-block mt-6">На главную</Link>
      </div>
    )
  }

  const product = vtProducts[pageIdx]

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
        aria-label="Предыдущий продукт"
        className="fixed left-2 top-1/2 -translate-y-1/2 z-30 w-9 h-20 bg-white border border-gray-200 shadow hover:shadow-md hover:bg-lorelle-200 transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} className="text-ink" />
      </button>

      {/* → Right arrow */}
      <button
        onClick={() => setPageIdx(i => Math.min(i + 1, total - 1))}
        disabled={pageIdx === total - 1}
        aria-label="Следующий продукт"
        className="fixed right-2 top-1/2 -translate-y-1/2 z-30 w-9 h-20 bg-white border border-gray-200 shadow hover:shadow-md hover:bg-lorelle-200 transition-all flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} className="text-ink" />
      </button>

      {/* Page dots */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
        {vtProducts.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setPageIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === pageIdx ? 'bg-ink w-6' : 'bg-gray-300 w-1.5 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Product page — key change triggers fade-in re-mount */}
      <div key={product.id} className="max-w-7xl mx-auto px-10 md:px-16 py-6 animate-fade-in">
        <p className="mag-label mb-3">VT Cosmetics · {product.line}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ minHeight: 'calc(100vh - 210px)' }}>

          {/* LEFT: Info */}
          <div className="flex flex-col order-2 md:order-1">
            <h2 className="font-display text-5xl md:text-6xl text-vt-700 leading-none mb-2 uppercase">
              {product.nameEn}
            </h2>
            <p className="font-serif text-base text-ink leading-snug mb-4 uppercase tracking-wide">
              {product.nameRu}
            </p>
            <p className="mag-body mb-5">{product.description}</p>

            <div className="space-y-3 mb-5">
              {product.benefits.map((b, i) => (
                <div key={i} className="border-l-2 border-vt-200 pl-4">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-ink mb-0.5">{b.title}</p>
                  <p className="text-xs text-gray-500 leading-snug">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-gray-200 bg-white p-5 mt-auto">
              <div className="grid grid-cols-3 gap-4 mb-4 text-[10px]">
                <div>
                  <p className="mag-label mb-1">Объём</p>
                  <p className="font-semibold text-ink">{product.volume}</p>
                </div>
                <div>
                  <p className="mag-label mb-1">Активные компоненты</p>
                  <div className="space-y-0.5">
                    {product.ingredients.slice(0, 3).map((ing, i) => (
                      <p key={i} className="text-gray-600">· {ing}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mag-label mb-1">Для какой кожи</p>
                  <div className="space-y-0.5">
                    {product.skinTypes.slice(0, 4).map((st, i) => (
                      <p key={i} className="text-gray-600">✓ {st}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="font-display text-3xl text-ink">{product.price.toLocaleString('ru-RU')} ₽</span>
                <button
                  onClick={handleAdd}
                  className={`transition-all px-6 py-2.5 text-xs uppercase tracking-widest font-semibold ${
                    added === product.id ? 'bg-vt-600 text-white' : 'bg-ink text-white hover:bg-vt-700'
                  }`}
                >
                  {added === product.id ? '✓ Добавлено' : '+ В корзину'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="relative overflow-hidden order-1 md:order-2 min-h-[320px] md:min-h-[480px]">
            <img
              src={product.image}
              alt={product.nameEn}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
              <span className="font-display text-xl text-white tracking-widest opacity-60">PDRN</span>
              <span className="text-[9px] uppercase tracking-widest text-white/50">VT COSMETICS · KOREA</span>
            </div>
            <div className="absolute top-4 right-4 bg-white/90 px-3 py-1">
              <span className="text-[9px] uppercase tracking-widest font-semibold text-vt-700">
                {String(pageIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
