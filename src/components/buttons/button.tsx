import React from 'react'

interface Props {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  disabled?: boolean
}

export default function Button({ children, type = 'button', className = '', disabled = false }: Props) {
  return (
    <button
      type={type}
      className={
        `w-full py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ` +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}
