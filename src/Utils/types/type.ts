import store from '../../Store'

export type Snackbar_Severity = 'success' | 'error' | 'warning'

export interface Snackbar {
  severity: Snackbar_Severity,
  message: string | null,
  duration?: number,
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;