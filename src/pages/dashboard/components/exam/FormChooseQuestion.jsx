import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Select, Spin, Table } from "antd";
import {
  QUESTION_CHOOSE_ABCD,
  QUESTION_READING,
  questionLevel,
  questionType,
  renderQuestionLevel,
  renderQuestionType,
} from "../../../../constants/dashboardConstants";

import FormViewQuestion from "../question/FormViewQuestion";
import { fetchQuestions } from "../../../../services/questionService";
import {
  flatDataTable,
  renderContent,
  renderHTMLtoWord,
} from "../../../../utils/questionTools";
import { RetweetOutlined } from "@ant-design/icons";
import { notificationWarning } from "../../../../utils/Notification";
import "./style.scss";
import { fetchReadingQuestions } from "../../../../services/readingQuestionService";
import FormViewReadingQuestion from "../readingQuestion/FormViewReadingQuestion";

const { Option } = Select;

const FormChooseQuestion = ({
  selectedQuestionList,
  setSelectedQuestionList,
  categoriesList,
}) => {
  const [visible, setVisible] = useState(false);
  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [resetTableQuestion, setResetTableQuestion] = useState(Date.now());

  const [questionList, setQuestionList] = useState([]);
  const [readingQuestionList, setReadingQuestionList] = useState([]);
  const [ABCDQuestionList, setABCDQuestionList] = useState([]);
  const [questionsListClone, setQuestionListClone] = useState([]); // search

  const [questionTypeSelected, setQuestionTypeSelected] =
    useState(QUESTION_CHOOSE_ABCD);
  const [questionLevelSelected, setQuestionLevelSelected] = useState("");
  const [currentCategorySelected, setCurrentCategorySelected] = useState(0);

  const [questionRowsSelected, setQuestionRowsSelected] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((item) => item.id === categoryId);
      return category?.categoryName;
    }
  };

  const handleDoneForm = () => {
    if (questionRowsSelected?.length) {
      setVisible(false);
      setSelectedQuestionList(questionRowsSelected);
    } else notificationWarning("Please select the questions");
  };

  const handleResetQuestions = () => {
    setResetTableQuestion(Date.now());
    setQuestionLevelSelected("");
    setQuestionTypeSelected("");
    setCurrentCategorySelected(0);
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys([...selectedRowKeys, selectedRowKeys]);
      setQuestionRowsSelected(selectedRows);
    },
    // getCheckboxProps: (record) => ({
    //   disabled: selectedRowKeys?.includes(record?.key), // Column configuration not to be checked
    // }),
  };

  const handleSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  useEffect(() => {
    // console.log('selectedRows:', selectedRows)
    // console.log('prevSelectedRows:', prevSelectedRows.current)
    prevSelectedRows.current = selectedRows;
  }, [selectedRows]);

  const prevSelectedRows = useRef(selectedRows);

  useEffect(() => {
    console.log("selectedRows:", selectedRows);
    console.log("prevSelectedRows:", prevSelectedRows.current);
    console.log(
      JSON.stringify(prevSelectedRows.current) !== JSON.stringify(selectedRows)
    );
    if (
      JSON.stringify(prevSelectedRows.current) !== JSON.stringify(selectedRows)
    ) {
      const updatedSelectedRows = selectedRows.filter((row) =>
        questionList.some((item) => item.key === row.key)
      );
      setSelectedRows(updatedSelectedRows);
      setSelectedRowKeys(updatedSelectedRows.map((row) => row.key));
      prevSelectedRows.current = selectedRows;
    }
  }, [questionList, selectedRows]);

  useEffect(() => {
    if (selectedQuestionList) {
      const listKeySelected = selectedQuestionList?.map((item) => item.key);
      setSelectedRowKeys(listKeySelected);
    }
  }, [selectedQuestionList]);

  useEffect(() => {
    if (questionTypeSelected === QUESTION_READING) {
      setLoadingDataTable(true);
      fetchReadingQuestions((res) => {
        flatDataTable(res.data.data, (data) => {
          setQuestionList(data);
          setQuestionListClone(data);
        });
        setLoadingDataTable(false);
      });
      setCurrentCategorySelected(0);
      setQuestionLevelSelected("");
    }
  }, [questionTypeSelected]);

  useEffect(() => {
    setLoadingDataTable(true);
    fetchQuestions((res) => {
      flatDataTable(res.data.data, (questions) => {
        setABCDQuestionList(questions);
      });
    });
    fetchReadingQuestions((res) => {
      flatDataTable(res.data.data, (readingQuestions) => {
        setReadingQuestionList(readingQuestions);
      });
      setLoadingDataTable(false);
    });
    setCurrentCategorySelected(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetTableQuestion]);

  useEffect(() => {
    let temp = [];
    temp = [...ABCDQuestionList, ...readingQuestionList];
    setQuestionList(temp);
    setQuestionListClone(temp);
  }, [ABCDQuestionList, readingQuestionList]);

  useEffect(() => {
    if (questionsListClone) {
      if (
        questionTypeSelected ||
        currentCategorySelected ||
        questionLevelSelected
      ) {
        if (questionTypeSelected === QUESTION_READING) {
          const newQuestionList = questionsListClone.filter(
            (item) =>
              item?.level === (questionLevelSelected || item?.level) &&
              item?.categoryId === (currentCategorySelected || item?.categoryId)
          );
          setQuestionList(newQuestionList);
        } else if (questionTypeSelected === QUESTION_CHOOSE_ABCD) {
          const newQuestionList = questionsListClone.filter(
            (item) =>
              item?.questionType ===
                (questionTypeSelected || item?.questionType) &&
              item?.questionLevel ===
                (questionLevelSelected || item?.questionLevel) &&
              item?.questionCategory ===
                (currentCategorySelected || item?.questionCategory)
          );
          setQuestionList(newQuestionList);
        }
      }
    }
  }, [
    questionTypeSelected,
    questionLevelSelected,
    currentCategorySelected,
    questionsListClone,
  ]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "3%",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "questionTitle",
      width: "17%",
      key: "questionTitle",
      render: (title) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(renderContent(title, 50))}
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "questionType",
      width: "5%",
      key: "questionType",
      render: (questionType) => renderQuestionType(questionType),
    },
    {
      title: "Content",
      dataIndex: "questionContent",
      width: "30%",
      key: "questionContent",
      render: (questionContent) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(renderContent(questionContent, 70))}
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "questionCategory",
      width: "5%",
      key: "questionCategory",
      render: (category) => renderCategory(category),
    },
    {
      title: "Answer",
      dataIndex: "questionAnswer",
      width: "18%",
      key: "questionAnswer",
      render: (questionAnswer) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(renderContent(questionAnswer, 50))}
          </div>
        );
      },
    },
    {
      title: "Level",
      dataIndex: "questionLevel",
      width: "5%",
      key: "questionLevel",
      render: (level) => renderQuestionLevel(level),
    },
    {
      title: "Point",
      dataIndex: "questionPoint",
      width: "5%",
      key: "questionPoint",
    },
    {
      title: "Action",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-column">
            <FormViewQuestion question={row} categoriesList={categoriesList} />
          </div>
        );
      },
      width: "10%",
    },
  ];

  const readingColumns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "40%",
      key: "title",
      render: (title) => {
        return (
          <div className="quest-content-html">
            {renderHTMLtoWord(renderContent(title, 100))}
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "questionType",
      width: "5%",
      key: "questionType",
      render: (questionType) => renderQuestionType(2),
    },
    {
      title: "Paragraph",
      dataIndex: "paragraph",
      width: "30%",
      key: "paragraph",
      render: (paragraph) => {
        return (
          <div className="quest-content-html">
            {/* {renderHTMLtoWord(paragraph)} */}
            {/* {renderHTMLtoWord(renderContent(paragraph, 100))} */}
          </div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "5%",
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
      title: "Action",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-column">
            <FormViewReadingQuestion
              question={row}
              categoriesList={categoriesList}
            />
          </div>
        );
      },
      width: "10%",
    },
  ];

  return (
    <>
      <Button className="btn-dashboard" onClick={() => setVisible(true)}>
        Choose Questions
      </Button>

      <Modal
        title="Choose questions"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1500}
      >
        <Spin spinning={loadingDataTable}>
          <div className="col-12">
            <div className="row">
              {/* category */}
              <div className="col-md-3">
                <label className="quest-label" htmlFor="questionType">
                  Category
                </label>

                <Select
                  defaultValue={0}
                  value={currentCategorySelected}
                  style={{ width: "100%" }}
                  onChange={(category) => setCurrentCategorySelected(category)}
                >
                  <Option value={0}>Choose category</Option>
                  {categoriesList?.map((category) => (
                    <Option key={category.id} value={category.id}>
                      {category.categoryName}{" "}
                    </Option>
                  ))}
                </Select>
              </div>
              {/* type */}
              <div className="col-md-3">
                <label className="quest-label" htmlFor="questionType">
                  Type
                </label>

                <Select
                  value={questionTypeSelected}
                  style={{ width: "100%" }}
                  onChange={(value) => setQuestionTypeSelected(value)}
                >
                  {questionType.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}{" "}
                    </Option>
                  ))}
                </Select>
              </div>

              {/* level */}
              <div className="col-md-3">
                <label className="quest-label" htmlFor="questionType">
                  Level
                </label>

                <Select
                  value={questionLevelSelected}
                  style={{ width: "100%" }}
                  onChange={(value) => setQuestionLevelSelected(value)}
                >
                  <Option value="">Choose level</Option>
                  {questionLevel.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}{" "}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="col-md-3">
                <div
                  className="justify-center"
                  style={{ alignItems: "flex-end", height: "100%" }}
                >
                  <div className="btn-dashboard" onClick={handleResetQuestions}>
                    <RetweetOutlined className="reset-icon icon" />
                  </div>
                </div>
              </div>

              <div className="col-12 modal-table mt-3">
                <Table
                  rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                    selectedRowKeys,
                  }}
                  loading={loadingDataTable}
                  columns={columns}
                  dataSource={questionList}
                  style={{ width: "100%" }}
                  pagination={{ pageSize: 10 }}
                />
                {/* <Table
                  rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedRowKeys,
                    onChange: handleSelect,
                  }}
                  loading={loadingDataTable}
                  columns={
                    questionTypeSelected === QUESTION_READING
                      ? readingColumns
                      : columns
                  }
                  dataSource={questionList}
                  style={{ width: '100%' }}
                  pagination={{ pageSize: 10 }}
                /> */}
              </div>
              <div className="col-md-6">
                {" "}
                <Button className="btn-dashboard mt-3" onClick={handleDoneForm}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default FormChooseQuestion;
