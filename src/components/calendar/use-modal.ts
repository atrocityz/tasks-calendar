import { useCallback, useState } from 'react'

export function useModal() {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => setIsOpen(false), [])

  const openModal = () => setIsOpen(true)

  return {
    isModalOpen: isOpen,
    closeModal,
    openModal,
  }
}
