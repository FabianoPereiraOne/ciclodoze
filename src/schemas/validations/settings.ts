export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
  MARKETING: "MARKETING",
  FINANCE: "FINANCE",
  TEACHER: "TEACHER"
}

export const FullAccess = [
  Role.ADMIN,
  Role.MARKETING,
  Role.USER,
  Role.FINANCE,
  Role.TEACHER
]

export const Categories = [
  { id: 1, label: "Saúde", value: "HEALTH" },
  { id: 2, label: "Finanças", value: "FINANCE" },
  { id: 3, label: "Carreira", value: "CAREER" },
  { id: 4, label: "Educação", value: "EDUCATION" },
  { id: 5, label: "Pessoal", value: "PERSONAL" }
]

export const Difficulties = [
  { id: 1, label: "Baixa", value: "LOW" },
  { id: 2, label: "Normal", value: "NORMAL" },
  { id: 3, label: "Alta", value: "HIGH" }
]
