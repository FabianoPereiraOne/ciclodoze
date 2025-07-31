import { BrowserRouter, Route, Routes } from "react-router-dom"
import Middleware from "./middleware"
import { Dash } from "./pages/Dash"
import { Forgot } from "./pages/Forgot"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { FullAccess } from "./schemas/validations/settings"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Middleware element={<Login />} />} />
        <Route
          path='/esqueceu-senha'
          element={<Middleware element={<Forgot />} />}
        />
        <Route
          path='/criar-conta'
          element={<Middleware element={<Register />} />}
        />
        <Route
          path='/dash'
          element={<Middleware element={<Dash />} roles={FullAccess} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
