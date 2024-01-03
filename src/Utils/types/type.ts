import store from '../../Store'


export interface ISnackbar {
  severity: SnackbarSeverity,
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
  id?: number;
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

export interface ICompliance {
  _id?: string;
  id?: string;
  orgId?: string;
  isActive?: boolean;
  type?: string;
  createdBy?: string;
  title: string;
  description: string;
  version?: string;
  stepCount: number;
  isParallelApproval: boolean;
  stepNames: Array<IStepName>
  isExternalSubmission: boolean;
  approvalRulesId?: string | null;
  rules?: any; // You may replace 'any' with a more specific type if you know the structure
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface IStepName {
  values: any[] | undefined;
  name: string,
  position: number
}

export interface IQuestion {
  _id?: string;
  id: string;
  orgId?: string;
  description?: string;
  isActive?: boolean;
  type?: string; // You might want to replace this with a more specific type
  createdBy?: string;
  title?: string;
  questionType?: QuestionType;
  answerOptions?: Array<string> | string | null;
  dependent?: any;
  complianceId?: string;
  stepNumber?: number;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
  isFullWidth?: boolean;
  __v?: number;
}

export type QuestionType = 'text' | 'dropdown' | 'yesno' | 'bigtext' | 'multiselect' 
export type SnackbarSeverity = 'success' | 'error' | 'warning'
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;