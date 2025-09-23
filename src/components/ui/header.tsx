import { Calendar } from 'lucide-react'
import { ThemeToggler } from '@/components/theme/theme-toggler.tsx'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/routes.ts'
import { cn } from '@/lib/utils.ts'

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="grid grid-cols-3 py-4 px-2 md:px-8 border-b border-sidebar-border items-center">
      <Link
        to={ROUTES.HOME}
        className="justify-self-start hover:text-muted-foreground transition-colors"
        aria-label="Главная"
        title="Главная"
      >
        <Calendar width={32} height={32} />
        <h1 className="font-normal text-[18px] sr-only">Календарь задач</h1>
      </Link>
      <nav className="flex items-center gap-5 place-self-center text-[18px]">
        <Link
          to={ROUTES.HOME}
          className={cn('hover:underline', {
            'pointer-events-none text-ring': pathname === ROUTES.HOME,
          })}
        >
          Календарь
        </Link>
        <Link
          to={ROUTES.TASKS}
          className={cn('hover:underline', {
            'pointer-events-none text-ring': pathname === ROUTES.TASKS,
          })}
        >
          Задачи
        </Link>
      </nav>
      <div className="place-self-end">
        <ThemeToggler />
      </div>
    </header>
  )
}
