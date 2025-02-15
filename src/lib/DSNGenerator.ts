import { DSNFormType, FormStateType } from '@/types';

export function generateDSN(
  form: DSNFormType,
  showPort: boolean,
  showUserPass: boolean
) {
  const params = [];
  const data = {
    dbms: form.dbms.value,
    server: form.server.value,
    port: undefined,
    username: undefined,
    password: undefined,
    database: form.database.value,
    schema: undefined,
    timezone: undefined,
    init: undefined,
  };

  if (showPort && form.port) {
    // @ts-ignore
    data.port = form.port.value;
  }
  if (showUserPass && form.username && form.password) {
    // @ts-ignore
    data.username = form.username.value;
    // @ts-ignore
    data.password = form.password.value;
  }
  if (form.schema?.value) {
    params.push(`schema=${form.schema.value}`);
  }
  if (form.timezone?.value) {
    params.push(`timezone=${form.timezone.value}`);
  }
  if (form.init?.value) {
    params.push(`init[]=${form.init.value}`);
  }
  if (form.enable_querylogging?.checked) {
    params.push('log=true');
  }

  let result = `${data.dbms}://`;
  if (data.username && data.password) {
    result += `${data.username}:${data.password}@`;
  }
  result += `${data.server}`;

  if (data.port) {
    result += `:${data.port}`;
  }
  result += `/${data.database}`;

  if (params.length) {
    result += `?${params.join('&')}`;
  }

  return result;
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
      };
    case 'mysql':
      return {
        showUserPass: true,
        port: 3306,
        showPort: true,
        showIsPostgres: false,
        showOptional: true,
      };
    case 'postgres':
      return {
        showUserPass: true,
        port: 5432,
        showPort: true,
        showIsPostgres: true,
        showOptional: true,
      };
    case 'sqlserver':
      return {
        showUserPass: true,
        port: 1433,
        showPort: true,
        showIsPostgres: false,
        showOptional: true,
      };
    case 'redis':
      return {
        showUserPass: true,
        port: 6379,
        showPort: true,
        showIsPostgres: false,
        showOptional: false,
      };
    default:
      throw new Error('Invalid DBMS');
  }
}
