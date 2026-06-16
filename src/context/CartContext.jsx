import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.product.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) }
    case 'UPDATE_QTY': {
      if (action.qty < 1) {
        return { ...state, items: state.items.filter(i => i.id !== action.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }
    }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

const initialState = {
  items: JSON.parse(localStorage.getItem('glamour_cart') || '[]'),
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('glamour_cart', JSON.stringify(state.items))
  }, [state.items])

  const totalQty = state.items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id })
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ items: state.items, totalQty, totalPrice, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
