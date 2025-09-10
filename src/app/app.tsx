import { Layout } from './layout'
import { Header } from './header'
import { Calendar } from '@/components/calendar/calendar'

export function App() {
  return (
    <Layout header={<Header />}>
      <Calendar />
    </Layout>
  )
}
