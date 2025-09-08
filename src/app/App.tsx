import { Layout } from './Layout.tsx'
import { Header } from '@/app/Header.tsx'
import { Calendar } from '@/components/calendar/Calendar.tsx'

export function App() {
  return (
    <Layout header={<Header />}>
      <Calendar />
    </Layout>
  )
}
