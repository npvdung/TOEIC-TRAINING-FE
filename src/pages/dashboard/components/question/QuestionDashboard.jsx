import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Select } from "antd";
import { RetweetOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  notificationSuccess,
  // notificationWarning,
} from "../../../../utils/Notification";
import Swal from "sweetalert2";
import {
  fetchQuestions,
  removeQuestion,
} from "../../../../services/questionService";
import FormAddQuestion from "./FormAddQuestion";
import { flatDataTable } from "../../../../utils/questionTools";
import {
  renderHTMLtoWord,
  renderQuestionLevel,
} from "../../../../constants/dashboardConstants";
import { fetchCategories } from "../../../../services/categoriesService";
import { notificationErr } from "../../../../utils/Notification";
import FormEditQuestion from "./FormEditQuestion";
import FormViewQuestion from "./FormViewQuestion";
// import FormAddReadingQuestion from './FormAddReadingQuestion'
import { Trash } from "react-bootstrap-icons";

// const { Search } = Input
const { Option } = Select;

const QuestionDashboard = () => {
  const [questionsList, setQuestionList] = useState([]);
  const [questionsListClone, setQuestionListClone] = useState([]); // search
  const [categoriesList, setCategoriesList] = useState([]);
  // const [questionSearchName, setQuestionSearchName] = useState('')

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  // const [openFormReadingQuestion, setOpenFormReadingQuestion] = useState(false)
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const [currentCategorySelected, setCurrentCategorySelected] = useState(0);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchQuestions((res) => {
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
        (question) => question.questionCategory === currentCategorySelected
      );
      setQuestionList(newQuestionListByCategory);
    }
    // eslint-disable-next-line
  }, [currentCategorySelected, questionsListClone]);

  const handleResetQuestions = () => {
    setRefetch(Date.now());
    // setQuestionSearchName('')
  };

  const handleDeleteQuestion = (questionId) => {
    Swal.fire({
      title: "Are you sure delete this question?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeQuestion(
          questionId,
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
      dataIndex: "questionTitle",
      width: "30%",
      key: "questionTitle",
      render: (questionTitle) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(questionTitle)}
          </div>
        );
      },
    },
    {
      title: "Content",
      dataIndex: "questionContent",
      width: "40%",
      key: "questionContent",
      render: (questionContent) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(questionContent)}
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "questionCategory",
      width: "10%",
      key: "questionCategory",
      render: (category) => renderCategory(category),
    },
    {
      title: "Level",
      dataIndex: "questionLevel",
      width: "5%",
      key: "questionLevel",
      render: (questionLevel) => renderQuestionLevel(questionLevel),
    },
    {
      title: "Point",
      dataIndex: "questionPoint",
      width: "3%",
      key: "questionPoint",
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <FormViewQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
            />
            <FormEditQuestion
              question={row}
              categoriesList={categoriesList}
              setRefetch={setRefetch}
            />
            <Button
              onClick={() => handleDeleteQuestion(row.id)}
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
              onClick={() => setOpenAddForm(true)}
              className="btn-dashboard ml-3"
            >
              <PlusCircleOutlined />
              New Question
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
                  <Option key={1} value={1}>
                    Part 5
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
          <h5>Questions</h5>
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
      {/* <FormAddReadingQuestion
        loading={loading}
        setLoading={setLoading}
        setRefetch={setRefetch}
        setOpenFormReadingQuestion={setOpenFormReadingQuestion}
        categoriesList={categoriesList}
        openFormReadingQuestion={openFormReadingQuestion}
      /> */}
    </div>
  );
};

export default QuestionDashboard;
