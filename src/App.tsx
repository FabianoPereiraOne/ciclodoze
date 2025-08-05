import { BrowserRouter, Route, Routes } from "react-router-dom"
import Middleware from "./middleware"
import { Config } from "./pages/Admin/Config"
import { Dash } from "./pages/Dash"
import { Forgot } from "./pages/Forgot"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { FullAccess, Role } from "./schemas/validations/settings"

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

        <Route
          path='/dash/admin/gerenciar'
          element={<Middleware element={<Config />} roles={[Role.ADMIN]} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
