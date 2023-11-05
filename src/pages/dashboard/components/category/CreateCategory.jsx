import { Button, Form, Input, Modal } from 'antd'
import moment from 'moment'
import { createCategories } from '../../../../services/categoriesService'
import { notificationSuccess } from '../../../../utils/Notification'
import TextArea from 'antd/lib/input/TextArea'

const CreateCategory = ({
  openAddForm,
  setOpenAddForm,
  setLoading,
  setRefetch,
}) => {
  const [form] = Form.useForm()

  const onReset = () => {
    form.resetFields()
  }

  const handleAddCategory = (value) => {
    const params = {
      categoryName: value.categoryName,
      questionRequest: value.questionRequest,
      createdAt: moment(Date.now()).format('YYYY/MM/DD'),
    }
    setLoading(true)
    createCategories(
      params,
      () => {
        setRefetch(Date.now())
        setLoading(false)
        notificationSuccess('Create successfully')
      },
      (error) => {
        console.log(error)
        setLoading(false)
      }
    )
    setOpenAddForm(false)
    onReset()
  }

  return (
    <Modal
      title="Add category"
      open={openAddForm}
      onCancel={() => {
        setOpenAddForm(false)
      }}
    >
      <Form
        onFinish={handleAddCategory}
        form={form}
        className="align-item-center"
      >
        <div className="col-lg-12">
          <label className="quest-label mb-2" htmlFor="categoryName">
            Category Name
          </label>
          <Form.Item
            style={{ width: '100%' }}
            name="categoryName"
            initialValue=""
            rules={[
              {
                required: true,
                message: 'Please input your category name!',
              },
              {
                max: 50,
                message: 'Category name too long!',
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
            style={{ width: '100%' }}
            name="questionRequest"
            initialValue=""
          >
            <TextArea rows={4} placeholder="Enter question request" />
          </Form.Item>
        </div>

        <div className="col-lg-12">
          <Form.Item>
            <Button htmlType="submit" className="btn-dashboard mt-2">
              Add
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
}

export default CreateCategory
