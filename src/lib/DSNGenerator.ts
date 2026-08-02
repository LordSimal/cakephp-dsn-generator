import { DSNData, FormStateType } from '@/types'

export function generateDSN(
  data: DSNData,
  showPort: boolean,
  showUserPass: boolean,
): string {
  const params: string[] = []

  if (data.schema) {
    params.push(`schema=${data.schema}`)
  }
  if (data.timezone) {
    params.push(`timezone=${data.timezone}`)
  }
  if (data.init) {
    params.push(`init[]=${data.init}`)
  }
  if (data.enable_querylogging) {
    params.push('log=true')
  }

  let result = `${data.dbms}://`

  // A DSN is a URL, so credentials must be percent-encoded, otherwise
  // characters like @ : / # ? break parsing. Username may be present
  // without a password (e.g. a local root user).
  if (showUserPass && data.username) {
    result += encodeURIComponent(data.username)
    if (data.password) {
      result += `:${encodeURIComponent(data.password)}`
    }
    result += '@'
  }

  result += data.server

  if (showPort && data.port) {
    result += `:${data.port}`
  }

  result += `/${data.database}`

  if (params.length) {
    result += `?${params.join('&')}`
  }

  return result
}

export function getFormVisibility(dbms: string): FormStateType {
  switch (dbms) {
    case 'sqlite':
      return {
        showUserPass: false,
        port: null,
        showPort: false,
        showIsPostgres: false,
        showOptional: true,
      }
    case 'mysql':
      return {
        showUserPass: true,
        port: 3306,
        showPort: true,
        showIsPostgres: false,
        showOptional: true,
      }
    case 'postgres':
      return {
        showUserPass: true,
        port: 5432,
        showPort: true,
        showIsPostgres: true,
        showOptional: true,
      }
    case 'sqlserver':
      return {
        showUserPass: true,
        port: 1433,
        showPort: true,
        showIsPostgres: false,
        showOptional: true,
      }
    case 'redis':
      return {
        showUserPass: true,
        port: 6379,
        showPort: true,
        showIsPostgres: false,
        showOptional: false,
      }
    default:
      throw new Error('Invalid DBMS')
  }
}
