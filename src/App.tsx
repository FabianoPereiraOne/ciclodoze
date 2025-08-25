import { BrowserRouter, Route, Routes } from "react-router-dom"
import Middleware from "./middleware"
import { Config } from "./pages/Admin/Config"
import { Dashboard } from "./pages/Dashboard"
import { Forgot } from "./pages/Forgot"
import { Login } from "./pages/Login"
import Planning from "./pages/Planning"
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
          path='/dashboard'
          element={<Middleware element={<Dashboard />} roles={FullAccess} />}
        />
        <Route
          path='/dashboard/planejamento/metas'
          element={<Middleware element={<Planning />} roles={FullAccess} />}
        />

        <Route
          path='/dashboard/admin/gerenciar'
          element={<Middleware element={<Config />} roles={[Role.ADMIN]} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
