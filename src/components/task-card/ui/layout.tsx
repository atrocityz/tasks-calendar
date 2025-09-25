import type { ReactNode } from 'react'

export function Layout({
  borderColor,
  actions,
  children,
}: {
  borderColor?: string
  children: ReactNode
  actions: ReactNode
}) {
  return (
    <li
      className="flex justify-between bg-transparent border border-sidebar-border p-2 md:p-4 rounded gap-4"
      style={{
        borderColor: borderColor,
      }}
    >
      {children}
      {actions}
    </li>
  )
}
