import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Главная</Link> | <Link to="/about">О нас (lazy)</Link>
        </nav>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}
export default App
