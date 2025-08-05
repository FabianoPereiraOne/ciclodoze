import {
  BookOpen,
  CalendarCheck,
  LayoutDashboard,
  Settings
} from "lucide-react"

export const pagesSidebar = [
  {
    title: "Atalhos",
    url: "#",
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: "Inicio",
        url: "/dash"
      }
    ]
  },
  {
    title: "Planejamento",
    url: "#",
    icon: CalendarCheck,
    items: [
      {
        title: "Tarefas",
        url: "/dash/planejamento/tarefas"
      },
      {
        title: "Metas",
        url: "/dash/planejamento/metas"
      },
      {
        title: "Ciclo",
        url: "/dash/planejamento/ciclo"
      }
    ]
  },
  {
    title: "Estudos",
    url: "#",
    icon: BookOpen,
    items: [
      {
        title: "Visão geral",
        url: "/dash/estudos/visao-geral"
      }
    ]
  }
]

export const pagesAdminSidebar = [
  {
    title: "Configurações",
    url: "/dash/admin/gerenciar",
    icon: Settings
  }
]
