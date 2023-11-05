import React, { useEffect, useState } from 'react'

const Sidebar = ({ setCurrentMenu, categoriesList }) => {
  const [currentTab, setCurrentTab] = useState()

  useEffect(() => {
    if (categoriesList?.length) {
      setCurrentTab(categoriesList[0]?.id)
    }
    // eslint-disable-next-line
  }, [categoriesList])

  const handleSelectCategories = (id) => {
    setCurrentTab(id)
    setCurrentMenu(id)
  }

  return (
    <div className="col-md-3">
      <div className="center">
        <div className="home-sidebar">
          <div className="user-profile">
            <p className="user-fullname">Categories</p>
          </div>
          <div className="sidebar-menu mt-2">
            {categoriesList?.length > 0
              ? categoriesList.map((category) => {
                  return (
                    <div
                      key={category.id}
                      className={`menu-item ${
                        currentTab === category.id && 'active'
                      }`}
                      onClick={() => handleSelectCategories(category.id)}
                    >
                      <span className="item">{category.categoryName}</span>
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
