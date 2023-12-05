import React, { useEffect, useState } from "react";
import { Table, Button, Input, Spin, Select } from "antd";
import { fetchCategories } from "../../../../services/categoriesService";
import { getExamList, removeExam } from "../../../../services/examService";
import { PlusCircleOutlined, RetweetOutlined } from "@ant-design/icons";

import { notificationSuccess } from "../../../../utils/Notification";
import Swal from "sweetalert2";
import FormAddExam from "./FormAddExam";
import { flatDataTable } from "../../../../utils/questionTools";
import FormEditExam from "./FormEditExam";
import moment from "moment";
import { Trash } from "react-bootstrap-icons";
import GenerateRandomExam from "./GenerateRandomExam";

const { Search } = Input;
const { Option } = Select;

const ExamDashboard = ({ groupId }) => {
  const [examList, setExamList] = useState([]);
  const [examListClone, setExamListClone] = useState([]); // search

  const [categoriesList, setListCategoriesList] = useState([]);

  const [examNameSearch, setExamNameSearch] = useState("");
  const [currentCategorySelected, setCurrentCategorySelected] = useState(0);

  const [loadingDataTable, setLoadingDataTable] = useState(false);
  const [refetch, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modeExam, setModeExam] = useState("view");
  const [openGenerateRandomExam, setOpenGenerateRandomExam] = useState(false);

  useEffect(() => {
    fetchCategories((res) => {
      setListCategoriesList(res.data.data);
    });
  }, []);

  useEffect(() => {
    setLoadingDataTable(true);
    getExamList(groupId, (res) => {
      flatDataTable(res.data.data, (data) => {
        setExamList(data);
        setExamListClone(data);
      });
      setLoadingDataTable(false);
    });
  }, [refetch]);

  useEffect(() => {
    if (!currentCategorySelected) {
      setExamList(examListClone);
    } else {
      const temp = JSON.parse(JSON.stringify(examListClone));
      const newExamListByCategory = temp.filter(
        (exam) => exam.categoryId === currentCategorySelected
      );
      setExamList(newExamListByCategory);
    }
    // eslint-disable-next-line
  }, [currentCategorySelected]);

  const handleSearchCategories = () => {
    let examListCloneSearch = JSON.parse(JSON.stringify(examListClone));
    examListCloneSearch = examListCloneSearch.filter((exam) => {
      return exam.examName.toLowerCase().match(examNameSearch?.toLowerCase());
    });
    setExamList(examListCloneSearch);
    setCurrentCategorySelected(0);
  };

  const handleResetExam = () => {
    setCurrentCategorySelected(0);
    setRefetch(Date.now());
    setExamNameSearch("");
  };

  const handleGoToAddExam = () => {
    setModeExam("create");
  };

  const handleRemoveExam = (examId) => {
    Swal.fire({
      title: "Are you sure delete this exam?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        removeExam(
          examId,
          () => {
            setLoading(false);
            setRefetch(Date.now());
            notificationSuccess("Delete successfully");
          },
          (error) => {
            console.log(error);
            setLoading(false);
          }
        );
      }
    });
  };

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((item) => item.id === categoryId);
      return category?.categoryName;
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "5%",
      key: "ID",
    },
    {
      title: "Exam Name",
      dataIndex: "examName",
      sorter: (a, b) => a.examName.localeCompare(b.examName),
      width: "30%",
      key: "examName",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "20%",
      key: "categoryId",
      render: (categoryId) => renderCategory(categoryId),
    },
    {
      title: "Total time",
      dataIndex: "totalTime",
      width: "10%",
      key: "totalTime",
      render: (totalTime) => {
        return <div>{totalTime} minutes</div>;
      },
    },
    {
      title: "Total point",
      dataIndex: "totalPoint",
      width: "10%",
      key: "totalPoint",
    },
    {
      title: "Created At",
      width: "15%",
      key: "Created",
      render: (row) => {
        const createdAt = row.createdAt;
        return moment(createdAt, "YYYY-MM-DD").format("DD/MM/YYYY");
      },
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <FormEditExam
              setRefetch={setRefetch}
              examId={row.id}
              category={renderCategory(row.categoryId)}
            />

            <Button onClick={() => handleRemoveExam(row.id)} className="ml-1">
              <Trash />
            </Button>
          </div>
        );
      },

      width: "10%",
    },
  ];

  const renderComponent = () => {
    switch (modeExam) {
      case "create":
        return (
          <FormAddExam
            categoriesList={categoriesList}
            setModeExam={setModeExam}
            refetch={setRefetch}
            groupId={groupId}
          />
        );
      case "view":
        return (
          <div className="content-wrapper">
            <GenerateRandomExam
              setOpenGenerateRandomExam={setOpenGenerateRandomExam}
              openGenerateRandomExam={openGenerateRandomExam}
              categoriesList={categoriesList}
              refetch={setRefetch}
              groupId={groupId}
            />
            <Spin spinning={loading}>
              <div className="content-top">
                <div className="add-field">
                  <div className="col-md-6">
                    <Button
                      onClick={() => setOpenGenerateRandomExam(true)}
                      className="btn-dashboard"
                    >
                      <PlusCircleOutlined />
                      Generate Random Exam
                    </Button>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="align-item-center">
                    <div className="col-md-6 filter-input pl-0">
                      <Search
                        value={examNameSearch}
                        onChange={(e) => setExamNameSearch(e.target.value)}
                        placeholder="Search exam name"
                        onSearch={handleSearchCategories}
                      />
                    </div>
                  </div>
                </div>
                <div className="btn-dashboard" onClick={handleResetExam}>
                  <RetweetOutlined className="reset-icon icon" />
                </div>
              </div>
              <div className="col-lg-12 mb-2">
                <h5>Exams</h5>
              </div>
              <div className="table-field">
                <Table
                  loading={loadingDataTable}
                  columns={columns}
                  dataSource={examList}
                  style={{ width: "100%" }}
                  pagination={{ pageSize: 10 }}
                />
              </div>
            </Spin>
          </div>
        );
      default:
        break;
    }
  };
  return renderComponent();
};

export default ExamDashboard;
