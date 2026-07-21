import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, CreditCard, Wallet, Truck, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { shippingInfo } from '../data/products'

export default function Checkout() {
  const { items, totalPrice, totalQty, clearCart } = useCart()
  const { language, convertPrice, getCurrencySymbol } = useLanguage()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    country: 'Россия', city: '', address: '', zip: '',
    payment: 'card', comment: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const freeShippingThreshold = convertPrice(20000)
  const shippingCost = convertPrice(350)
  const shipping = totalPrice >= freeShippingThreshold ? 0 : shippingCost
  const total = totalPrice + shipping

  const handleInput = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-600" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 mb-3">{language === 'ua' ? 'Замовлення оформлено!' : 'Order placed!'}</h1>
        <p className="text-gray-500 mb-2">{language === 'ua' ? 'Дякуємо за покупку,' : 'Thank you for your purchase,'} <strong>{form.name}</strong>!</p>
        <p className="text-gray-500 mb-8 text-sm">
          {language === 'ua' ? 'Підтвердження відправлено на' : 'Confirmation sent to'} <strong>{form.email}</strong>.<br />
          {language === 'ua' ? 'Ми зв\'яжемося з вами протягом 30 хвилин.' : 'We will contact you within 30 minutes.'}
        </p>
        <Link to="/" className="btn-primary">{language === 'ua' ? 'На головну' : 'Back to home'}</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="font-bold text-xl mb-3">{language === 'ua' ? 'Кошик порожній' : 'Cart is empty'}</h2>
        <Link to="/catalog" className="btn-primary">{language === 'ua' ? 'Перейти в каталог' : 'Go to catalog'}</Link>
      </div>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-serif text-3xl font-bold mb-8">{language === 'ua' ? 'Оформлення замовлення' : 'Checkout'}</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10">
        {[
          { n: 1, label: language === 'ua' ? 'Дані' : 'Details' },
          { n: 2, label: language === 'ua' ? 'Доставка' : 'Shipping' },
          { n: 3, label: language === 'ua' ? 'Оплата' : 'Payment' },
        ].map(({ n, label }, i) => (
          <React.Fragment key={n}>
            <button
              onClick={() => n < step && setStep(n)}
              className={`flex items-center gap-2 text-sm font-medium ${step === n ? 'text-forest-700' : step > n ? 'text-green-600' : 'text-gray-400'}`}
            >
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step > n ? 'bg-green-500 text-white' : step === n ? 'bg-forest-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > n ? <Check size={13} /> : n}
              </span>
              <span className="hidden sm:block">{label}</span>
            </button>
            {i < 2 && <div className={`flex-1 h-0.5 ${step > n ? 'bg-green-300' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-lg mb-2">{language === 'ua' ? 'Особисті дані' : 'Personal details'}</h2>
                {[
                  { name: 'name', label: language === 'ua' ? 'Ім\'я та прізвище' : 'Name and surname', type: 'text', placeholder: language === 'ua' ? 'Анна Іванова' : 'Anna Ivanova' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'example@mail.com' },
                  { name: 'phone', label: language === 'ua' ? 'Телефон' : 'Phone', type: 'tel', placeholder: language === 'ua' ? '+380 (___) ___-__-__' : '+7 (___) ___-__-__' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleInput}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition"
                    />
                  </div>
                ))}
                <button type="button" onClick={() => setStep(2)} className="btn-primary w-full mt-2">
                  {language === 'ua' ? 'Далі: Доставка' : 'Next: Shipping'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-lg mb-2">{language === 'ua' ? 'Адреса доставки' : 'Shipping address'}</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ua' ? 'Країна' : 'Country'}</label>
                  <div className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-forest-50 text-forest-800 font-medium">
                    {language === 'ua' ? '�🇦 Україна (єдина зона доставки)' : '�🇺 Россия (единственная зона доставки)'}
                  </div>
                </div>
                {[
                  { name: 'city', label: language === 'ua' ? 'Місто' : 'City', placeholder: language === 'ua' ? 'Київ' : 'Москва' },
                  { name: 'address', label: language === 'ua' ? 'Вулиця, будинок, квартира' : 'Street, house, apartment', placeholder: language === 'ua' ? 'вул. Хрещатик, буд. 1, кв. 10' : 'ул. Тверская, д. 1, кв. 10' },
                  { name: 'zip', label: language === 'ua' ? 'Поштовий індекс' : 'Postal code', placeholder: '123456' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      name={field.name}
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleInput}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition"
                    />
                  </div>
                ))}
                <div className="bg-forest-50 rounded-xl p-3 text-xs text-forest-700">
                  📦 {language === 'ua' ? `Доставка — ${shippingCost}${getCurrencySymbol()} або безкоштовно при замовленні від ${freeShippingThreshold}${getCurrencySymbol()}` : `Доставка СДЭК — ${shippingCost}${getCurrencySymbol()} или бесплатно при заказе от ${freeShippingThreshold}${getCurrencySymbol()}`}
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1">{language === 'ua' ? 'Назад' : 'Back'}</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1">{language === 'ua' ? 'Далі: Оплата' : 'Next: Payment'}</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-lg mb-2">{language === 'ua' ? 'Спосіб оплати' : 'Payment method'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'card', icon: CreditCard, label: language === 'ua' ? 'Картка' : 'Card', sub: language === 'ua' ? 'Visa, MC' : 'Visa, MC' },
                    { value: 'sbp', icon: Wallet, label: language === 'ua' ? 'СБП' : 'SBP', sub: language === 'ua' ? 'Швидкі платежі' : 'Fast payments' },
                  ].map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        form.payment === opt.value ? 'border-forest-500 bg-forest-50' : 'border-gray-200 hover:border-forest-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={form.payment === opt.value}
                        onChange={handleInput}
                        className="accent-forest-600"
                      />
                      <opt.icon size={18} className={form.payment === opt.value ? 'text-forest-600' : 'text-gray-400'} />
                      <div>
                        <p className="font-medium text-sm">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'ua' ? 'Коментар до замовлення' : 'Order comment'}</label>
                  <textarea
                    name="comment"
                    value={form.comment}
                    onChange={handleInput}
                    placeholder={language === 'ua' ? 'Вкажіть побажання до доставки...' : 'Specify delivery preferences...'}
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest-400 resize-none"
                  />
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1">{language === 'ua' ? 'Назад' : 'Back'}</button>
                  <button type="submit" className="btn-primary flex-1">{language === 'ua' ? 'Підтвердити замовлення' : 'Confirm order'}</button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-24">
            <h2 className="font-semibold text-lg mb-4">{language === 'ua' ? 'Ваше замовлення' : 'Your order'}</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3">
                  <img src={item.image} alt={item.nameEn || item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 font-medium line-clamp-2">{item.nameEn || item.name}</p>
                    <p className="text-xs text-gray-400">× {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 flex-shrink-0">{convertPrice(item.price * item.qty).toLocaleString()}{getCurrencySymbol()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{language === 'ua' ? 'Товари' : 'Items'} ({totalQty})</span>
                <span>{convertPrice(totalPrice).toLocaleString()}{getCurrencySymbol()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{language === 'ua' ? 'Доставка' : 'Shipping'}</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? (language === 'ua' ? 'Безкоштовно' : 'Free') : `${shipping}${getCurrencySymbol()}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-gray-900 pt-2 border-t border-gray-100">
                <span>{language === 'ua' ? 'Разом' : 'Total'}</span>
                <span>{convertPrice(total).toLocaleString()}{getCurrencySymbol()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
