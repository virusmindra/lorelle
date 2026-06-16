import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Flame, Star, ChevronRight, Sparkles, BadgeCheck, Truck, Tag } from 'lucide-react'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const featuredProducts = products.slice(0, 8)
const saleProducts = products.filter(p => p.oldPrice).slice(0, 4)

const categoryCards = [
  {
    id: 'serums',
    name: 'Сыворотки',
    desc: 'PDRN, улитка, пептиды',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop',
    color: 'from-forest-600 to-forest-900',
  },
  {
    id: 'skincare',
    name: 'Уход за кожей',
    desc: 'Кремы, масла, очищение',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop',
    color: 'from-sage-600 to-forest-800',
  },
  {
    id: 'masks',
    name: 'Маски и пилинги',
    desc: 'Ночные маски, пилинги',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    color: 'from-teal-600 to-forest-700',
  },
  {
    id: 'devices',
    name: 'Устройства',
    desc: 'RF, EMS, LED-маски',
    image: 'https://images.unsplash.com/photo-1551799517-eb8f03cb5e6a?w=400&h=300&fit=crop',
    color: 'from-forest-700 to-gray-800',
  },
]

const whyUs = [
  {
    icon: Truck,
    title: 'Прямые поставки',
    text: 'Работаем напрямую с поставщиками в Корее и Вьетнаме. Без посредников.',
  },
  {
    icon: Tag,
    title: 'Честные цены',
    text: 'Без наценок маркетплейсов, сетевых магазинов и аренды складов.',
  },
  {
    icon: BadgeCheck,
    title: 'Только оригинал',
    text: 'Гарантия качества и подлинности. Сертификаты на каждую партию товара.',
  },
]

const testimonials = [
  {
    name: 'Анна К.',
    city: 'Москва',
    rating: 5,
    text: 'VT Reedle Shot купила здесь за 2 300 ₽, на Wildberries тот же товар стоил 4 200 ₽. Разница огромная, и это оригинал — проверила по QR-коду.',
    avatar: 'А',
    color: 'bg-forest-600',
  },
  {
    name: 'Екатерина Р.',
    city: 'СПб',
    rating: 5,
    text: 'Наконец-то нашла магазин с настоящими ценами из Кореи. COSRX улитка пришла быстро, упакована отлично. Буду заказывать ещё!',
    avatar: 'Е',
    color: 'bg-sage-600',
  },
  {
    name: 'Мария С.',
    city: 'Краснодар',
    rating: 5,
    text: 'ma:nyo пилинг-гель взяла впервые — влюбилась. Цена ниже чем везде, доставка СДЭК пришла за 4 дня. Магазин топ!',
    avatar: 'М',
    color: 'bg-teal-600',
  },
  {
    name: 'Дарья Т.',
    city: 'Новосибирск',
    rating: 5,
    text: 'MAXCARE устройство за 12 900 ₽ — в других местах такое от 20 000 ₽. Уже 2 недели пользуюсь, результат виден. Спасибо HANA!',
    avatar: 'Д',
    color: 'bg-amber-600',
  },
]

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Why us */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyUs.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-forest-100 flex gap-4">
              <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-forest-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Price comparison banner */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-forest-50 border border-forest-200 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row items-center gap-6">
          <div className="text-4xl flex-shrink-0">💬</div>
          <div className="flex-1">
            <p className="text-forest-800 font-medium text-base md:text-lg leading-relaxed italic">
              «Поэтому наша цена будет такая же как цена в розничном магазине в Корее или во Вьетнаме, но при этом остаётся{' '}
              <span className="font-bold text-forest-700 not-italic">значительно дешевле</span> цены в России.»
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center flex-shrink-0">
            <p className="text-xs text-gray-500 mb-1">Например, VT Reedle Shot 100</p>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-400">В России</p>
                <p className="font-bold text-gray-400 line-through text-sm">от 3 900 ₽</p>
              </div>
              <ArrowRight size={16} className="text-forest-600" />
              <div className="text-center">
                <p className="text-xs text-gray-500">У нас</p>
                <p className="font-bold text-forest-700 text-xl">2 300 ₽</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Категории</h2>
            <p className="text-gray-500 mt-1">Корейская и вьетнамская косметика</p>
          </div>
          <Link to="/catalog" className="btn-ghost flex items-center gap-1 hidden sm:flex">
            Все категории <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryCards.map(cat => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-xl transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-65 group-hover:opacity-75 transition-opacity`} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-white text-base md:text-lg leading-tight">{cat.name}</h3>
                <p className="text-white/80 text-xs mt-0.5">{cat.desc}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={14} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={20} className="text-forest-500" />
                <span className="text-forest-600 font-semibold text-sm">🇰🇷🇻🇳 Популярное</span>
              </div>
              <h2 className="section-title">Хиты продаж</h2>
            </div>
            <Link to="/catalog" className="btn-ghost flex items-center gap-1 hidden sm:flex">
              Смотреть все <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/catalog" className="btn-secondary inline-flex items-center gap-2">
              Весь каталог <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-700 to-forest-900 p-8 md:p-12">
          <div className="relative z-10 max-w-lg">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 backdrop-blur">
              🇰🇷 Прямые поставки
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Скидки до 43% на сыворотки из Кореи
            </h2>
            <p className="text-forest-200 text-sm md:text-base mb-6">
              VT, COSRX, ma:nyo, beplain — по ценам корейского рынка. Без переплат маркетплейсам.
            </p>
            <Link to="/catalog?category=serums" className="bg-white text-forest-700 font-bold px-6 py-3 rounded-full hover:bg-forest-50 transition inline-flex items-center gap-2">
              Смотреть сыворотки <ArrowRight size={16} />
            </Link>
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/5 rounded-full" />
          <div className="absolute right-40 top-10 w-20 h-20 bg-white/10 rounded-full" />
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop"
            alt="Korean serums"
            className="absolute right-0 bottom-0 h-full w-auto object-cover opacity-20 hidden md:block"
          />
        </div>
      </section>

      {/* Sale products */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={20} className="text-orange-500" />
              <span className="text-orange-500 font-semibold text-sm">Лучшие цены</span>
            </div>
            <h2 className="section-title">Товары со скидкой</h2>
          </div>
          <Link to="/sales" className="btn-ghost flex items-center gap-1 hidden sm:flex">
            Все акции <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">Отзывы покупателей</h2>
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
              </div>
              <span className="font-semibold">4.9</span>
              <span>из 30 000+ отзывов</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <div key={t.name} className="bg-forest-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.city}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
