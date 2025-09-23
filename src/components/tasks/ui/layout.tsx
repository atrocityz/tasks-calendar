import type { ReactNode } from 'react'

export function Layout({
  taskList,
  tags,
  searchField,
  addTaskButton,
}: {
  tags: ReactNode
  searchField: ReactNode
  addTaskButton: ReactNode
  taskList: ReactNode
}) {
  return (
    <div className="max-w-[860px] px-2 mx-auto my-10 grid gap-5">
      {searchField}
      {tags}
      <div className="flex flex-col">
        <div className="self-center mb-3">{addTaskButton}</div>
        {taskList}
      </div>
    </div>
  )
}
