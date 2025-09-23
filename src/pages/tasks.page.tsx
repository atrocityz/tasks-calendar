import { Layout } from '@/components/ui/layout.tsx'
import { Header } from '@/components/ui/header.tsx'
import { Tasks } from '@/components/tasks/tasks.tsx'

export function TasksPage() {
  return (
    <Layout header={<Header />}>
      <Tasks />
    </Layout>
  )
}
