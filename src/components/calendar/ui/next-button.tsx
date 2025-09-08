import { ArrowRight } from 'lucide-react'

export function NextButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="hover:text-muted-foreground transition-colors relative after:absolute after:inset-0 after:w-11 after:h-11 after:left-1/2 after:top-1/2 after:-translate-1/2"
      aria-label="Перейти на следующий месяц"
      onClick={onClick}
    >
      <ArrowRight size={36} />
    </button>
  )
}
