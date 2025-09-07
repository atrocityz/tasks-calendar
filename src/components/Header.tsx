import { Calendar } from 'lucide-react'
import { ThemeToggler } from '@/components/theme/ThemeToggler'

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8 border-b border-sidebar-border">
      <a
        href="/"
        className="relative after:absolute after:inset-0 after:w-11 after:h-11 after:left-1/2 after:top-1/2 after:-translate-1/2 hover:text-muted-foreground transition-colors"
        aria-label="Главная"
        title="Главная"
      >
        <Calendar />
      </a>
      <ThemeToggler />
    </header>
  )
}
