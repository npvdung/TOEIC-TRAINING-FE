export const DASHBOARD_HOME_MENU = 'DASHBOARD_HOME_MENU'
export const DASHBOARD_USERS_MENU = 'DASHBOARD_USERS_MENU'
export const DASHBOARD_QUESTIONS_MENU = 'DASHBOARD_QUESTIONS_MENU'
export const DASHBOARD_READING_QUESTIONS_MENU =
  'DASHBOARD_READING_QUESTIONS_MENU'
export const DASHBOARD_CATEGORIES_MENU = 'DASHBOARD_CATEGORIES_MENU'
export const DASHBOARD_EXAMS_MENU = 'DASHBOARD_EXAMS_MENU'

export const TOOLTIP_POSITION = 'right'
export const QUESTION_CHOOSE_ABCD = 1
export const QUESTION_READING = 2

export const ROLE_USER = 1
export const ROLE_ADMIN = 2

export const USER_ACTIVATED = true
export const USER_DEACTIVATED = false

export const renderQuestionType = (typeId) => {
  if (typeId === QUESTION_CHOOSE_ABCD) {
    return 'Choose ABCD'
  }
  if (typeId === QUESTION_READING) {
    return 'Reading'
  }
}

export const questionType = [
  { id: 1, name: 'Choose ABCD' },
  { id: 2, name: 'Reading' },
]

export const questionLevel = [
  { id: 1, name: 'Easy' },
  { id: 2, name: 'Normal' },
  { id: 3, name: 'Hard' },
]

export const questionPoint = [
  { id: 1, value: 5 },
  // { id: 2, value: 10 },
  // { id: 3, value: 20 },
]

export const roleUser = [
  { id: 1, name: 'User' },
  { id: 2, name: 'Admin' },
]

export const renderQuestionLevel = (levelId) => {
  if (levelId) {
    const level = questionLevel.find((lev) => lev.id === levelId)
    return level.name
  }
}

export const renderRole = (role) => {
  if (role === ROLE_USER) {
    return 'User'
  }
  if (role === ROLE_ADMIN) {
    return 'Admin'
  }
}

export const renderUserActivate = (isActivated) => {
  if (isActivated === USER_ACTIVATED) {
    return 'Activated'
  }
  if (isActivated === USER_DEACTIVATED) {
    return 'Deactivated'
  }
}

// export const renderHTMLtoWord = (text) => {
//   if (!text) return
//   return (
//     <div
//       dangerouslySetInnerHTML={{
//         __html: JSON.parse(`{"html": "${text}"}`).html,
//       }}
//     ></div>
//   )
// }

export const renderHTMLtoWord = (text) => {
  if (!text) return
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>
}

export const templateExam = [
  {
    type: 1,
    level: 1,
    categoryId: 1,
    quantity: 2,
  },
  {
    type: 1,
    level: 1,
    categoryId: 2,
    quantity: 2,
  },
  {
    type: 1,
    level: 1,
    categoryId: 3,
    quantity: 15,
  },
  {
    type: 1,
    level: 1,
    categoryId: 4,
    quantity: 2,
  },
  {
    type: 1,
    level: 1,
    categoryId: 5,
    quantity: 2,
  },
  {
    type: 1,
    level: 1,
    categoryId: 6,
    quantity: 2,
  },
  {
    type: 2,
    level: 1,
    categoryId: 7,
    quantity: 1,
  },
  {
    type: 2,
    level: 1,
    categoryId: 8,
    quantity: 1,
  },
  {
    type: 2,
    level: 2,
    categoryId: 8,
    quantity: 1,
  },
  {
    type: 1,
    level: 1,
    categoryId: 9,
    quantity: 3,
  },
  {
    type: 1,
    level: 1,
    categoryId: 10,
    quantity: 3,
  },
  {
    type: 1,
    level: 1,
    categoryId: 27,
    quantity: 2,
  },
]
