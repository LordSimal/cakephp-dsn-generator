'use client'

import { ChangeEventHandler } from 'react'

export default function FormSelect({
  name,
  options,
  className,
  required = false,
  label = 'My Label',
  otherAttrs = {},
  onChange,
  value = '',
}: {
  name: string
  options: Record<string, string>
  className?: string
  required?: boolean
  label?: string
  otherAttrs?: object
  onChange: ChangeEventHandler<HTMLSelectElement>
  value?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm ring-red-500 focus:border-red-500 focus:outline-none sm:text-sm"
        onChange={onChange}
        value={value}
        {...otherAttrs}
      >
        {Object.entries(options).map(([key, optionLabel]) => (
          <option key={key} value={key}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
