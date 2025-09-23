import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input.tsx'

export function SearchField({
  onChange,
  value,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="grid gap-2">
      <Label className="sr-only" htmlFor="task-search">
        Поиск задачи
      </Label>
      <Input
        id="task-search"
        value={value}
        placeholder="Название задачи"
        className="placeholder:opacity-50 h-10"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
