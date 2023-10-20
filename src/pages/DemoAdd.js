// import {
//   Space,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   InputNumber,
//   Select,
// } from "antd";
// import {
//   EyeOutlined,
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   ExclamationCircleOutlined,
// } from "@ant-design/icons";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const onChange = (value) => {
//   console.log(`selected ${value}`);
// };
// const onSearch = (value) => {
//   console.log("search:", value);
// };

// const { confirm } = Modal;
// const { Column, ColumnGroup } = Table;

// // add new make & modal is here
// const ProductsCreateForm = ({ open, onCreate, onCancel }) => {
//   const [productsForm] = Form.useForm();
//   const onGenderChange = (value) => {
//     switch (value) {
//       case "TrendingProducts":
//         productsForm.setFieldsValue({
//           note: "Hi, man!",
//         });
//         return;
//       case "BestSoftware":
//         productsForm.setFieldsValue({
//           note: "Hi, lady!",
//         });
//         return;
//       case "other":
//         productsForm.setFieldsValue({
//           note: "Hi there!",
//         });
//     }
//   };
//   return (
//     <Modal
//       open={open}
//       title="Create New Product"
//       okText="Create"
//       cancelText="Cancel"
//       onCancel={onCancel}
//       onOk={() => {
//         productsForm
//           .validateFields()
//           .then((values) => {
//             productsForm.resetFields();
//             onCreate(values);
//           })
//           .catch((info) => {
//             console.log("Validate Failed:", info);
//           });
//       }}
//     >
//       <Form
//         form={productsForm}
//         layout="vertical"
//         name="productsForm_in_modal"
//         initialValues={{
//           modifier: "public",
//         }}
//       >
//         <Form.Item
//           name="name"
//           label="Product Name"
//           rules={[
//             {
//               required: true,
//               message: "Please enter product name",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="mainCategory"
//           label="Main Category"
//           rules={[
//             {
//               required: true,
//               message: "Please select main category",
//             },
//           ]}
//         >
//           <Select
//             defaultValue="TrendingProducts"
//             style={{
//               width: "100%",
//             }}
//             placeholder="Select a option and change value automatically below"
//             onChange={onGenderChange}
//             allowClear
//             options={[
//               {
//                 value: "TrendingProducts",
//                 label: "TrendingProducts",
//               },
//               {
//                 value: "BestSoftware",
//                 label: "BestSoftware",
//               },
//               {
//                 value: "GiftCards",
//                 label: "GiftCards",
//               },
//               {
//                 value: "SummerPlay",
//                 label: "SummerPlay",
//               },
//             ]}
//           />
//         </Form.Item>
//         <Form.Item
//           name="subCategory"
//           label="Sub Category"
//           placeholder="Select a main category first"
//           rules={[
//             {
//               required: true,
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="oldPrice"
//           label="Old Price"
//           rules={[
//             {
//               required: true,
//               message: "Please enter old price",
//             },
//           ]}
//         >
//           <InputNumber
//             prefix="$"
//             type="number"
//             style={{
//               width: "100%",
//             }}
//           />
//         </Form.Item>
//         <Form.Item
//           name="newPrice"
//           label="New Price"
//           rules={[
//             {
//               required: true,
//               message: "Please enter new price",
//             },
//           ]}
//         >
//           <InputNumber
//             prefix="%"
//             type="number"
//             style={{
//               width: "100%",
//             }}
//           />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// const Products = () => {
//   // make & model list get from here
//   const [products, setProducts] = useState([]);
//   const newProducts = [];
//   [...products].reverse().map((product) => newProducts.push(product));
//   const getProducts = async () => {
//     try {
//       fetch("https://netflix-server-production-49ea.up.railway.app/api/v1/product")
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data);
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//   });

//   let lastKey = parseInt(products[products.length - 1]?.key) + 1;

//   // delete model is open
//   const showConfirm = (id) => {
//     confirm({
//       title: "Do you Want to delete these items?",
//       icon: <ExclamationCircleOutlined />,
//       content:
//         "After click on delete then your item will be delete permanently.",
//       okText: "Delete",
//       okType: "danger",

//       onOk() {
//         fetch(`https://netflix-server-production-49ea.up.railway.app/api/v1/product/${id}`, {
//           method: "DELETE",
//           headers: {
//             "content-type": "application/json",
//           },
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             toast.success("Credits Deleted Successfully", {
//               autoClose: 1000,
//             });
//             getProducts();
//           });
//       },

//       onCancel() {
//         console.log("Cancel");
//       },
//     });
//   };

//   const [open, setOpen] = useState(false);
//   const onCreate = (values) => {
//     console.log(values);
//     let newValues = { ...values, key: lastKey ? lastKey : 1 };
//     fetch("https://netflix-server-production-49ea.up.railway.app/api/v1/product", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(newValues),
//     })
//       .then((res) => res.json())
//       .then((json) => {
//         toast.success("Successfully Product Create!", {
//           autoClose: 1000,
//         });
//         getProducts();
//         setOpen(false);
//       });
//   };

//   // edit make & model
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingProducts, setEditingProducts] = useState(null);

//   const editMakeModal = (record) => {
//     setIsEditing(true);
//     setEditingProducts({ ...record });
//     console.log(record._id);
//   };

//   return (
//     <div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "30px",
//         }}
//       >
//         <h1>Create Special Credits</h1>
//         <div>
//           <div style={{ marginRight: "10px" }}>
//             <Button
//               type="primary"
//               onClick={() => {
//                 setOpen(true);
//               }}
//             >
//               <PlusOutlined style={{ marginRight: "5px" }} />
//               Add Credits
//             </Button>
//             <ProductsCreateForm
//               open={open}
//               onCreate={onCreate}
//               onCancel={() => {
//                 setOpen(false);
//               }}
//             />
//           </div>
//         </div>
//       </div>
//       <div style={{ marginTop: "30px" }}>
//         <Table dataSource={newProducts}>
//           <Column title="Name" dataIndex="name" key="name" />
//           <Column
//             title="Main Category"
//             dataIndex="mainCategory"
//             key="mainCategory"
//           />
//           <Column
//             title="Sub Category"
//             dataIndex="subCategory"
//             key="subCategory"
//           />
//           <Column title="Old Price" dataIndex="oldPrice" key="oldPrice" />
//           <Column title="New Price" dataIndex="newPrice" key="newPrice" />
//           <Column
//             title="Action"
//             key="action"
//             width="100px"
//             render={(_, record) => (
//               <Space size="middle">
//                 <Button type="primary" onClick={() => editMakeModal(record)}>
//                   <EditOutlined />
//                 </Button>
//                 <Button type="danger" onClick={() => showConfirm(record._id)}>
//                   <DeleteOutlined />
//                 </Button>
//               </Space>
//             )}
//           />
//         </Table>
//         <Modal
//           title="Edit Price List"
//           okText="Save"
//           visible={isEditing}
//           onCancel={() => {
//             setIsEditing(false);
//           }}
//           onOk={() => {
//             const editingData = {
//               description: editingProducts.description,
//               oldPrice: editingProducts.oldPrice,
//               newPrice: editingProducts.newPrice,
//             };
//             fetch(
//               `https://tuning-server-production.up.railway.app/api/v1/buyCredits/${editingProducts._id}`,
//               {
//                 method: "PATCH",
//                 headers: {
//                   "content-type": "application/json",
//                 },
//                 body: JSON.stringify(editingData),
//               }
//             )
//               .then((res) => res.json())
//               .then((json) => {
//                 toast.success("Credits Update Successfully", {
//                   autoClose: 1000,
//                 });
//                 setIsEditing(false);
//                 getProducts();
//               });
//           }}
//         >
//           <Form
//             layout="vertical"
//             initialValues={{
//               modifier: "public",
//             }}
//           >
//             <Form.Item label="Description">
//               <Input
//                 value={editingProducts?.description}
//                 onChange={(e) => {
//                   setEditingProducts((pre) => {
//                     return { ...pre, description: e.target.value };
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item label="Price">
//               <Input
//                 prefix="$"
//                 type="number"
//                 style={{
//                   width: "100%",
//                 }}
//                 value={editingProducts?.oldPrice}
//                 onChange={(e) => {
//                   setEditingProducts((pre) => {
//                     return { ...pre, oldPrice: parseInt(e.target.value) };
//                   });
//                 }}
//               />
//             </Form.Item>
//             <Form.Item label="Vat">
//               <Input
//                 prefix="$"
//                 type="number"
//                 style={{
//                   width: "100%",
//                 }}
//                 value={editingProducts?.newPrice}
//                 onChange={(e) => {
//                   setEditingProducts((pre) => {
//                     return { ...pre, newPrice: parseInt(e.target.value) };
//                   });
//                 }}
//               />
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Products;
