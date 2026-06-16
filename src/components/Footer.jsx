import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Send } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-forest-700 to-forest-800">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">Скидка 10% за подписку</h3>
              <p className="text-forest-200 text-sm">Первыми узнавайте о новинках из Кореи и Вьетнама</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 md:w-72 bg-white/10 border border-white/30 text-white placeholder-forest-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition"
              />
              <button className="bg-white text-forest-700 font-bold px-6 py-3 rounded-full text-sm hover:bg-forest-50 transition flex items-center gap-2 whitespace-nowrap">
                <Send size={15} /> Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-forest-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">H</span>
              </div>
              <span className="font-serif font-bold text-xl text-white tracking-wider">HANA</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-3">
              Прямые поставки корейской и вьетнамской косметики. Честные цены без наценок.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">🇰🇷</span>
              <span className="text-sm text-gray-400">Корея</span>
              <span className="text-gray-600">·</span>
              <span className="text-lg">🇻🇳</span>
              <span className="text-sm text-gray-400">Вьетнам</span>
            </div>
            <div className="flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Send, label: 'Telegram', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-white/10 hover:bg-forest-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h4 className="font-semibold text-white mb-4">Каталог</h4>
            <ul className="space-y-2.5">
              {[
                ['Уход за кожей', '/catalog?category=skincare'],
                ['Сыворотки', '/catalog?category=serums'],
                ['Маски', '/catalog?category=masks'],
                ['Тоники', '/catalog?category=toners'],
                ['Устройства', '/catalog?category=devices'],
                ['Уход за телом', '/catalog?category=bodycare'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-forest-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Информация</h4>
            <ul className="space-y-2.5">
              {[
                ['О компании', '/about'],
                ['Доставка и оплата', '/delivery'],
                ['Возврат товара', '/returns'],
                ['Гарантия оригинала', '/about'],
                ['Отзывы', '/about'],
                ['Блог о K-beauty', '/about'],
              ].map(([label, to]) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-gray-400 hover:text-forest-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-forest-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+78005553535" className="text-sm hover:text-forest-300 transition-colors block">+7 (800) 555-35-35</a>
                  <span className="text-xs text-gray-500">Бесплатно по России</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-forest-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:hello@hana-beauty.ru" className="text-sm hover:text-forest-300 transition-colors">hello@hana-beauty.ru</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-forest-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">Москва, Россия</span>
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs text-gray-500 mb-2 font-medium">Режим работы</p>
              <p className="text-sm text-gray-400">Пн–Пт: 9:00–21:00</p>
              <p className="text-sm text-gray-400">Сб–Вс: 10:00–18:00</p>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Доставка по России</p>
              <div className="flex gap-4 text-sm text-gray-400">
                <span>🚚 СДЭК — 3–7 дней</span>
                <span>📮 Почта России — 7–14 дней</span>
                <span className="text-forest-400 font-medium">🎁 Бесплатно от 20 000 ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2026 HANA Beauty. Все права защищены.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-forest-400 transition-colors">Политика конфиденциальности</Link>
            <Link to="/about" className="hover:text-forest-400 transition-colors">Пользовательское соглашение</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Оплата через</span>
            <span className="bg-yellow-400 text-yellow-900 px-2.5 py-0.5 rounded text-xs font-bold">Т‑Банк</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-medium">Visa</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs font-medium">МИР</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
