import type { ReactNode } from 'react'

export function Layout({
  borderColor,
  actions,
  header,
  description,
}: {
  borderColor?: string
  header: ReactNode
  description: ReactNode
  actions: ReactNode
}) {
  return (
    <li
      className="grid bg-transparent border border-sidebar-border p-2 md:p-4 rounded gap-2"
      style={{
        borderColor: borderColor,
      }}
    >
      <div className="flex justify-between items-start gap-2">
        {header}
        {actions}
      </div>
      {description}
    </li>
  )
}
