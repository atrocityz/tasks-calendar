import { TASKS_IMPORTANTS } from '@/data/task.data.ts'

export function TaskTags() {
  return (
    <div className="flex items-center justify-between gap-2 flex-wrap">
      {TASKS_IMPORTANTS.map((importance) => (
        <div
          key={importance.label}
          className="flex items-center gap-1 text-[14px]"
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: importance.color }}
          ></span>
          {importance.label} важность
        </div>
      ))}
    </div>
  )
}
