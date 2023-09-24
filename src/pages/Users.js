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

function Users() {
  const [count, setCount] = useState(false);
  const [users, setUsers] = useState([]);
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

  const getUsers = async () => {
    try {
      fetch("http://31.172.83.135:5656/api/v1/user")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [count]);

  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content:
        "After click on delete then your item will be delete permanently.",
      okText: "Delete",
      okType: "danger",

      onOk() {
        fetch(`http://31.172.83.135:5656/api/v1/user/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("User Deleted Successfully", {
              autoClose: 1000,
            });
            getUsers();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
                  <Table dataSource={users} className="ant-border-space">
                    <Column title="Name" dataIndex="name" key="name" />
                    <Column
                      title="Email"
                      dataIndex="email"
                      key="email"
                      {...getColumnSearchProps("email")}
                    />
                    <Column
                      title="View"
                      key="view"
                      render={(_, record) => (
                        <Space size="middle">
                          <Button
                            style={{
                              lineHeight: 0,
                              background: "#941B1F",
                              border: "none",
                            }}
                            type="primary"
                          >
                            <Link to={`/users`}>
                              <EyeOutlined style={{ fontSize: "18px" }} />
                            </Link>
                          </Button>
                          <Button
                            style={{ lineHeight: 0 }}
                            type="danger"
                            onClick={() => showConfirm(record._id)}
                          >
                            <DeleteOutlined style={{ fontSize: "18px" }} />
                          </Button>
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

export default Users;
