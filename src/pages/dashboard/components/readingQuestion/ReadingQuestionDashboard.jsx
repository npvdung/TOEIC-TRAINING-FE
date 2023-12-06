import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Select } from "antd";
import { RetweetOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { flatDataTable } from "../../../../utils/questionTools";
import { renderQuestionLevel } from "../../../../constants/dashboardConstants";
import { fetchCategories } from "../../../../services/categoriesService";
import {
  notificationErr,
  notificationSuccess,
} from "../../../../utils/Notification";
import { Trash } from "react-bootstrap-icons";
import FormAddQuestion from "../question/FormAddQuestion";
import {
  fetchReadingQuestions,
  removeReadingQuestion,
} from "../../../../services/readingQuestionService";
import FormAddReadingQuestion from "./FormAddReadingQuestion";
import "./style.scss";
import FormViewReadingQuestion from "./FormViewReadingQuestion";
import FormEditReadingQuestion from "./FormEditReadingQuestion";
import Swal from "sweetalert2";

// const { Search } = Input
const { Option } = Select;

const ReadingQuestionDashboard = () => {
  const [questionsList, setQuestionList] = useState([]);
  const [questionsListClone, setQuestionListClone] = useState([]); // search
  const [categoriesList, setCategoriesList] = useState([]);
  // const [questionSearchName, setQuestionSearchName] = useState('')

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openFormReadingQuestion, setOpenFormReadingQuestion] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [currentCategorySelected, setCurrentCategorySelected] = useState(0);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchReadingQuestions((res) => {
      flatDataTable(res.data.data, (data) => {
        setQuestionList(data);
        setQuestionListClone(data);
      });
      setLoadingDataTable(false);
    });
  }, [refetch]);

  // const handleSearchQuestion = () => {
  //   if (questionSearchName) {
  //     let questionsListCloneSearch = JSON.parse(
  //       JSON.stringify(questionsListClone)
  //     )
  //     questionsListCloneSearch = questionsListCloneSearch.filter((question) => {
  //       return question.questionName
  //         .toLowerCase()
  //         .match(questionSearchName.toLowerCase())
  //     })
  //     setQuestionList(questionsListCloneSearch)
  //   } else notificationWarning('Please enter name before search')
  // }

  useEffect(() => {
    fetchCategories(
      (res) => setCategoriesList(res.data.data),
      () => notificationErr("Oop something went wrong")
    );
  }, []);

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((item) => item.id === categoryId);
      return category?.categoryName || "no category";
    }
  };

  useEffect(() => {
    if (!currentCategorySelected) {
      setQuestionList(questionsListClone);
    } else {
      const temp = JSON.parse(JSON.stringify(questionsListClone));
      const newQuestionListByCategory = temp.filter(
        (question) => question.categoryId === currentCategorySelected
      );
      setQuestionList(newQuestionListByCategory);
    }
    // eslint-disable-next-line
  }, [currentCategorySelected, questionsListClone]);

  const handleResetQuestions = () => {
    setRefetch(Date.now());
    // setQuestionSearchName('')
  };

  const handleDeleteReadingQuestion = (readingId) => {
    Swal.fire({
      title: "Are you sure delete this reading question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeReadingQuestion(
          readingId,
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "50%",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "10%",
      key: "categoryId",
      render: (categoryId) => renderCategory(categoryId),
    },
    {
      title: "Level",
      dataIndex: "level",
      width: "5%",
      key: "level",
      render: (level) => renderQuestionLevel(level),
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <FormViewReadingQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
            />
            <FormEditReadingQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
              setLoading={setLoading}
            />
            <Button
              onClick={() => handleDeleteReadingQuestion(row.id)}
              title="Delete Question"
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
            <Button
              onClick={() => setOpenFormReadingQuestion(true)}
              className="btn-dashboard ml-3"
            >
              <PlusCircleOutlined />
              New Reading Question
            </Button>
          </div>
          <div className="col-lg-8">
            <div className="align-item-center">
              <div className="col-md-6 filter-input pl-0">
                <Select
                  value={currentCategorySelected}
                  style={{ width: "100%" }}
                  onChange={(category) => setCurrentCategorySelected(category)}
                >
                  <Option value={0}>Choose category</Option>
                  <Option key={6} value={6}>
                    Part 6
                  </Option>
                  <Option key={8} value={8}>
                    Part 7
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="btn-dashboard" onClick={handleResetQuestions}>
            <RetweetOutlined className="reset-icon icon" />
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <h5>Reading Questions</h5>
        </div>
        <div className="table-field">
          <Table
            loading={loadingDataTable}
            columns={columns}
            dataSource={questionsList}
            style={{ width: "100%" }}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Spin>
      <FormAddQuestion
        loading={loading}
        setLoading={setLoading}
        setRefetch={setRefetch}
        setOpenAddForm={setOpenAddForm}
        openAddForm={openAddForm}
      />
      <FormAddReadingQuestion
        loading={loading}
        setLoading={setLoading}
        setRefetch={setRefetch}
        setOpenFormReadingQuestion={setOpenFormReadingQuestion}
        categoriesList={categoriesList}
        openFormReadingQuestion={openFormReadingQuestion}
      />
    </div>
  );
};

export default ReadingQuestionDashboard;
