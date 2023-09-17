'use client';

import { useEffect, useState } from 'react';

export default function FormInput({
  type, name, className, required = false, label = 'Copy', otherAttrs = {},
}: {
  type: string,
  name: string,
  className?: string,
  required?: boolean,
  label?: string,
  otherAttrs?: any
}) {
  const [value, setValue] = useState('');

  /**
   * Set the default value which is passed down to the component
   */
  useEffect(() => {
    if (otherAttrs.defaultValue) {
      setValue(otherAttrs.defaultValue);
    }
  }, [otherAttrs.defaultValue]);

  /**
   * Thanks React...
   * https://dommagnifi.co/2023-04-05-controlled-and-uncontrolled-inputs/
   * @param event
   */
  const handleChange = (event: any) => {
    if (event.target.value) {
      setValue(event.target.value);
    } else if (otherAttrs.defaultValue) {
      setValue(otherAttrs.defaultValue);
    } else {
      setValue('');
    }
  };

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
        {...otherAttrs}
      />
    </div>
  );
}
