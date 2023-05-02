import { create } from 'zustand'

export const useSimpleDepositForm = create((set) => ({
  years: '',
  months: '',
  initialDeposit: '',
  interest: '',
  capitalizationEnabled: false,
  capitalizationFrequency: 1,
  interestEarned: 0,
  finalValue: 0,
  calculated: false,
  effectiveRate: 0,
  monthlyTotal: 0,
  setYears: (newYear) => set({years: newYear }),
  setMonths: (newMonth) => set({ months: newMonth }),
  setInitialDeposit: (newInitialDeposit) => set({ initialDeposit: newInitialDeposit }),
  setInterest: (newInterest) => set({ interest: newInterest }),
  setCapitalizationEnabled: () => set((state) => ({ capitalizationEnabled: !state.capitalizationEnabled })),
  setCapitalizationFrequency: (newFrequency) => set({ capitalizationFrequency: newFrequency }),
  setInterestEarned: (newInterestEarned) => set({ interestEarned: newInterestEarned }),
  setFinalValue: (newFinalValue) => set({ finalValue: newFinalValue }),
  setCalculated: (newCalculatedStatus) => set({ calculated: newCalculatedStatus }),
  setEffectiveRate: (newEffectiveRate) => set({ effectiveRate: newEffectiveRate }),
  setMonthlyTotal: (newMonthlyTotal) => set({ monthlyTotal: newMonthlyTotal })
}))

export const useTheme = create((set) => ({
  darkThemeBool: localStorage.theme === 'dark' ||  window.matchMedia("(prefers-color-scheme: dark)").matches,
  setDarkThemeBool: (newDarkStatus) => {
    set({ darkThemeBool: newDarkStatus })
    localStorage.theme = newDarkStatus ? 'dark' : 'light'
  }
}))
  
