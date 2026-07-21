import React, { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ua') // 'ua' or 'en'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ua' ? 'en' : 'ua')
  }

  const getCurrency = () => {
    return language === 'en' ? 'USD' : 'UAH'
  }

  const convertPrice = (priceInRub) => {
    // Conversion rates (approximate)
    // 1 USD ≈ 92 RUB
    // 1 UAH ≈ 2.5 RUB
    if (language === 'en') {
      return Math.round(priceInRub / 92)
    } else {
      return Math.round(priceInRub / 2.5)
    }
  }

  const getCurrencySymbol = () => {
    return language === 'en' ? '$' : '₴'
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, getCurrency, convertPrice, getCurrencySymbol }}>
      {children}
    </LanguageContext.Provider>
  )
}
