import React, { useState, Component } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import {
  LorelleMasthead,
  SideMenu,
  LorellCart,
  HomePage,
  SkinAnalysisPage,
  BrandPage,
} from './components/LorelleSite'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(e) { return { error: e } }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 32, fontFamily: 'monospace', background: '#fff0f0', minHeight: '100vh' }}>
        <h2 style={{ color: 'red' }}>Runtime Error:</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{this.state.error?.message}</pre>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 11, color: '#666' }}>{this.state.error?.stack}</pre>
      </div>
    )
    return this.props.children
  }
}

function NotFound() {
  return (
    <div className="min-h-screen bg-lorelle-100 flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-9xl text-lorelle-300 leading-none">404</p>
      <p className="font-display text-3xl text-ink mb-4 uppercase">Страница не найдена</p>
      <Link to="/" className="btn-primary">На главную</Link>
    </div>
  )
}

function Layout() {
  const [cartOpen, setCartOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <LorelleMasthead onCartOpen={() => setCartOpen(true)} onMenuOpen={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <LorellCart open={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/skin-analysis" element={<SkinAnalysisPage />} />
        <Route path="/brand/:slug" element={<BrandPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Layout />
      </CartProvider>
    </ErrorBoundary>
  )
}
