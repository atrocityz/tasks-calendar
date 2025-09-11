import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import type { ReactNode } from 'react'

export function Layout({
  closeButton,
  tasks,
  header,
  form,
}: {
  closeButton: ReactNode
  header: ReactNode
  form: ReactNode
  tasks: ReactNode
}) {
  return (
    <div className="w-[30%] min-w-[360px] relative top-[5%] left-1/2 max-h-[740px] -translate-x-1/2 border border-sidebar-border rounded-2xl bg-background p-6 flex flex-col gap-6">
      {closeButton}
      {header}
      {form}
      <Drawer direction="right">
        <DrawerTrigger>
          <Button>Список задач</Button>
        </DrawerTrigger>
        <DrawerContent className="p-3">
          <ul className="grid gap-2 overflow-y-auto py-2">{tasks}</ul>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
