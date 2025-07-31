import { BrowserRouter, Route, Routes } from "react-router-dom"
import Middleware from "./middleware"
import { Dash } from "./pages/Dash"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { FullAccess } from "./schemas/validations/settings"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Middleware element={<Login />} />} />
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
