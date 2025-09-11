import type { ReactNode } from 'react'

export function Error({ children }: { children?: ReactNode }) {
  return <p className="text-red-400 text-[14px]">{children}</p>
}
