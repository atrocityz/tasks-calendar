import { Layout } from './layout'
import { Header } from './header'
import { Calendar } from '@/components/calendar/calendar'
import { Toaster } from '@/components/ui/sonner'

export function App() {
  return (
    <Layout header={<Header />}>
      <Toaster />
      <Calendar />
    </Layout>
  )
}
