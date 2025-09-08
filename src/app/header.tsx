import { Calendar } from 'lucide-react'
import { ThemeToggler } from '@/components/theme/theme-toggler'

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-2 md:px-8 border-b border-sidebar-border">
      <a
        href="/"
        className="flex items-center gap-2 hover:text-muted-foreground transition-colors"
        aria-label="Главная"
        title="Главная"
      >
        <Calendar />
        <h1 className="font-normal md:text-xl">Календарь задач</h1>
      </a>
      <ThemeToggler />
    </header>
  )
}
