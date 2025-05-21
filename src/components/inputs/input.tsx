import { InputHTMLAttributes, ReactNode } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
}

export default function Input({ label, icon, ...inputProps }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          {...inputProps}
          className={`w-full border rounded-md px-4 py-2 ${
            icon ? 'pl-10' : ''
          } focus:outline-none bg-white  border-gray-300 text-gray-900  focus:ring-2 focus:ring-blue-500 ${
            inputProps.className ?? ''
          }`}
          required
        />
      </div>
    </div>
  )
}
