import React, { useState } from 'react'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'

const MIN_ORDER = 14000

export default function Cart({ isOpen, onClose }) {
  const { items, totalPrice, totalQty, removeItem, updateQty, clearCart } = useCart()
  const [showMinOrder, setShowMinOrder] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (totalPrice < MIN_ORDER) {
      setShowMinOrder(true)
      return
    }
    onClose()
    navigate('/checkout')
  }

  const freeShippingThreshold = 20000
  const remaining = freeShippingThreshold - totalPrice
  const progressPct = Math.min((totalPrice / freeShippingThreshold) * 100, 100)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag size={22} className="text-forest-600" />
            <h2 className="font-serif text-xl font-bold text-gray-900">Корзина</h2>
            {totalQty > 0 && (
              <span className="bg-forest-100 text-forest-700 text-xs font-bold px-2.5 py-1 rounded-full">
                {totalQty} {totalQty === 1 ? 'товар' : totalQty < 5 ? 'товара' : 'товаров'}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {totalQty > 0 && (
          <div className="px-6 py-3 bg-forest-50 border-b border-forest-100">
            {remaining > 0 ? (
              <p className="text-xs text-forest-700 mb-1.5">
                До бесплатной доставки осталось <strong>{remaining.toLocaleString('ru-RU')} ₽</strong>
              </p>
            ) : (
              <p className="text-xs text-green-700 mb-1.5 font-semibold">🎉 Бесплатная доставка активирована!</p>
            )}
            <div className="w-full h-1.5 bg-forest-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-forest-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-24 h-24 bg-forest-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={40} className="text-forest-300" />
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-lg">Корзина пуста</p>
                <p className="text-gray-400 text-sm mt-1">Добавьте товары из каталога</p>
              </div>
              <Link to="/catalog" onClick={onClose} className="btn-primary text-sm">
                Перейти в каталог
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-50 rounded-2xl p-3">
                <Link to={`/product/${item.id}`} onClick={onClose} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-forest-600 font-semibold">{item.brand}</p>
                  <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.volume}</p>
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty control */}
                    <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-forest-600 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-forest-600 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">
                        {(item.price * item.qty).toLocaleString('ru-RU')} ₽
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            {/* Promo */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Промокод"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100"
              />
              <button className="px-4 py-2.5 bg-gray-100 hover:bg-forest-50 text-gray-700 hover:text-forest-700 rounded-xl text-sm font-semibold transition-all">
                Применить
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Товары ({totalQty})</span>
                <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Доставка (СДЭК)</span>
                <span className={totalPrice >= freeShippingThreshold ? 'text-green-600 font-medium' : ''}>
                  {totalPrice >= freeShippingThreshold ? 'Бесплатно' : '350 ₽'}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-100">
                <span>Итого</span>
                <span>{(totalPrice + (totalPrice >= freeShippingThreshold ? 0 : 350)).toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="btn-primary w-full flex items-center justify-center gap-2 text-base"
            >
              Оформить заказ <ArrowRight size={16} />
            </button>

            <button
              onClick={clearCart}
              className="w-full text-xs text-gray-400 hover:text-red-400 transition-colors py-1"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>

      {/* Minimum order modal */}
      {showMinOrder && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[60] animate-fade-in"
            onClick={() => setShowMinOrder(false)}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="bg-cream-100 max-w-sm w-full shadow-2xl animate-slide-up">
              {/* Top accent */}
              <div className="bg-forest-800 px-6 py-4 flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-widest text-cream-300 font-semibold">HANA · Условия заказа</p>
                <button onClick={() => setShowMinOrder(false)} className="text-cream-300 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="px-8 py-8 text-center">
                <div className="w-16 h-16 bg-cream-200 flex items-center justify-center mx-auto mb-5">
                  <AlertCircle size={28} className="text-forest-700" />
                </div>

                <p className="editorial-label mb-3">Минимальный заказ</p>
                <h3 className="font-serif text-3xl font-black text-gray-900 leading-tight mb-2">
                  от 14 000 ₽
                </h3>
                <div className="w-8 h-px bg-gray-300 mx-auto mb-5" />
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Мы работаем с прямыми поставками из Кореи и Вьетнама. Минимальная сумма заказа — <strong>14 000 ₽</strong>.
                </p>
                <p className="text-xs text-gray-400 mb-7">
                  В вашей корзине сейчас: <strong className="text-gray-700">{totalPrice.toLocaleString('ru-RU')} ₽</strong>.
                  Добавьте ещё на <strong className="text-forest-700">{(MIN_ORDER - totalPrice).toLocaleString('ru-RU')} ₽</strong>.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/catalog"
                    onClick={() => { setShowMinOrder(false); onClose() }}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} /> Добавить товары
                  </Link>
                  <button
                    onClick={() => setShowMinOrder(false)}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors py-2"
                  >
                    Вернуться в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
