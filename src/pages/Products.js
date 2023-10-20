import {
  Space,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import {
  EyeOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const { confirm } = Modal;
const { Column, ColumnGroup } = Table;

// add new make & modal is here
const ProductsCreateForm = ({ open, onCreate, onCancel }) => {
  const [productsForm] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Create New Product"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        productsForm
          .validateFields()
          .then((values) => {
            productsForm.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={productsForm}
        layout="vertical"
        name="productsForm_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
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
          <Upload
            beforeUpload={(file) => {
              console.log(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Products = () => {
  // make & model list get from here
  const [count, setCount] = useState(false);
  const [products, setProducts] = useState([]);
  const newProducts = [];
  [...products].reverse().map((product) => newProducts.push(product));
  const getProducts = async () => {
    try {
      fetch("https://gcardapi.gcardbuy.com/api/v1/product")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.reverse());
          setCount(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [count]);

  let lastKey = parseInt(products[products.length - 1]?.key) + 1;

  // delete model is open
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`https://gcardapi.gcardbuy.com/api/v1/product/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Credits Deleted Successfully", {
              autoClose: 1000,
            });
            getProducts();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log(values.file.file.name);
    let newValues = { ...values, key: lastKey ? lastKey : 1 };
    fetch("https://gcardapi.gcardbuy.com/api/v1/product", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newValues),
    })
      .then((res) => res.json())
      .then((json) => {
        toast.success("Successfully Product Create!", {
          autoClose: 1000,
        });
        console.log(json);
        getProducts();
        setOpen(false);
      });
  };

  // edit make & model
  const [isEditing, setIsEditing] = useState(false);
  const [editingProducts, setEditingProducts] = useState(null);

  const editMakeModal = (record) => {
    setIsEditing(true);
    setEditingProducts({ ...record });
    console.log(record._id);
  };

  // upload file
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

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>Create Special Credits</h1>
        <div>
          <div style={{ marginRight: "10px" }}>
            <Button
              type="primary"
              // onClick={() => {
              //   setOpen(true);
              // }}
            >
              <Link to="/add_products">
                <PlusOutlined style={{ marginRight: "5px" }} />
                Add Products
              </Link>
            </Button>
            <ProductsCreateForm
              open={open}
              onCreate={onCreate}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "30px", overflowX: "auto" }}>
        <Table dataSource={newProducts}>
          <Column
            title="Image"
            dataIndex="image"
            key="image"
            render={(_, record) => (
              <img
                src={`https://gcardapi.gcardbuy.com/multerFile${record.productImg}`}
                style={{ width: "50px", height: "50px" }}
              />
            )}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Main Category"
            dataIndex="mainCategory"
            key="mainCategory"
          />
          <Column
            title="Sub Category"
            dataIndex="subCategory"
            key="subCategory"
          />
          <Column title="Old Price" dataIndex="oldPrice" key="oldPrice" />
          <Column title="New Price" dataIndex="newPrice" key="newPrice" />
          <Column
            title="Action"
            key="action"
            width="100px"
            render={(_, record) => (
              <Space size="middle">
                <Button type="primary" onClick={() => editMakeModal(record)}>
                  <EditOutlined />
                </Button>
                {/* <Link to={`/edit_products/${record._id}`}>
                  <Button type="primary">
                    <EditOutlined />
                  </Button>
                </Link> */}
                <Button type="danger" onClick={() => showConfirm(record._id)}>
                  <DeleteOutlined />
                </Button>
              </Space>
            )}
          />
        </Table>
        <Modal
          title="Edit Price List"
          okText="Save"
          visible={isEditing}
          onCancel={() => {
            setIsEditing(false);
          }}
          onOk={() => {
            const formData = new FormData();

            fileList.forEach((file) => {
              formData.append("productImg", file);
            });

            formData.append("name", editingProducts.name);
            formData.append("mainCategory", editingProducts.mainCategory);
            formData.append("subCategory", editingProducts.subCategory);
            formData.append("oldPrice", editingProducts.oldPrice);
            formData.append("newPrice", editingProducts.newPrice);

            fetch(
              `https://gcardapi.gcardbuy.com/api/v1/product/${editingProducts._id}`,
              {
                method: "PUT",
                body: formData,
              }
            )
              .then((response) => response.json())
              .then((json) => {
                toast.success("Credits Update Successfully", {
                  autoClose: 1000,
                });
                setIsEditing(false);
                getProducts();
              });
          }}
        >
          <Form
            layout="vertical"
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item label="Description">
              <Input
                value={editingProducts?.name}
                onChange={(e) => {
                  setEditingProducts((pre) => {
                    return { ...pre, name: e.target.value };
                  });
                }}
              />
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
              <SetMainCategory
                onChangeFunction={onChange}
                editingProducts={editingProducts}
                setEditingProducts={setEditingProducts}
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
              <SetSubCategory
                onChangeFunction={onChange}
                editingProducts={editingProducts}
                setEditingProducts={setEditingProducts}
              />
            </Form.Item>
            <Form.Item label="Old Price">
              <Input
                prefix="$"
                type="number"
                style={{
                  width: "100%",
                }}
                value={editingProducts?.oldPrice}
                onChange={(e) => {
                  setEditingProducts((pre) => {
                    return { ...pre, oldPrice: parseFloat(e.target.value) };
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="New Price">
              <Input
                prefix="$"
                type="number"
                style={{
                  width: "100%",
                }}
                value={editingProducts?.newPrice}
                onChange={(e) => {
                  setEditingProducts((pre) => {
                    return { ...pre, newPrice: parseFloat(e.target.value) };
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="File">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

const SetMainCategory = ({
  onChangeFunction,
  editingProducts,
  setEditingProducts,
}) => {
  const [editOption, setEditOption] = useState(null); // Initialize with null

  useEffect(() => {
    // Set the initial value based on editingProducts.mainCategory
    setEditOption({
      value: editingProducts.mainCategory,
      label: editingProducts.mainCategory,
    });
  }, [editingProducts.mainCategory]);

  const mainOption = [
    {
      value: "Netflix",
      label: "Netflix",
    },
    {
      value: "RazerGold",
      label: "Razer Gold",
    },
    {
      value: "Amazon",
      label: "Amazon",
    },
    {
      value: "BinanceUSDT",
      label: "Binance USDT",
    },
    {
      value: "Vanilla",
      label: "Vanilla",
    },
    {
      value: "Steam",
      label: "Steam",
    },
    {
      value: "ITUNES",
      label: "ITUNES",
    },
    {
      value: "VirtualMastercard",
      label: "Virtual Mastercard",
    },
    {
      value: "Walmart",
      label: "Walmart",
    },
  ];

  return (
    <Select
      style={{
        width: "100%",
      }}
      value={editOption}
      onChange={(selectedOption) => {
        setEditOption(selectedOption);
        if (onChangeFunction) {
          onChangeFunction(selectedOption);
        }
        setEditingProducts((pre) => {
          return { ...pre, mainCategory: selectedOption };
        });
      }}
      options={mainOption}
    />
  );
};
const SetSubCategory = ({
  onChangeFunction,
  editingProducts,
  setEditingProducts,
}) => {
  const [editOption, setEditOption] = useState(null); // Initialize with null

  useEffect(() => {
    // Set the initial value based on editingProducts.subCategory
    setEditOption({
      value: editingProducts.subCategory,
      label: editingProducts.subCategory,
    });
  }, [editingProducts.subCategory]);

  const subOption = [
    {
      value: "trendingProducts",
      label: "Trending Products",
    },
    {
      value: "gamingGiftcards",
      label: "Gaming Gift Cards",
    },
    {
      value: "giftCards",
      label: "Gift Cards",
    },
    {
      value: "videoGames",
      label: "Video Games",
    },
    {
      value: "subscriptions",
      label: "Subscriptions",
    },
  ];

  return (
    <Select
      style={{
        width: "100%",
      }}
      value={editOption}
      onChange={(selectedOption) => {
        setEditOption(selectedOption);
        if (onChangeFunction) {
          onChangeFunction(selectedOption);
        }
        setEditingProducts((pre) => {
          return { ...pre, subCategory: selectedOption };
        });
      }}
      options={subOption}
    />
  );
};

export default Products;
