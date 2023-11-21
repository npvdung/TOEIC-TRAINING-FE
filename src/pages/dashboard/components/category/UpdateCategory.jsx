import { Button, Form, Input, Modal, Spin } from "antd";
import moment from "moment";
import { editCategories } from "../../../../services/categoriesService";
import { notificationSuccess } from "../../../../utils/Notification";
import { useEffect } from "react";
import TextArea from "antd/lib/input/TextArea";

const UpdateCategory = ({
  isModalVisible,
  setIsModalVisible,
  categoryEdit,
  setCategoryEdit,
  loading,
  setLoading,
  setRefetch,
}) => {
  const [form] = Form.useForm();
  const handleEditCategory = (value) => {
    const newCategory = {
      categoryId: categoryEdit?.id,
      categoryName: value.categoryName,
      questionRequest: value.questionRequest,
      updatedAt: moment(Date.now()).format("YYYY/MM/DD"),
    };
    setLoading(true);
    editCategories(
      newCategory,
      () => {
        notificationSuccess("Edit successfully");
        setRefetch(Date.now());
        setIsModalVisible(false);
        setLoading(false);
        setCategoryEdit(null);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    form.setFieldsValue({ categoryName: categoryEdit?.categoryName });
    form.setFieldsValue({ questionRequest: categoryEdit?.questionRequest });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryEdit]);

  return (
    <Modal
      title="Edit category"
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={handleEditCategory}
          className="align-item-center"
        >
          <div className="col-lg-12">
            <label className="quest-label mb-2" htmlFor="categoryName">
              Category Name
            </label>
            <Form.Item
              style={{ width: "100%" }}
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: "Please input your category name!",
                },
                {
                  max: 50,
                  message: "Category name too long!",
                },
              ]}
            >
              <Input placeholder="Enter category name" />
            </Form.Item>
          </div>
          <div className="col-lg-12">
            <label className="quest-label mb-2" htmlFor="questionRequest">
              Question Request
            </label>
            <Form.Item
              style={{ width: "100%" }}
              name="questionRequest"
              initialValue=""
            >
              <TextArea rows={4} placeholder="Enter question request" />
            </Form.Item>
          </div>
          <div className="col-lg-12">
            <Form.Item>
              <Button htmlType="submit" className="btn-dashboard mt-2">
                Update
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};
export default UpdateCategory;
