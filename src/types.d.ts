export type DSNData = {
  dbms: string
  server: string
  port: string
  username: string
  password: string
  database: string
  schema: string
  timezone: string
  init: string
  enable_querylogging: boolean
}

export type FormStateType = {
  showUserPass: boolean
  port: number | null
  showPort: boolean
  showIsPostgres: boolean
  showOptional: boolean
}
