import store from '../../Store'


export interface Snackbar {
  severity: Snackbar_Severity,
  message: string | null,
  duration?: number,
}

export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface Department {
  _id?: string;
  name?: string;
  id?: string;
  orgId?: string;
  type?: string;
  isActive?: string;
  primaryEmail?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Group {
  _id?: string;
  name?: string;
  id?: number;
  orgId?: string;
  type?: string;
  departmentId?: string;
  primaryEmail?: string; // Assuming primaryEmail is optional based on the provided response
  __v?: number;
}

export default Group;


export type Snackbar_Severity = 'success' | 'error' | 'warning'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;