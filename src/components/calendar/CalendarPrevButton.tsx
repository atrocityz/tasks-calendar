import { ArrowLeft } from 'lucide-react'

export function CalendarPrevButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="hover:text-muted-foreground transition-colors relative after:absolute after:inset-0 after:w-11 after:h-11 after:left-1/2 after:top-1/2 after:-translate-1/2"
      aria-label="Перейти на прошлый месяц"
      onClick={onClick}
    >
      <ArrowLeft size={36} />
    </button>
  )
}
