
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import About from './pages/About';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import Eggs from './pages/Dashboard/Eggs'
import Finance from './pages/Dashboard/Finance'
import Feeds from './pages/Dashboard/Feeds'
import Income from './pages/Dashboard/Income'
import Inventory from './pages/Dashboard/Inventory'
import Mortality from './pages/Dashboard/Mortality'
import Record from './pages/Dashboard/Record'
import Animals from './pages/Dashboard/Animals';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
              <Route path='login' element={<Login />}/>
              <Route path='market' element={<MarketPlace />}/>
              <Route path='about' element={<About />}/>
          </Route>
          <Route path='/dashboard' element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path='records' element={<Record />} />
              <Route path='eggs' element={<Eggs />} />
              <Route path='finance' element={<Finance />} />
              <Route path='feeds' element={<Feeds />} />
              <Route path='income' element={<Income />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='mortality' element={<Mortality />} />
              <Route path='animals' element={<Animals />} />
          </Route>
          <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
