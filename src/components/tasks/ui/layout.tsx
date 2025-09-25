import type { ReactNode } from 'react'

export function Layout({
  actions,
  header,
  children,
}: {
  header: ReactNode
  actions: ReactNode
  children: ReactNode
}) {
  return (
    <div className="max-w-[860px] px-2 mx-auto my-10 grid gap-5">
      {header}
      <div className="flex flex-col">
        <div className="self-center mb-3">{actions}</div>
        {children}
      </div>
    </div>
  )
}
