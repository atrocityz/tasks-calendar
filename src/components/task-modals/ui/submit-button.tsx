import { Button } from '@/components/ui/button.tsx'
import type { ReactNode } from 'react'

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <Button type="submit" className="self-center mt-auto" variant="outline">
      {children}
    </Button>
  )
}
