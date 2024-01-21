'use client';

import { useEffect, useState } from 'react';

export default function FormInput({
  type, name, className, required = false, label = 'Copy', otherAttrs = {}, cleanValue = false,
}: {
  type: string,
  name: string,
  className?: string,
  required?: boolean,
  label?: string,
  otherAttrs?: any,
  cleanValue: boolean
}) {
  const [value, setValue] = useState('');

  const domAttrs = otherAttrs;

  /**
   * @param event
   */
  const handleChange = (event: any) => {
    if (event.target.value !== '') {
      setValue(event.target.value);
    } else if (otherAttrs.initialValue) {
      setValue(otherAttrs.initialValue);
    }
  };

  useEffect(() => {
    if (cleanValue) {
      setValue('');
    }
    if (domAttrs.initialValue && cleanValue) {
      setValue(otherAttrs.initialValue);
    }
  }, [cleanValue, domAttrs, otherAttrs]);

  // Remove invalid HTML attributes
  if (domAttrs.initialValue && value === '') {
    setValue(otherAttrs.initialValue);
    delete domAttrs.initialValue;
  }

  return (
    <div className={className}>
      <label htmlFor={name} className={`${type !== 'checkbox' ? 'block' : ''} text-sm font-medium text-gray-700`}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className={`${type !== 'checkbox' ? 'block w-full' : 'mr-3 order-first'} rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
        value={value}
        onChange={handleChange}
        {...domAttrs}
      />
    </div>
  );
}
