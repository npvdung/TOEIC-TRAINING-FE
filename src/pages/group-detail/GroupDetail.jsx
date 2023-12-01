import { useParams } from "react-router-dom/cjs/react-router-dom";
import Sidebar from "../home/sidebar/Sidebar";
import Content from "../home/midContent/Content";
import Rate from "../home/rate/Rate";
import Header from "../home/header/Header";
import "./group-detail.scss";
import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/categoriesService";

export const GroupDetail = () => {
  let { id } = useParams();
  const [categoriesList, setCategoriesList] = useState([]);
  const [currentMenu, setCurrentMenu] = useState(0);
  useEffect(() => {
    fetchCategories((res) => {
      setCategoriesList(res?.data?.data);
      setCurrentMenu(res?.data?.data[0].id);
    });
  }, []);

  return (
    <div className="group-detail-page">
      <Header />
      <div className="content">
        <div className="row">
          <Sidebar
            categoriesList={categoriesList}
            setCurrentMenu={currentMenu}
          />
          <Content currentMenu={0} />
          <Rate />
        </div>
      </div>
    </div>
  );
};
