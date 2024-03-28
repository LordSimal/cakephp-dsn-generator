'use client';

import React, { ChangeEventHandler } from 'react';

export default function FormSelect({
  name,
  options,
  className,
  required = false,
  label = 'My Label',
  otherAttrs = {},
  onChange = null,
  value = null,
}: {
  name: string;
  options: object;
  className?: string;
  required?: boolean;
  label?: string;
  otherAttrs?: object;
  onChange?: ChangeEventHandler | null;
  value?: any;
}) {
  if (!onChange) {
    // eslint-disable-next-line no-param-reassign,func-names
    onChange = function () {
      return true;
    };
  }

  return (
    <div className={className}>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <select
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
        onChange={onChange}
        defaultValue={value}
        {...otherAttrs}
      >
        {Object.keys(options).map((key) => (
          <option key={key} value={key}>
            {/* @ts-ignore */}
            {options[key]}
          </option>
        ))}
      </select>
    </div>
  );
}
