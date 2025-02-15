'use client';

import { useEffect, useState } from 'react';

export default function FormInput({
  type,
  name,
  className,
  required = false,
  label = 'Copy',
  otherAttrs = {},
  cleanValue = false,
  initialValue = '',
}: {
  type: string;
  name: string;
  className?: string;
  required?: boolean;
  label?: string;
  otherAttrs?: any;
  cleanValue: boolean;
  initialValue?: string;
}) {
  const [value, setValue] = useState('');

  const domAttrs = otherAttrs;

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (cleanValue) {
      setValue('');
      if (initialValue) {
        setValue(initialValue);
      }
    }
  }, [cleanValue, initialValue]);

  if (initialValue && value === '') {
    setValue(initialValue);
  }

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`${type !== 'checkbox' ? 'block' : ''} text-sm font-medium text-gray-700`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className={`${type !== 'checkbox' ? 'block w-full' : 'order-first mr-3'} rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
        value={value}
        onChange={handleChange}
        {...domAttrs}
      />
    </div>
  );
}
