'use client'

export default function FormInput({type, name, className, required=false, label='Copy', otherAttrs={}}: {
  type: string,
  name: string,
  className?: string,
  required?: boolean,
  label?: string,
  otherAttrs?: object
}) {

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
        {...otherAttrs}
      />
    </div>
  )

}