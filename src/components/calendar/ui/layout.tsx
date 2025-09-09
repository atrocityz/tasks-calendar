import type { ReactNode } from 'react'

export function Layout({
  header,
  calendarDays,
  weekdays,
}: {
  header: ReactNode
  weekdays: ReactNode
  calendarDays: ReactNode
}) {
  return (
    <>
      <div className="flex items-center gap-2 justify-between max-w-[600px] mx-auto py-7 px-2">
        {header}
      </div>
      <div className="text-center grid gap-y-8 px-2 pb-7 md:px-8">
        <div className="border border-sidebar-border grid grid-cols-7 rounded-[8px]">
          {weekdays}
          {calendarDays}
        </div>
      </div>
    </>
  )
}
