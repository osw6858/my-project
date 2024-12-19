import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { createSelectors } from '@/store/creatSelectors'

interface DateStore {
  date: string
  setDate: (content: string) => void
}

const dateStore = create<DateStore>()(
  persist(
    (set) => ({
      date: '',
      setDate: (date) => set(() => ({ date })),
    }),
    {
      name: 'SD',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export const useDateStore = createSelectors(dateStore)
