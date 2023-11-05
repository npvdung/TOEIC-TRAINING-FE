const baseUrl = process.env.REACT_APP_BASE_API_URL

// const baseUrl = 'http://localhost:8888'

export const ApiUrl = {
  questions: baseUrl + '/questions',
  reading: baseUrl + '/reading',
  exam: baseUrl + '/exams',
  getGame: baseUrl + '/games/getGame',
  finishGame: baseUrl + '/games/finishGame',
  login: baseUrl + '/users/authenticate',
  register: baseUrl + '/users/register',
  categories: baseUrl + '/categories',
  getTop: baseUrl + '/results/rate',
  results: baseUrl + '/results',
  user: baseUrl + '/users',
  examDetail: baseUrl + '/games/exam-detail',
}
