import React, { useEffect, useState } from "react";
import { Table, Button, Input, Spin } from "antd";
import {
  fetchCategories,
  removeCategories,
} from "../../../../services/categoriesService";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";
import { notificationSuccess } from "../../../../utils/Notification";
import Swal from "sweetalert2";
import { flatDataTable } from "../../../../utils/questionTools";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const { Search } = Input;

const CategoriesDashboard = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesListClone, setCategoriesListClone] = useState([]); // search
  const [categoryEdit, setCategoryEdit] = useState();
  const [categorySearchName, setCategorySearchName] = useState("");

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchCategories((res) => {
      flatDataTable(res.data.data, (data) => {
        setCategoriesList(data);
        setCategoriesListClone(data);
      });

      setLoadingDataTable(false);
    });
  }, [refetch]);

  const handleSearchCategories = () => {
    let categoriesListCloneSearch = JSON.parse(
      JSON.stringify(categoriesListClone)
    );
    categoriesListCloneSearch = categoriesListCloneSearch.filter((category) => {
      return category.categoryName
        .toLowerCase()
        .match(categorySearchName?.toLowerCase());
    });
    setCategoriesList(categoriesListCloneSearch);
  };

  const handleDeleteCategory = (categoryId) => {
    Swal.fire({
      title: "Are you sure delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeCategories(
          categoryId,
          () => {
            setLoading(false);
            setRefetch(Date.now());
            notificationSuccess("Delete successfully");
          },
          (error) => console.log(error)
        );
      }
    });
  };

  const handleResetCategories = () => {
    setRefetch(Date.now());
    setCategorySearchName("");
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      width: "15%",
      key: "CategoryName",
    },
    {
      title: "Question Request",
      dataIndex: "questionRequest",
      width: "50%",
      key: "CategoryName",
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <Button
              onClick={() => {
                setCategoryEdit(row);
                setIsModalVisible(true);
              }}
            >
              <PencilSquare />
            </Button>
            <Button
              className="ml-1"
              onClick={() => handleDeleteCategory(row.id)}
            >
              <Trash />
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];

  return (
    <div className="content-wrapper">
      <Spin spinning={loading}>
        <div className="content-top">
          <div className="add-field">
            <div className="col-md-6">
              <Button
                onClick={() => setOpenAddForm(true)}
                className="btn-dashboard"
              >
                <PlusCircleOutlined />
                New Category
              </Button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="align-item-center">
              <Search
                value={categorySearchName}
                onChange={(e) => setCategorySearchName(e.target.value)}
                placeholder="Search category name"
                onSearch={handleSearchCategories}
              />
            </div>
          </div>

          <div className="btn-dashboard" onClick={handleResetCategories}>
            <RetweetOutlined className="reset-icon icon" />
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <h5>Categories</h5>
        </div>
        <div className="table-field">
          <Table
            loading={loadingDataTable}
            columns={columns}
            dataSource={categoriesList}
            style={{ width: "100%" }}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Spin>
      <CreateCategory
        openAddForm={openAddForm}
        setOpenAddForm={setOpenAddForm}
        setLoading={setLoading}
        setRefetch={setRefetch}
      />
      <UpdateCategory
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        categoryEdit={categoryEdit}
        setCategoryEdit={setCategoryEdit}
        loading={loading}
        setLoading={setLoading}
        setRefetch={setRefetch}
      />
    </div>
  );
};

export default CategoriesDashboard;
