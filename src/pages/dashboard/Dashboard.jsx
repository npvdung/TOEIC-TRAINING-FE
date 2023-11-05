import React, { useEffect, useState } from 'react'
import SidebarDashboard from './components/sidebar/SidebarDashboard'
import './dashboard.scss'
import {
  DASHBOARD_HOME_MENU,
  DASHBOARD_QUESTIONS_MENU,
  DASHBOARD_READING_QUESTIONS_MENU,
  DASHBOARD_EXAMS_MENU,
  DASHBOARD_CATEGORIES_MENU,
  DASHBOARD_USERS_MENU,
} from '../../constants/dashboardConstants'
import HomeDashboard from './components/chart/HomeDashboard'
import { useLocation } from 'react-router-dom'
import { ROUTER_CONST } from '../../config/paramsConst/RouterConst'
import CategoriesDashboard from './components/category/CategoriesDashboard'
import HeaderDashboard from './components/header/HeaderDashboard'
import QuestionDashboard from './components/question/QuestionDashboard'
import ExamDashboard from './components/exam/ExamDashboard'
import UserDashboard from './components/user/UserDashboard'
import ReadingQuestionDashboard from './components/readingQuestion/ReadingQuestionDashboard'

const Dashboard = () => {
  const [currentMenu, setCurrentMenu] = useState(DASHBOARD_HOME_MENU)
  const paramsFromUrl = useLocation()

  useEffect(() => {
    if (paramsFromUrl.pathname === ROUTER_CONST.dashboardHome) {
      setCurrentMenu(DASHBOARD_HOME_MENU)
    }
    if (paramsFromUrl.pathname === ROUTER_CONST.user) {
      setCurrentMenu(DASHBOARD_USERS_MENU)
    }
    if (paramsFromUrl.pathname === ROUTER_CONST.categories) {
      setCurrentMenu(DASHBOARD_CATEGORIES_MENU)
    }
    if (paramsFromUrl.pathname === ROUTER_CONST.questions) {
      setCurrentMenu(DASHBOARD_QUESTIONS_MENU)
    }
    if (paramsFromUrl.pathname === ROUTER_CONST.readingQuestions) {
      setCurrentMenu(DASHBOARD_READING_QUESTIONS_MENU)
    }
    if (paramsFromUrl.pathname === ROUTER_CONST.exams) {
      setCurrentMenu(DASHBOARD_EXAMS_MENU)
    }
  }, [paramsFromUrl])

  const renderDashboardContent = () => {
    switch (paramsFromUrl.pathname) {
      case ROUTER_CONST.dashboardHome:
        return <HomeDashboard />
      case ROUTER_CONST.user:
        return <UserDashboard />
      case ROUTER_CONST.categories:
        return <CategoriesDashboard />
      case ROUTER_CONST.questions:
        return <QuestionDashboard />
      case ROUTER_CONST.readingQuestions:
        return <ReadingQuestionDashboard />
      case ROUTER_CONST.exams:
        return <ExamDashboard />
      default:
        break
    }
  }
  return (
    <div className="dashboard">
      <SidebarDashboard
        setCurrentMenu={setCurrentMenu}
        currentMenu={currentMenu}
      />

      <div className="dashboard-content">
        <HeaderDashboard />
        {renderDashboardContent()}
      </div>
    </div>
  )
}

export default Dashboard
