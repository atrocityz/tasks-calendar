import { Layout } from '@/components/ui/layout.tsx'
import { Header } from '@/components/ui/header.tsx'
import { Calendar } from '@/components/calendar/calendar.tsx'

export function CalendarPage() {
  return (
    <Layout header={<Header />}>
      <Calendar />
    </Layout>
  )
}
