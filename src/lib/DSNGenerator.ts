import { DSNForm } from '@/lib/Form';

function generateDSN(form: DSNForm, showPort: boolean, showUserPass: boolean) {
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

export default generateDSN;
