import { useCallback, useEffect } from 'react'

export function useModalEffects(isOpen: boolean, closeModal: () => void) {
  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal],
  )

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [onKeyUp])

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('is-lock')
      return () => {
        document.documentElement.classList.remove('is-lock')
      }
    }
  }, [isOpen])

  return {
    handleOverlayClick,
  }
}
