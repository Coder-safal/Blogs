import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app/store'
import { Provider } from 'react-redux'
// import App from './App.jsx'
import './index.css'
import MainPage from './components/MainPage.jsx';
import About from './components/About.jsx';
import OutletPage from './components/Outlet/OutletPage.jsx';
import Body from './components/Body.jsx';
import {

  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import Contact from './components/Contact.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<OutletPage />}>
      <Route path="" element={<MainPage />} />
      <Route path='signin' element={<Signin />} />
      <Route path='signup' element={<Signup />} />
      <Route path='about' element={<About />} />
      {/* <Route path='home' element={<MainPage />} /> */}
      <Route path='contact' element={<Contact />} />
      <Route path='blogPage' element={<Body />} />
    </Route>
  )

)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
