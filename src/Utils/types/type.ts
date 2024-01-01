import store from '../../Store'


export interface ISnackbar {
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

export interface IDepartment {
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

export interface IGroup {
  _id?: string;
  name?: string;
  id: number;
  orgId?: string;
  type?: string;
  departmentId?: string;
  primaryEmail?: string; // Assuming primaryEmail is optional based on the provided response
  __v?: number;
}

export interface IConfirmationState<T extends any[]> {
  isOpen: boolean;
  title?: string;
  args?: T | null;
}

export interface IMember {
  _id: string;
  orgId: string;
  userId: string;
  groupId: string;
  type: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Snackbar_Severity = 'success' | 'error' | 'warning'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;