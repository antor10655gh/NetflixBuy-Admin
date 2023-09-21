import {
  CloudDownloadOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tabs } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CallHistory = () => {
  const [profile, setProfile] = useState({});

  const { id } = useParams();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetch(`https://chat.linkfy.org/api/v1/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.data[0]);
        setProfile(json.data[0]);
      });
  }, []);

  const callHistory = {
    incomming: [
      {
        id: 1,
        file: "2022-01-29_john-doe.mp3",
      },
      {
        id: 2,
        file: "2022-05-29_john-doe.mp3",
      },
      {
        id: 3,
        file: "2022-08-29_john-doe.mp3",
      },
      {
        id: 4,
        file: "2021-11-29_john-doe.mp3",
      },
      {
        id: 5,
        file: "2020-08-29_john-doe.mp3",
      },
    ],
    outgoing: [
      {
        id: 1,
        file: "2022-01-29_alu_boti.mp3",
      },
      {
        id: 2,
        file: "2022-05-29_alu_boti.mp3",
      },
      {
        id: 3,
        file: "2022-08-29_alu_boti.mp3",
      },
      {
        id: 4,
        file: "2021-11-29_alu_boti.mp3",
      },
      {
        id: 5,
        file: "2020-08-29_alu_boti.mp3",
      },
    ],
  };

  const [recordingStates, setRecordingStates] = useState({});

  const handleRecord = (userId) => {
    setRecordingStates((prevStates) => ({
      ...prevStates,
      [userId]: !prevStates[userId],
    }));
  };

  return (
    <div>
      <div>
        <h1>
          Call History of
          <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
            "{profile.userName}"
          </span>
        </h1>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Tabs>
          <Tabs.TabPane tab="Incoming History" key="1">
            <Table
              dataSource={callHistory.incomming}
              className="ant-border-space"
            >
              <Column
                title="File"
                key="userName"
                render={(_, record) => <p>{record.file}</p>}
              />
              <Column
                title="Action"
                key="Action"
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
                      <CloudDownloadOutlined style={{ fontSize: "18px" }} />
                    </Button>
                    <Button
                      onClick={() => handleRecord(record.id)}
                      icon={
                        recordingStates[record.id] ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                    >
                      {recordingStates[record.id] ? "Pause" : "Play"}
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Outgoing History" key="2">
            <Table
              dataSource={callHistory.outgoing}
              className="ant-border-space"
            >
              <Column
                title="File"
                key="userName"
                render={(_, record) => <p>{record.file}</p>}
              />
              <Column
                title="Action"
                key="Action"
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
                      <CloudDownloadOutlined style={{ fontSize: "18px" }} />
                    </Button>
                    <Button
                      onClick={() => handleRecord(record.id)}
                      icon={
                        recordingStates[record.id] ? (
                          <PauseCircleOutlined />
                        ) : (
                          <PlayCircleOutlined />
                        )
                      }
                    >
                      {recordingStates[record.id] ? "Pause" : "Play"}
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default CallHistory;
