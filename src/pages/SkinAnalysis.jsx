import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Upload, CheckCircle, Sparkles, Droplets, ScanFace, Leaf, Sun, Moon, ShoppingBag } from 'lucide-react'

const benefits = [
  {
    icon: ScanFace,
    title: 'Определение типа кожи',
    desc: 'Узнайте свой тип кожи и её особенности',
  },
  {
    icon: Droplets,
    title: 'Оценка уровня увлажнения',
    desc: 'Проверка уровня увлажнённости кожи',
  },
  {
    icon: Sparkles,
    title: 'Анализ пор и текстуры',
    desc: 'Выявим особенности пор, рельефа и текстуры',
  },
  {
    icon: Leaf,
    title: 'Выявление чувствительности',
    desc: 'Определим склонность к покраснениям и раздражениям',
  },
  {
    icon: Sun,
    title: 'Рекомендации по утреннему уходу',
    desc: 'Пошаговая схема ухода для защиты и сияния кожи',
  },
  {
    icon: Moon,
    title: 'Рекомендации по вечернему уходу',
    desc: 'Пошаговая схема ухода для восстановления кожи',
  },
]

export default function SkinAnalysis() {
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleInput = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!photo) errs.photo = 'Загрузите фотографию лица'
    if (!form.firstName.trim()) errs.firstName = 'Введите имя'
    if (!form.lastName.trim()) errs.lastName = 'Введите фамилию'
    if (!form.email.trim() || !form.email.includes('@')) errs.email = 'Введите корректный email'
    if (!form.address.trim()) errs.address = 'Введите адрес'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="w-20 h-20 bg-forest-100 flex items-center justify-center mx-auto mb-8">
          <CheckCircle size={40} className="text-forest-600" />
        </div>
        <p className="editorial-label mb-4">Анализ отправлен</p>
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-5 leading-tight">
          Ваша заявка<br />принята
        </h1>
        <div className="w-12 h-px bg-gray-300 mx-auto mb-6" />
        <p className="text-gray-600 mb-3 leading-relaxed">
          Спасибо, <strong>{form.firstName}</strong>! Наши специалисты изучат фотографию и составят персональные рекомендации по корейской косметике.
        </p>
        <p className="text-gray-500 text-sm mb-2">
          ⏱ Ожидание составит <strong>до 24 часов</strong>.
        </p>
        <p className="text-gray-500 text-sm mb-10">
          Результаты с подбором средств придут на почту: <strong className="text-forest-700">{form.email}</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/catalog" className="btn-primary inline-flex items-center justify-center gap-2">
            <ShoppingBag size={15} /> Смотреть каталог
          </Link>
          <Link to="/" className="btn-secondary inline-flex items-center justify-center gap-2">
            На главную
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      {/* Hero editorial section */}
      <section className="bg-cream-100 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="editorial-label mb-5">Бесплатный сервис HANA</p>
              <h1 className="font-serif text-5xl md:text-6xl font-black text-gray-900 leading-none mb-6 uppercase tracking-tight">
                Бесплатный<br />анализ<br />кожи
              </h1>
              <div className="w-12 h-px bg-forest-700 mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4 max-w-md">
                Загрузите фотографию лица анфас и получите подробный анализ состояния кожи с рекомендациями по уходу из Кореи и Вьетнама.
              </p>
              <p className="text-gray-400 text-sm italic mb-8">
                «Ваша кожа уникальна. Уход должен быть персональным.»
              </p>
              <a
                href="#analysis-form"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Camera size={15} /> Пройти анализ кожи
              </a>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-[3/4] bg-cream-200 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=600&h=800&fit=crop&crop=face"
                  alt="Анализ кожи"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Пример результата</p>
                <p className="text-sm font-medium text-gray-900">Комбинированная кожа · Обезвоженность · Расширенные поры</p>
                <p className="text-xs text-forest-700 mt-1">→ Подобрано 4 средства из Кореи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="editorial-label mb-3">Что вы получите</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900">Полный анализ вашей кожи</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center group">
              <div className="w-14 h-14 border border-cream-400 bg-cream-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-forest-50 group-hover:border-forest-300 transition-colors">
                <Icon size={22} className="text-gray-500 group-hover:text-forest-600 transition-colors" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-gray-700 mb-2 leading-tight">{title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom promo banner */}
      <section className="bg-cream-200 border-y border-cream-400">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="editorial-label mb-3">Готовые решения для вашей кожи</p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Готовые решения<br />для вашей кожи
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              Мы уже собрали эффективные комплексы корейской косметики для разных типов кожи и задач. Вам остаётся только выбрать свой идеальный уход.
            </p>
            <Link to="/catalog" className="btn-primary inline-flex items-center gap-2">
              Подобрать свой уход →
            </Link>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-600 mb-4">Почему это важно?</p>
            <ul className="space-y-3">
              {[
                'Правильный уход решает реальные проблемы кожи',
                'Вы экономите время и деньги на подбор средств',
                'Ваша кожа будет здоровой, ухоженной и сияющей каждый день',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="w-5 h-5 bg-forest-700 text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="analysis-form" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="editorial-label mb-3">Заполните форму</p>
          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">Анализ кожи</h2>
          <div className="w-12 h-px bg-gray-300 mx-auto" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo upload */}
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-600 mb-3">Фотография лица</p>
            <div
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed rounded-none cursor-pointer transition-all ${
                errors.photo ? 'border-red-300 bg-red-50' : photoPreview ? 'border-forest-400 bg-forest-50' : 'border-cream-400 bg-cream-100 hover:border-forest-400 hover:bg-forest-50'
              } p-8 text-center`}
            >
              {photoPreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover" />
                  <p className="text-sm text-forest-700 font-medium">✓ Фото загружено — нажмите, чтобы заменить</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload size={28} className="text-gray-400" />
                  <p className="text-sm text-gray-600 font-medium">Загрузить фотографию лица анфас</p>
                  <p className="text-xs text-gray-400">JPG, PNG · до 10 МБ · хорошее освещение</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
            {errors.photo && <p className="text-xs text-red-500 mt-1">{errors.photo}</p>}
          </div>

          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">Имя</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleInput}
                placeholder="Анна"
                className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-500 transition-colors ${errors.firstName ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">Фамилия</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleInput}
                placeholder="Иванова"
                className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-500 transition-colors ${errors.lastName ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">Email — сюда придут результаты</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleInput}
              placeholder="anna@example.com"
              className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-500 transition-colors ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-semibold text-gray-600 mb-2">Адрес доставки (для рекомендованного заказа)</label>
            <input
              name="address"
              value={form.address}
              onChange={handleInput}
              placeholder="Москва, ул. Тверская, д. 1"
              className={`w-full border px-4 py-3 text-sm bg-white focus:outline-none focus:border-forest-500 transition-colors ${errors.address ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Ваше фото используется исключительно для анализа кожи и не передаётся третьим лицам.
          </p>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
            <Camera size={15} /> Отправить на анализ
          </button>
        </form>
      </section>
    </main>
  )
}
