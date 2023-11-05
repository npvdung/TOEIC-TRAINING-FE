import React, { useState, useEffect } from 'react'
import Header from './header/Header'
import Rate from './rate/Rate'

import './home.scss'
import Sidebar from './sidebar/Sidebar'
import Content from './midContent/Content'
import { notificationErr } from '../../utils/Notification'
import { fetchCategories } from '../../services/categoriesService'

const Home = () => {
  const [categoriesList, setCategoriesList] = useState([])
  const [currentMenu, setCurrentMenu] = useState(0)

  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res?.data?.data)
      setCurrentMenu(res?.data?.data[0].id)
    }, getError)
  }, [])

  const getError = () => {
    notificationErr('Cannot get categories')
  }
  return (
    <div className="home">
      <Header />
      <div className="content">
        <div className="row">
          <Sidebar
            categoriesList={categoriesList}
            setCurrentMenu={setCurrentMenu}
          />
          <Content currentMenu={currentMenu} />
          <Rate />
        </div>
      </div>
    </div>
  )
}

export default Home
