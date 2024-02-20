import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { boolean } from 'yup'

interface QuestionAnswerPair {
  answer: any
  isError: boolean
  questionTitle: string
  isRequired: boolean
}
interface Tab {
  id?: number
  position?: number
  title?: string
  isError?: boolean
}

interface TabState {
  [id: string]: QuestionAnswerPair
}

interface FormState {
  tabs: Record<number, { tabInfo: Tab; questions: TabState }>
  isAllRequiredFilled: boolean
}

const initialState: FormState = {
  tabs: {},
  isAllRequiredFilled: false,
}

const validateFormHelper = (state: FormState): boolean => {
  let isAllSet = true
  Object.keys(state?.tabs)?.forEach((tabIndex: any) => {
    const tab = state.tabs[tabIndex]
    if (tab && tab?.questions) {
      Object?.keys(tab?.questions)?.forEach((questionId) => {
        const question = tab.questions[questionId]
        if (question.isRequired && (question.answer === null || question.answer === '')) {
          isAllSet = false
        }
      })
    }
  })

  state?.tabs['98']?.questions['mandatoryApprovers']?.answer?.map((ma: any) => {
    if (!ma.approver_id || !ma.approverName) {
      isAllSet = false
    }
  })

  return isAllSet
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initFormState: () => initialState,
    updateTab: (
      state,
      action: PayloadAction<{
        tabIndex: number
        id: string
        answer?: any
        isError?: boolean
        questionTitle?: string
        isRequired?: boolean
      }>,
    ) => {
      const { tabIndex, id, answer, isError, questionTitle, isRequired } = action.payload
      state.tabs = {
        ...state.tabs,
        [tabIndex]: {
          ...state.tabs[tabIndex],
          questions: {
            ...state.tabs[tabIndex]?.questions,
            [id]: {
              answer: answer || state.tabs[tabIndex]?.questions?.[id]?.answer || null,
              isError:
                isError !== undefined
                  ? isError
                  : state.tabs[tabIndex]?.questions?.[id]?.isError || false,
              questionTitle:
                questionTitle || state.tabs[tabIndex]?.questions?.[id]?.questionTitle || '',
              isRequired: isRequired || state.tabs[tabIndex]?.questions?.[id]?.isRequired || false,
            },
          },
        },
      }
    },
    updateTabInfo: (
      state,
      action: PayloadAction<{
        tabIndex: number
        tabTitle: string
      }>,
    ) => {
      const { tabIndex, tabTitle } = action.payload
      state.tabs = {
        ...state?.tabs,
        [tabIndex]: {
          questions: state?.tabs[tabIndex]?.questions,
          tabInfo: {
            ...state.tabs[tabIndex]?.tabInfo,
            title: tabTitle,
            isError: false,
          },
        },
      }
    },
    updateAnswer: (
      state,
      action: PayloadAction<{
        tabIndex: number
        id: string
        answer: any
      }>,
    ) => {
      const { tabIndex, id, answer } = action.payload
      state.tabs = {
        ...state.tabs,
        [tabIndex]: {
          ...state.tabs[tabIndex],
          questions: {
            ...state.tabs[tabIndex]?.questions,
            [id]: {
              ...state.tabs[tabIndex]?.questions?.[id],
              answer: answer,
            },
          },
        },
      }
    },
    fetchAllQuestionsAndAnswers: (
      state,
      action: PayloadAction<{ tabIndex: number; response: any }>,
    ) => {
      const { tabIndex, response } = action.payload

      const newTabState = response.reduce(
        (acc: any, { id, answer, isError, questionTitle }: any) => {
          acc[id] = { answer, isError, questionTitle }
          return acc
        },
        {} as TabState,
      )

      state.tabs = {
        ...state.tabs,
        [tabIndex]: {
          ...state.tabs[tabIndex],
          questions: newTabState,
        },
      }
    },
    validateForm: (state) => {
      let isAllset = true
      Object.keys(state?.tabs)?.forEach((tabIndex: any) => {
        const tab = state.tabs[tabIndex]
        state.tabs[tabIndex].tabInfo = { isError: false }
        if (tab && tab?.questions) {
          Object.keys(tab?.questions)?.forEach((questionId) => {
            const question = tab.questions[questionId]
            if (question.isRequired && (question.answer === null || question.answer === '')) {
              state.tabs[tabIndex].tabInfo.isError = true
              state.tabs[tabIndex].questions[questionId].isError = true
              isAllset = false
            } else {
              state.tabs[tabIndex].questions[questionId].isError = false
            }
          })
        }
      })
      state?.tabs['98']?.questions['mandatoryApprovers']?.answer?.map((ma: any) => {
        if (!ma.approver_id || !ma.approverName) {
          isAllset = false
          state.tabs['98'].tabInfo.isError = true
        }
      })
      state.isAllRequiredFilled = isAllset
    },
    addTab: (
      state,
      action: PayloadAction<{
        tabIndex: number
        tabInfo: Tab
        questions?: QuestionAnswerPair[]
      }>,
    ) => {
      const { tabIndex, tabInfo, questions } = action.payload
      const tabState = questions
        ? questions.reduce((acc, { answer, isError, questionTitle, isRequired }, index) => {
            acc[index] = { answer, isError, questionTitle, isRequired }
            return acc
          }, {} as TabState)
        : {}

      state.tabs = {
        ...state.tabs,
        [tabIndex]: {
          tabInfo,
          questions: tabState,
        },
      }
    },
  },
})

export default formSlice.reducer

export const {
  initFormState,
  updateTabInfo,
  updateTab,
  fetchAllQuestionsAndAnswers,
  addTab,
  updateAnswer,
  validateForm,
} = formSlice.actions
export { validateFormHelper }
