import { Button, Form, InputNumber, Modal, Select, Table } from "antd";
import {
  questionLevel,
  questionType,
  renderQuestionLevel,
  renderQuestionType,
  templateExam,
} from "../../../../constants/dashboardConstants";
import "./style.scss";
import { useEffect, useState } from "react";
import { generateRandomExam } from "../../../../services/examService";
import ViewExam from "./ViewExam";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const { Option } = Select;

const GenerateRandomExam = ({
  openGenerateRandomExam,
  setOpenGenerateRandomExam,
  categoriesList,
  setRefetch,
}) => {
  const [form] = Form.useForm();
  const [listOrder, setListOrder] = useState(templateExam);
  const [randomExam, setRandomExam] = useState();
  const [openViewExam, setOpenViewExam] = useState(false);
  const [totalPoint, setTotalPoint] = useState();
  const [updateList, setUpdateList] = useState(null);

  const onResetForm = () => {
    form.resetFields();
  };

  const renderCategory = (categoryId) => {
    if (categoriesList.length) {
      const category = categoriesList.find((item) => item.id === categoryId);
      return category?.categoryName;
    }
  };

  const handleAddToOrder = (value) => {
    if (value) {
      let temp = [...listOrder];
      if (!!updateList) {
        const index = temp.findIndex(
          (item) =>
            item.categoryId === updateList.categoryId &&
            item.level === updateList.level &&
            item.type === updateList.type &&
            item.quantity === updateList.quantity
        );
        if (index !== -1) {
          temp[index] = { ...value };
        }
      } else {
        temp.push(value);
      }
      onResetForm();
      setListOrder(temp);
    }
  };

  const handleDeleteOrder = (value) => {
    let temp = [...listOrder];
    const index = temp.findIndex(
      (item) =>
        item.categoryId === value.categoryId &&
        item.level === value.level &&
        item.type === value.type &&
        item.quantity === value.quantity
    );
    if (index !== -1) {
      temp.splice(index, 1);
    }
    setListOrder([...temp]);
  };

  const handleEditOrder = (value) => {
    form.setFieldsValue({ type: value?.type });
    form.setFieldsValue({ level: value?.level });
    form.setFieldsValue({ categoryId: value?.categoryId });
    form.setFieldsValue({ quantity: value?.quantity });
    setUpdateList(value);
  };

  const handleCreateRandomExam = () => {
    generateRandomExam(
      listOrder,
      (res) => {
        setRandomExam(res.data.data);
      },
      (err) => console.log(err)
    );
  };

  useEffect(() => {
    if (randomExam && totalPoint) {
      setOpenViewExam(true);
    }
  }, [randomExam, totalPoint]);

  useEffect(() => {
    if (randomExam?.questionList?.length) {
      let tPoint = 0;
      randomExam?.questionList?.forEach(
        (item) => (tPoint += item.questionPoint)
      );
      setTotalPoint(tPoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [randomExam]);

  const columns = [
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "30%",
      key: "categoryId",
      render: (categoryId) => renderCategory(categoryId),
    },
    {
      title: "Type",
      dataIndex: "type",
      width: "20%",
      key: "type",
      render: (type) => renderQuestionType(type),
    },
    {
      title: "Level",
      dataIndex: "level",
      width: "10%",
      key: "level",
      render: (level) => renderQuestionLevel(level),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "10%",
      key: "quantity",
    },
    {
      title: "",
      key: "action",
      render: (row) => {
        return (
          <div className="center flex-row">
            <Button
              onClick={() => handleEditOrder(row)}
              title="Edit"
              className="mr-2"
            >
              <PencilSquare />
            </Button>
            <Button onClick={() => handleDeleteOrder(row)} title="Delete">
              <Trash />
            </Button>
          </div>
        );
      },
      width: "10%",
    },
  ];
  return (
    <>
      <ViewExam
        exam={randomExam}
        show={openViewExam}
        onClose={() => {
          setOpenViewExam(false);
          setTotalPoint(null);
        }}
        setRefetch={setRefetch}
        totalPoint={totalPoint}
      />
      <Modal
        title="Generate Random Exam"
        centered
        visible={openGenerateRandomExam}
        onCancel={() => {
          setOpenGenerateRandomExam(false);
          setListOrder(templateExam);
        }}
        width={1000}
      >
        <div className="table-field">
          <Table
            dataSource={listOrder}
            columns={columns}
            style={{ width: "100%" }}
            pagination={false}
            scroll={{
              y: 400,
            }}
          />
        </div>
        <Form
          form={form}
          onFinish={handleAddToOrder}
          initialValues={{
            type: "",
            level: "",
            categoryId: "",
          }}
        >
          <div className="form-add-question">
            <div className="col-md-12">
              <div className="row">
                {/* type */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="questionType">
                    <span className="required mt-2 mr-1">*</span> Type
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="type"
                    className=" form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose type!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="">Choose type</Option>
                      {questionType.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* level */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="level">
                    <span className="required mt-2 mr-1">*</span> Level
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="level"
                    className=" form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose level!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="">Choose level</Option>
                      {questionLevel.map((item) => (
                        <Option key={item.id} value={item.id}>
                          {item.name}{" "}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* category */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="categoryId">
                    <span className="required mt-2 mr-1">*</span> Category
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="categoryId"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please choose category!",
                      },
                    ]}
                  >
                    <Select>
                      <Option value="">Choose category</Option>
                      {categoriesList?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.categoryName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                {/* quantity */}
                <div className="col-md-6">
                  <label className="quest-label" htmlFor="quantity">
                    <span className="required mt-2 mr-1">*</span> Quantity
                  </label>
                  <Form.Item
                    style={{ width: "100%" }}
                    name="quantity"
                    className="form-add-item"
                    rules={[
                      {
                        required: true,
                        message: "Please enter quantity!",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-md-4 mt-1">
              <div className="row pl-2">
                <Form.Item>
                  <Button className="btn-dashboard ml-2" htmlType="submit">
                    {!!updateList ? "Update" : "Add"}
                  </Button>
                </Form.Item>
              </div>
            </div>
          </div>
          {listOrder.length > 0 && (
            <div className="col-md-4 mt-4">
              <div className="row pl-2">
                <Form.Item>
                  <Button
                    onClick={handleCreateRandomExam}
                    className="btn-dashboard ml-2"
                  >
                    Generate Random Exam
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      setOpenGenerateRandomExam(false);
                      setListOrder(templateExam);
                    }}
                    className="btn-dashboard-outline ml-2"
                  >
                    Close
                  </Button>
                </Form.Item>
              </div>
            </div>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default GenerateRandomExam;
