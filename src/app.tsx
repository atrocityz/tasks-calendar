import { Toaster } from '@/components/ui/sonner.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CalendarPage } from '@/pages/calendar.page.tsx'
import { TasksPage } from '@/pages/tasks.page.tsx'

export function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  )
}
