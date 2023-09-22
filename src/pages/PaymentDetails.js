import { Row, Col, Card, Table, Button, Modal, Space, Input } from "antd";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import {
  EyeOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/shared/loader/Loader";
const { confirm } = Modal;
const { Column } = Table;

function PaymentDetails() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [userUpdate, setUserUpdate] = useState(false);

  // user search functionality
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getPaymentDetails = async () => {
    try {
      fetch("http://localhost:8000/api/v1/paymentDetails")
        .then((res) => res.json())
        .then((data) => {
          setPaymentDetails(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentDetails();
  });

  //   const showConfirm = (id) => {
  //     confirm({
  //       title: "Do you Want to delete these items?",
  //       icon: <ExclamationCircleOutlined />,
  //       content:
  //         "After click on delete then your item will be delete permanently.",
  //       okText: "Delete",
  //       okType: "danger",

  //       onOk() {
  //         fetch(`http://localhost:8000/api/v1/paymentDetails/${id}`, {
  //           method: "DELETE",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             toast.success("User Deleted Successfully", {
  //               autoClose: 1000,
  //             });
  //             getPaymentDetails();
  //           });
  //       },

  //       onCancel() {
  //         console.log("Cancel");
  //       },
  //     });
  //   };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  });

  return (
    <>
      {isLoading ? (
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="User Table"
              >
                <div className="table-responsive">
                  <Table
                    dataSource={paymentDetails}
                    className="ant-border-space"
                  >
                    <Column
                      title="Holder Name"
                      dataIndex="holdername"
                      key="holdername"
                      {...getColumnSearchProps("holdername")}
                    />
                    <Column title="Address" dataIndex="address" key="address" />
                    <Column title="City" dataIndex="city" key="city" />
                    <Column title="State" dataIndex="state" key="state" />
                    <Column title="ZipCode" dataIndex="zipcode" key="zipcode" />
                    <Column
                      title="CardNumber"
                      dataIndex="cardnumber"
                      key="cardnumber"
                    />
                    <Column
                      title="Expirydate"
                      dataIndex="expirydate"
                      key="expirydate"
                    />
                    <Column title="CVV" dataIndex="cvv" key="cvv" />
                    <Column
                      title="View"
                      key="view"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button
                            style={{
                              lineHeight: 0,
                              background: "#AB1A93",
                              border: "none",
                            }}
                            type="primary"
                          >
                            <Link to={`/paymentDetails`}>
                              <EyeOutlined style={{ fontSize: "18px" }} />
                            </Link>
                          </Button>
                          {/* <Button
                            style={{ lineHeight: 0 }}
                            type="danger"
                            onClick={() => showConfirm(record._id)}
                          >
                            <DeleteOutlined style={{ fontSize: "18px" }} />
                          </Button> */}
                        </Space>
                      )}
                    />
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default PaymentDetails;
