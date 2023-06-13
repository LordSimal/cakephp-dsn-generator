'use client'

import React, {ChangeEventHandler} from "react";

export default function FormSelect({name, options, className, required=false, label='My Label', otherAttrs={}, onChange=null, value=null}: {
  name: string,
  options: object,
  className?: string,
  required?: boolean,
  label?: string,
  otherAttrs?: object,
  onChange?: ChangeEventHandler|null,
  value?: any
}) {

  if (!onChange) {
    onChange = function () {
      return true;
    }
  }

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
        onChange={onChange}
        value={value}
        {...otherAttrs}
      >
        {Object.keys(options).map(key => (
          // @ts-ignore
          <option key={key} value={key}>{options[key]}</option>
        ))}
      </select>
    </div>
  )

}