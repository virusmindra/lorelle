import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Truck, RotateCcw, BadgeCheck } from 'lucide-react'

const slides = [
  {
    tag: '🇰🇷🇻🇳 Прямые поставки из Кореи и Вьетнама',
    title: 'Корейская\nкосметика\nпо ценам Азии',
    subtitle: 'Работаем напрямую с поставщиками в Корее и Вьетнаме. Никаких наценок маркетплейсов — только честная цена.',
    cta: 'Смотреть каталог',
    ctaLink: '/catalog',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&h=700&fit=crop',
    accent: 'from-forest-50 to-sage-100',
    highlight: 'Скидки до 43%',
  },
  {
    tag: '⭐ Хит сезона — VT Reedle Shot',
    title: 'PDRN сыворотки\nиз Кореи',
    subtitle: 'VT Reedle Shot 100 у нас — 2 300 ₽. В российских магазинах от 3 900 ₽. Разницу забирает маркетплейс, а не вы.',
    cta: 'Сыворотки и эссенции',
    ctaLink: '/catalog?category=serums',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&h=700&fit=crop',
    accent: 'from-sage-50 to-forest-100',
    highlight: 'Только оригинал',
  },
  {
    tag: '⚡ Корейские beauty-гаджеты',
    title: 'Профессиональный\nуход дома',
    subtitle: 'RF-лифтинг, EMS, LED-маски от проверенных корейских брендов. Прямо к вам — без переплат.',
    cta: 'Устройства для лица',
    ctaLink: '/catalog?category=devices',
    image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=700&h=700&fit=crop',
    accent: 'from-forest-100 to-sage-50',
    highlight: 'Гарантия подлинности',
  },
]

const features = [
  { icon: Truck, text: 'Прямые поставки', sub: 'Напрямую из Кореи и Вьетнама' },
  { icon: BadgeCheck, text: 'Честные цены', sub: 'Без наценок маркетплейсов' },
  { icon: Shield, text: 'Только оригинал', sub: 'Гарантия подлинности каждого товара' },
  { icon: RotateCcw, text: 'Возврат 14 дней', sub: 'Без вопросов, без проблем' },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5500)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative overflow-hidden">
      {/* Main hero */}
      <div className={`bg-gradient-to-br ${slide.accent} transition-all duration-700`}>
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Text */}
            <div className="order-2 md:order-1 animate-fade-in">
              <span className="inline-block bg-white/80 backdrop-blur text-forest-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                {slide.tag}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-forest-900 leading-tight mb-4 whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to={slide.ctaLink} className="btn-primary flex items-center gap-2">
                  {slide.cta} <ArrowRight size={16} />
                </Link>
                <span className="flex items-center gap-2 bg-white/80 backdrop-blur text-gray-700 font-semibold px-5 py-3 rounded-full text-sm shadow-sm">
                  🎁 {slide.highlight}
                </span>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10">
                {[
                  { value: '30 000+', label: 'Довольных клиентов' },
                  { value: '9 брендов', label: 'Прямые контракты' },
                  { value: '4.9 ★', label: 'Средний рейтинг' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-bold text-xl text-forest-700">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-forest-300/20 rounded-full blur-3xl scale-90" />
                <img
                  src={slide.image}
                  alt="Korean cosmetics"
                  className="relative rounded-3xl object-cover w-72 h-72 md:w-96 md:h-96 shadow-2xl"
                  key={current}
                />
                {/* Floating badges */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center text-sm">🇰🇷</div>
                  <div>
                    <p className="text-xs text-gray-500">Прямо из</p>
                    <p className="text-sm font-bold text-gray-900">Кореи</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3">
                  <div className="flex gap-0.5 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs font-bold text-gray-900">30 000+ отзывов</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="flex justify-center gap-2 pb-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? 'w-8 h-2 bg-forest-600' : 'w-2 h-2 bg-forest-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Features bar */}
      <div className="bg-white border-b border-forest-100">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, text, sub }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-forest-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{text}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
