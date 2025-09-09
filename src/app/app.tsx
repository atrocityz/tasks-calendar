import { Layout } from './layout'
import { Header } from './header'
import { Calendar } from '@/components/calendar/calendar'
import { CreateTaskModal } from '@/components/create-task-modal/create-task-modal'

export function App() {
  return (
    <Layout header={<Header />}>
      <Calendar />
      <CreateTaskModal />
    </Layout>
  )
}
