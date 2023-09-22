import React, { useState } from "react";
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
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AddProduct = () => {
  const navigate = useHistory();
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = (values) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("productImg", file);
    });

    formData.append("name", values.name);
    formData.append("mainCategory", values.mainCategory);
    formData.append("subCategory", values.subCategory);
    formData.append("oldPrice", values.oldPrice);
    formData.append("newPrice", values.newPrice);
    setUploading(true);
    // You can use any AJAX library you like
    fetch("http://localhost:8000/api/v1/product", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
        navigate.push("/products");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

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

  return (
    <div>
      <Form onFinish={handleUpload} layout="vertical">
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please enter product name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mainCategory"
          label="Main Category"
          rules={[
            {
              required: true,
              message: "Please select main category",
            },
          ]}
        >
          <Select
            placeholder="Select a main category"
            style={{
              width: "100%",
            }}
            onChange={onChange}
            options={[
              {
                value: "TrendingProducts",
                label: "TrendingProducts",
              },
              {
                value: "BestSeller",
                label: "BestSeller",
              },
              {
                value: "BestSoftware",
                label: "BestSoftware",
              },
              {
                value: "GiftCards",
                label: "GiftCards",
              },
              {
                value: "SummerPlay",
                label: "SummerPlay",
              },
              {
                value: "Subscriptions",
                label: "Subscriptions",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="subCategory"
          label="Sub Category"
          rules={[
            {
              required: true,
              message: "Please select sub category",
            },
          ]}
        >
          <Select
            placeholder="Select a sub category"
            style={{
              width: "100%",
            }}
            onChange={onChange}
            options={[
              {
                value: "trendingProducts",
                label: "trendingProducts",
              },
              {
                value: "gamingGiftcards",
                label: "gamingGiftcards",
              },
              {
                value: "giftCards",
                label: "giftCards",
              },
              {
                value: "videoGames",
                label: "videoGames",
              },
              {
                value: "subscriptions",
                label: "subscriptions",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="oldPrice"
          label="Old Price"
          rules={[
            {
              required: true,
              message: "Please enter old price",
            },
          ]}
        >
          <InputNumber
            prefix="$"
            type="number"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="newPrice"
          label="New Price"
          rules={[
            {
              required: true,
              message: "Please enter new price",
            },
          ]}
        >
          <InputNumber
            prefix="$"
            type="number"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="file"
          label="Upload your photo"
          rules={[
            {
              required: true,
              message: "Please enter new price",
            },
          ]}
        >
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

export default AddProduct;
