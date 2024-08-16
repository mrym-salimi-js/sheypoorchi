import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import NewAd from './pages/NewAd'
import { adsCategoriesList } from './services/adsCategoriesList'
import { useEffect } from 'react'
import { adsLocationsList } from './services/adsLocationsList'
import Single from './pages/Single'


function App() {

  useEffect(() => {
    const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
    const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

    !cats && localStorage.setItem('ads_categories_list', JSON.stringify(adsCategoriesList))
    !locs && localStorage.setItem('ads_locations_list', JSON.stringify(adsLocationsList))

  }, [])


  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false
        }
      }
    })

 
  return (


    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/s/iran" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/s/iran?cities=:location' element={<Home />} />
          <Route path='/s/iran/:categories?cities=:locations' element={<Home />} />
          <Route path='/s/iran/:categories' element={<Home />} />
          <Route path='/newAd' element={<NewAd />} />
          <Route path='/:id/:title' element={<Single />} />
          {/* <Route path='*' element={<Home />} /> */}

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
