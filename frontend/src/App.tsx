import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import DerivativeAdvisor from './pages/DerivativeAdvisor'
import DerivativeList from './pages/DerivativeList'
import Landing from './pages/Landing'
import Portfolio from './pages/Portfolio'
import StockAdvisor from './pages/StockAdvisor'
import StockList from './pages/StockList'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stocks" element={<StockList />} />
        <Route path="/stocks/:symbol" element={<StockAdvisor />} />
        <Route path="/derivatives" element={<DerivativeList />} />
        <Route path="/derivatives/:symbol" element={<DerivativeAdvisor />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
