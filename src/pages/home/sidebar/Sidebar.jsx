import React, { useEffect, useState } from "react";

const Sidebar = ({ setCurrentMenu, categoriesList }) => {
  const [currentTab, setCurrentTab] = useState();

  useEffect(() => {
    if (categoriesList?.length) {
      setCurrentTab(9);
    }
    // eslint-disable-next-line
  }, [categoriesList]);

  const handleSelectCategories = (id) => {
    setCurrentTab(9);
    setCurrentMenu(9);
  };

  return (
    <div className="col-md-2">
      <div className="center">
        <div className="home-sidebar">
          <div className="user-profile">
            <p className="user-fullname">Exams</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
