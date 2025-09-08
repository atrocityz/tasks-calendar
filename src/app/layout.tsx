import type { ReactNode } from 'react'

export function Layout({
  header,
  footer,
  children,
}: {
  header?: ReactNode
  children?: ReactNode
  footer?: ReactNode
}) {
  return (
    <>
      {header}
      {children}
      {footer}
    </>
  )
}
