export type DSNFormType = {
  dbms: HTMLInputElement
  server: HTMLInputElement
  port: HTMLInputElement | undefined
  username: HTMLInputElement | undefined
  password: HTMLInputElement | undefined
  database: HTMLInputElement
  schema: HTMLInputElement | undefined
  timezone: HTMLInputElement | undefined
  init: HTMLInputElement | undefined
  enable_querylogging: HTMLInputElement | undefined
}

export type FormStateType = {
  showUserPass: boolean
  port: number | null
  showPort: boolean
  showIsPostgres: boolean
  showOptional: boolean
}
