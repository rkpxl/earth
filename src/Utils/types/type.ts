import store from '../../Store'

export interface ISnackbar {
  severity: SnackbarSeverity
  message: string | null
  duration?: number
}

export interface APIResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface IDepartment {
  _id?: string
  name?: string
  id?: number
  orgId?: string
  type?: string
  isActive?: string
  primaryEmail?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export interface IGroup {
  _id?: string
  name?: string
  id: number
  orgId?: string
  type?: string
  departmentId?: string
  primaryEmail?: string // Assuming primaryEmail is optional based on the provided response
  __v?: number
}

export interface IConfirmationState<T extends any[]> {
  isOpen: boolean
  title?: string
  args?: T | null
}

export interface IMember {
  _id: string
  orgId: string
  userId: string
  groupId: string
  type: string
  createdBy: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ICompliance {
  complianceType: any
  _id?: string
  id?: number
  orgId?: string
  isActive?: boolean
  type?: string
  createdBy?: string
  title: string
  description: string
  version?: string
  stepCount?: number
  tabCount: number
  isParallelApproval: boolean
  stepNames: Array<IStepName>
  tabNames: Array<ITabName>
  isExternalSubmission: boolean
  approvalRulesId?: string | null
  rules?: any // You may replace 'any' with a more specific type if you know the structure
  createdAt: string
  updatedAt: string
  __v?: number
}

export interface ITabName {
  values?: any[] | undefined
  name: string
  position: number
}
export interface IStepName {
  values: any[] | undefined
  name: string
  position: number
  tabId: number
}

export interface IQuestion {
  _id?: string
  id: string
  orgId?: string
  description?: string
  isActive?: boolean
  isRequired?: boolean
  type?: string // You might want to replace this with a more specific type
  createdBy?: string
  title?: string
  questionType?: QuestionType
  answerOptions?: Array<string> | string | null
  dependent?: any
  complianceId?: string
  stepNumber?: number
  tabNumber?: number
  priority?: string
  createdAt?: string
  updatedAt?: string
  isFullWidth?: boolean
  __v?: number
}

export interface IUser {
  _id: string
  email: string
  type: string
  accessLevel: string
  name: string
  secondaryDepartmentsId?: string[] // Adjust the type accordingly
  orgId: number
  isActive: boolean
  createdBy: string
  createdAt: string // Assuming it's a string in ISO date format
  updatedAt: string // Assuming it's a string in ISO date format
  __v: number
  primaryDepartmentId: number
}

export interface IProtocol {
  _id: string
  piName: string
  pi_id: string
  title: string
  description: string
  status: string
  actionStatus: string
  protocolAction: string
  currentAssignee_id: string
  department: string
  approvers: Array<Object>
  complianceId: number
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IAnswer {
  _id: string
  answer: string
  lastWriterName: string
  complianceId: number
  tabId: number
  question_id: string
  protocol_id: string
  type: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
  previousAnswer: string
}

export interface IComment {
  comment: string
  writerName: string
  complianceId: number
  tabId: number
  question_id: string
  protocol_id: string
  type: string
  createdBy: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IDocument {
  _id: string
  docLink: string
  title: string
  description?: string
  protocol_id: string
  complianceId: number
  tabId: number
  createdBy: string
  providerName: string
  createdAt: string
  updatedAt: string
  __v: number
  previousDocLink: string
  markedUpVersion?: string
}

export interface IApproval {
  _id: string
  orgId: number
  isActive: boolean
  createdBy: string
  approver_id: string
  protocol_id: IProtocol | string // Update the type accordingly, as it seems to be a string in your example
  flow_id: string
  status: string
  createdAt: string
  updatedAt: string
  __v: number
}

export enum IApprovalAction {
  Initial,
  Amendment,
  ConReview,
}

export interface IFlow {
  _id: string
  title: string
  description: string
  piName: string
  actionType: IApprovalAction
  approver_name: string
  status: string
  createdAt: string
  updatedAt: string
}

export type TActionProtocol =
  | 'AMENDMENT'
  | 'CONREV'
  | 'REVISE'
  | 'EXPIRE'
  | 'CLOSURE';

export const ApprovalAction: Record<TActionProtocol, string> = {
  AMENDMENT: 'Amendment',
  REVISE: 'Revise',
  EXPIRE: 'Expire',
  CLOSURE: 'Closure',
  CONREV: 'Continuous Review'
};

export interface ISnapshot {
  _id: string;
  protocol_id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type QuestionType = 'text' | 'dropdown' | 'yesno' | 'bigtext' | 'multiselect' | 'info'
export type SnackbarSeverity = 'success' | 'error' | 'warning'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
