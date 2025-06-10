import Link from 'next/link'
import { LoaderCircle } from 'lucide-react'

const variantStyles = {
  solid: {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  },
  outline: {
    primary: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    secondary: "border border-gray-600 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
    danger: "border border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500",
  },
  icon: {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600",
    secondary: "bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600",
    danger: "bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600",
  }
}

const baseStyles = {
  solid: "px-4 py-2 font-semibold",
  outline: "px-4 py-2 font-medium",
  icon: "p-2"
}

const pillStyle = {
  solid: "rounded-md ",
  outline: "rounded-lg",
  icon: "rounded-full"
}

const commonStyle = "inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 text-sm shadow-sm"

export type ButtonProps = {
  variant?: keyof typeof variantStyles
  color?: keyof typeof variantStyles.solid
  isLoading?: boolean
  pill?: boolean
  className?: string
  children?: React.ReactNode
} & (
    | React.ComponentPropsWithoutRef<typeof Link>
    | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  )

export function Button({ variant = "solid", color = "primary", className = "", children, isLoading = false, pill, ...props }: ButtonProps) {
  const buttonStyles = `${variantStyles[variant][color]} ${baseStyles[variant]} ${commonStyle} ${className} ${pill ? "rounded-full" : pillStyle[variant]}`

  const content = isLoading ? <LoaderCircle className="h-5 w-5" /> : (children ?? "Save")

  if (typeof props.href === 'undefined') {
    return (
      <button className={buttonStyles} disabled={isLoading} {...props}>
        {content}
      </button>
    )
  }

  return (
    <Link className={buttonStyles} {...props}>
      {content}
    </Link>
  )
}