'use client'

import { ChangeEvent, useState } from 'react'
import Conditional from '@/components/Generics/Conditional'
import Copy from '@/components/Generics/Copy'
import FormInput from '@/components/Generics/FormInput'
import FormSelect from '@/components/Generics/FormSelect'
import Optional from '@/components/Optional'
import { generateDSN, getFormVisibility } from '@/lib/DSNGenerator'
import { DSNData } from '@/types'

const initialValues: DSNData = {
  dbms: 'mysql',
  server: 'localhost',
  port: '3306',
  username: '',
  password: '',
  database: '',
  schema: '',
  timezone: '',
  init: '',
  enable_querylogging: false,
}

export default function DSNForm() {
  const [values, setValues] = useState<DSNData>(initialValues)
  const [visibility, setVisibility] = useState(() => getFormVisibility('mysql'))
  const [dsnString, setDsnString] = useState('')

  const handleChange = (name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onDbmsSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const dbms = e.target.value
    const formVisibility = getFormVisibility(dbms)
    setVisibility(formVisibility)
    // Reset all fields, keeping only the new connection type and its default port.
    setValues({
      ...initialValues,
      dbms,
      port: formVisibility.port?.toString() ?? '',
    })
    setDsnString('')
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDsnString(
      generateDSN(values, visibility.showPort, visibility.showUserPass),
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="overflow-hidden rounded bg-white px-4 py-5 shadow sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <FormSelect
            name="dbms"
            label="Connection Type"
            className="col-span-6"
            value={values.dbms}
            options={{
              mysql: 'MySQL/MariaDB',
              postgres: 'PostgreSQL',
              sqlite: 'SQLite',
              sqlserver: 'MS SQL/SQL Server',
              redis: 'Redis',
            }}
            onChange={onDbmsSelect}
          />

          <FormInput
            type="text"
            name="server"
            className={`${visibility.showPort ? 'col-span-4' : 'col-span-6'}`}
            label="Server"
            value={values.server}
            onChange={handleChange}
          />
          <Conditional showWhen={visibility.showPort}>
            <FormInput
              type="number"
              name="port"
              className="col-span-2"
              label="Port"
              otherAttrs={{ min: 0, step: 1 }}
              value={values.port}
              onChange={handleChange}
            />
          </Conditional>

          <Conditional showWhen={visibility.showUserPass}>
            <FormInput
              type="text"
              name="username"
              className="col-span-6"
              label="Username"
              value={values.username}
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              className="col-span-6"
              label="Password"
              value={values.password}
              onChange={handleChange}
            />
          </Conditional>

          <FormInput
            type="text"
            name="database"
            className="col-span-6"
            label="Database"
            required={true}
            value={values.database}
            onChange={handleChange}
          />
        </div>

        <Conditional showWhen={visibility.showOptional}>
          <Optional
            isPostgres={visibility.showIsPostgres}
            values={values}
            onChange={handleChange}
          />
        </Conditional>

        <Conditional showWhen={dsnString !== ''}>
          <Copy text={dsnString}></Copy>
        </Conditional>

        <div className="bg-gray-50 py-3 text-center">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm ring-2 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Generate
          </button>
        </div>
      </div>
    </form>
  )
}
