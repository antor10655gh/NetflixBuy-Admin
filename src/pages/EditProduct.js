import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const EditProduct = () => {
  const { id } = useParams();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("productImg", file);
    });
    fetch(
      `https://netflixbuy-server-production.up.railway.app/api/v1/product/${id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        message.success("upload successfully.");
        history.push("/products");
      });
  };

  return (
    <div>
      <Form
        onFinish={handleUpload}
        layout="vertical"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item name="file" label="Upload your photo">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
