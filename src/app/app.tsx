import { Layout } from './layout'
import { Header } from './header'
import { TaskModal } from '@/components/task-modal'
import { useTasksStore } from '@/app/use-tasks-store'
import { Calendar } from '@/components/calendar/calendar'
import { useEffect } from 'react'

export function App() {
  const { isModalOpen, openModal, getTasksByDate } = useTasksStore()

  useEffect(() => {
    if (isModalOpen) {
      document.documentElement.classList.add('is-lock')
      return () => {
        document.documentElement.classList.remove('is-lock')
      }
    }
  }, [isModalOpen])

  return (
    <Layout header={<Header />}>
      <Calendar openModal={openModal} getTasksByDate={getTasksByDate} />
      {isModalOpen && <TaskModal />}
    </Layout>
  )
}
