'use client'

export default function FormInput({
  type,
  name,
  className,
  required = false,
  label = '',
  otherAttrs = {},
  value,
  onChange,
}: {
  type: string
  name: string
  className?: string
  required?: boolean
  label?: string
  otherAttrs?: Record<string, unknown>
  value: string | boolean
  onChange: (name: string, value: string | boolean) => void
}) {
  const isCheckbox = type === 'checkbox'

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`${!isCheckbox ? 'block' : ''} text-sm font-medium text-gray-700`}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        // Avoid offering to save the throwaway password in the browser.
        autoComplete={type === 'password' ? 'new-password' : name}
        required={required}
        className={`${!isCheckbox ? 'block w-full' : 'order-first mr-3'} rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm`}
        {...(isCheckbox
          ? {
              checked: value as boolean,
              onChange: (e) => onChange(name, e.target.checked),
            }
          : {
              value: value as string,
              onChange: (e) => onChange(name, e.target.value),
            })}
        {...otherAttrs}
      />
    </div>
  )
}
