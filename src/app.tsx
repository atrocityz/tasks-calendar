import { Toaster } from '@/components/ui/sonner.tsx'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { CalendarPage } from '@/pages/calendar.page.tsx'
import { TasksPage } from '@/pages/tasks.page.tsx'

export function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  )
}
