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
  aditionalApprovers: Array<any>
  mandatoryApprovers: Array<any>
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
  expireAt: string
  groupName: string
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

export type TActionProtocol = 'AMENDMENT' | 'CONREV' | 'REVISE' | 'EXPIRE' | 'CLOSURE'

export const ApprovalAction: Record<TActionProtocol, string> = {
  AMENDMENT: 'Amendment',
  REVISE: 'Revise',
  EXPIRE: 'Expire',
  CLOSURE: 'Closure',
  CONREV: 'Continuous Review',
}

export interface ISnapshot {
  _id: string
  protocol_id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface FieldOption {
  value: string
  label: string
}

export interface FieldConfig {
  id: string
  label: string
  type: 'text' | 'number' | 'date' | 'select' | 'attachment' | 'dynamicTable' | 'dynamicQuestions'
  options?: FieldOption[]
  multiline?: boolean
  rows?: number
  xs: number
  md?: number
}

export interface FormConfig {
  [key: string]: FieldConfig[]
}

export const moreInfoFormConfigs: FormConfig = {
  qa: [
    { id: 'title', label: 'Title', type: 'text', xs: 12 },
    { id: 'answer', label: 'Answer', type: 'text', xs: 12, multiline: true, rows: 4 },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  consent: [
    { id: 'title', label: 'Title', type: 'text', xs: 12 },
    { id: 'description', label: 'Description', type: 'text', xs: 12, multiline: true, rows: 4 },
    { id: 'patientName', label: 'Patient Name', type: 'text', xs: 12, md: 6 },
    { id: 'age', label: 'Age', type: 'number', xs: 12, md: 6 },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      xs: 12,
      md: 6,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ],
    },
    { id: 'dateOfBirth', label: 'Date of Birth', type: 'date', xs: 12, md: 6 },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  evaluation: [
    { id: 'title', label: 'Title', type: 'text', xs: 12 },
    { id: 'criteria', label: 'Criteria', type: 'text', xs: 12 },
    { id: 'overallScore', label: 'Overall Score', type: 'number', xs: 12, md: 6 },
    { id: 'comments', label: 'Comments', type: 'text', xs: 12 },
    { id: 'evaluatorName', label: 'Evaluator Name', type: 'text', xs: 12, md: 6 },
    { id: 'evaluationDate', label: 'Evaluation Date', type: 'date', xs: 12, md: 6 },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  feedback: [
    { id: 'title', label: 'Feedback Title', type: 'text', xs: 12 },
    { id: 'description', label: 'Description', type: 'text', xs: 12 },
    { id: 'rating', label: 'Rating', type: 'number', xs: 12, md: 6 },
    { id: 'openEndedResponse', label: 'Open-Ended Response', type: 'text', xs: 12 },
    { id: 'submitDate', label: 'Submit Date', type: 'date', xs: 12, md: 6 },
  ],
  // Table form might require a different handling approach since it's dynamic.
  receipt: [
    { id: 'title', label: 'Receipt Title', type: 'text', xs: 12 },
    { id: 'date', label: 'Date', type: 'date', xs: 12, md: 6 },
    { id: 'amount', label: 'Amount', type: 'number', xs: 12, md: 6 },
    { id: 'receivedFrom', label: 'Received From', type: 'text', xs: 12 },
    { id: 'for', label: 'For', type: 'text', xs: 12 },
    {
      id: 'paymentMethod',
      label: 'Payment Method',
      type: 'select',
      xs: 12,
      md: 6,
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'creditCard', label: 'Credit Card' },
        { value: 'online', label: 'Online' },
      ],
    },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  dataCollection: [
    { id: 'title', label: 'Collection Title', type: 'text', xs: 12 },
    { id: 'dataCollectionMethod', label: 'Data Collection Method', type: 'text', xs: 12 },
    { id: 'dataType', label: 'Data Type', type: 'text', xs: 12, md: 6 },
    { id: 'sampleSize', label: 'Sample Size', type: 'number', xs: 12, md: 6 },
    { id: 'collectionStartDate', label: 'Collection Start Date', type: 'date', xs: 12, md: 6 },
    { id: 'collectionEndDate', label: 'Collection End Date', type: 'date', xs: 12, md: 6 },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  survey: [
    { id: 'title', label: 'Survey Title', type: 'text', xs: 12 },
    { id: 'description', label: 'Description', type: 'text', xs: 12 },
    // Survey questions could be dynamic, handled differently
    { id: 'targetDemographic', label: 'Target Demographic', type: 'text', xs: 12 },
    { id: 'surveyEndDate', label: 'Survey End Date', type: 'date', xs: 12, md: 6 },
    { id: 'attachment', label: 'Attachment', type: 'attachment', xs: 12 },
  ],
  labNotes: [
    { id: 'date', label: 'Date', type: 'date', xs: 12, md: 6 },
    { id: 'notes', label: 'Notes', type: 'text', xs: 12 },
    { id: 'tags', label: 'Tags', type: 'text', xs: 12 }, // Could be implemented as select with multiple options
    { id: 'attachments', label: 'Attachments', type: 'attachment', xs: 12 },
  ],
  sampleTracking: [
    { id: 'sampleID', label: 'Sample ID', type: 'text', xs: 12, md: 6 },
    { id: 'collectionDate', label: 'Collection Date', type: 'date', xs: 12, md: 6 },
    { id: 'sampleType', label: 'Sample Type', type: 'text', xs: 12, md: 6 },
    { id: 'storageLocation', label: 'Storage Location', type: 'text', xs: 12, md: 6 },
    { id: 'associatedProject', label: 'Associated Project', type: 'text', xs: 12 },
    { id: 'attachments', label: 'Attachments', type: 'attachment', xs: 12 },
  ],
  // Note: The 'Table' type requires a specialized approach not covered here due to its dynamic nature.
}

export type QuestionType = 'text' | 'dropdown' | 'yesno' | 'bigtext' | 'multiselect' | 'info'
export type SnackbarSeverity = 'success' | 'error' | 'warning'
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
