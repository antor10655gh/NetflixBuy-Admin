import React, { useEffect, useState } from "react";
import "./SingleProfile.css";
import { Button, Modal, Select, Tabs } from "antd";
import * as timeago from "timeago.js";
import {
  AndroidOutlined,
  ExclamationCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";
const { Option } = Select;

const SingleProfile = () => {
  const [newProfile, setNewProfile] = useState({});
  const [profile, setProfile] = useState({});

  const { id } = useParams();

  const newProfileGet = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:8000/api/v1/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // Update the state with the new profile data
        setProfile(json.data[0]);
        console.log(json);
      });
  };

  useEffect(() => {
    newProfileGet();
  }, [newProfile]);

  const journeyTime = timeago.format(`${profile.createdAt}`, "en_US");

  const journey = journeyTime.replace(" ago", "");

  const email = `${profile.email}`;

  const parts = email.split("@");

  const age = new Date().getFullYear() - new Date(profile.dob).getFullYear();

  const [recording, setRecording] = useState(false);

  const handleRecord = () => {
    setRecording(!recording);
  };

  // handle block function
  const handleBlock = () => {
    const updatedProfile = { ...newProfile, restrictions: "blocked" };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:8000/api/v1/user/update/${profile._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((json) => {
        // Update the state with the new profile data
        setNewProfile(json);
        newProfileGet();
        console.log(json);
      });
  };

  // handle temporary block function
  const handleTemporaryBlock = (timeDuration) => {
    const updatedProfile = { ...newProfile, restrictions: timeDuration };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:8000/api/v1/user/update/${profile._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((json) => {
        // Update the state with the new profile data
        setNewProfile(json);
        newProfileGet();
        console.log(json);
      });
  };

  // handle unlock function
  const handleUnblock = () => {
    const updatedProfile = { ...newProfile, restrictions: "released" };
    const token = JSON.parse(localStorage.getItem("token"));
    fetch(`http://localhost:8000/api/v1/user/update/${profile._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((res) => res.json())
      .then((json) => {
        // Update the state with the new profile data
        setNewProfile(json);
        newProfileGet();
        console.log(json);
      });
  };

  const [selectedDuration, setSelectedDuration] = useState("3_days");

  const showConfirm = (actionName) => {
    const durations = ["3_days", "7_days", "15_days", "30_days"]; // List of available durations

    Modal.confirm({
      title: `Do you want to ${actionName} him/her?`,
      icon: (
        <ExclamationCircleOutlined
          style={{ color: actionName === "block" ? "red" : "green" }}
        />
      ),
      content: `After clicking on Yes, he/she will be ${actionName}.`,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",

      onOk() {
        if (actionName === "block") {
          handleBlock();
        } else if (actionName === "unblock") {
          handleUnblock();
        } else if (actionName === "temp_block") {
          // Show the duration selection when temporary block is clicked
          Modal.info({
            title: "Select Temporary Block Duration",
            content: (
              <Select
                defaultValue={selectedDuration}
                onChange={(value) => setSelectedDuration(value)}
              >
                {durations.map((duration) => (
                  <Option key={duration} value={duration}>
                    {duration}
                  </Option>
                ))}
              </Select>
            ),
            okText: "Confirm",
            onOk() {
              console.log(selectedDuration);
              // Handle temporary block with selectedDuration
              handleTemporaryBlock(selectedDuration);
            },
          });
        }
      },
    });
  };

  const temporaryBlock = {
    lineHeight: 0,
    background: "#76A21E",
    border: "none",
    display: profile.restrictions === "released" ? "none" : "block",
  };

  const recordButton = {
    backgroundColor: recording ? "#D9534F" : "#4CACBC",
    color: "white",
    border: "none",
    display: profile.restrictions === "released" ? "block" : "none",
  };

  return (
    <div>
      <div className="profile">
        <div className="profile-left">
          <div>
            <div className="profile-img">
              <img src={profile.profilePic} alt="" />
            </div>
            <div className="profile-info-container">
              <h1>{profile.userName}</h1>
              <p id="emailContainer">
                <span className="username">{parts[0]}</span>
                <span className="at-symbol">@</span>
                <span className="domain">{parts[1]}</span>
              </p>
              <p>{profile.bio}</p>
              <div className="profile-info">
                <div>
                  <h3>Follower</h3>
                  <p>{profile?.followers?.length}</p>
                </div>
                <div>
                  <h3>Following</h3>
                  <p>{profile?.following?.length}</p>
                </div>
                <div>
                  <h3>Linked</h3>
                  <p>{profile?.linked?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-left-container">
            <div className="profile-list">
              <h1>ID:</h1>
              <p>{profile.uid}</p>
            </div>
            <div className="profile-list">
              <h1>Join Date:</h1>
              <p>{profile.createdAt}</p>
            </div>
            <div className="profile-list">
              <h1>Update Date:</h1>
              <p>{profile.updatedAt}</p>
            </div>
            <div className="profile-list">
              <h1>Last Online:</h1>
              <p>{profile.createdAt}</p>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Overview" key="1">
              <div className="profile-overview">
                <div className="profile-overview-title">
                  <h1>User Properties</h1>
                </div>
                <div className="profile-overview-content">
                  <div className="profile-list">
                    <h1>Name:</h1>
                    <p>{profile.userName}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Email:</h1>
                    <p>{profile.email}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Phone:</h1>
                    <p>{profile.userPhone}</p>
                  </div>
                  <div className="profile-list">
                    <h1>DOB:</h1>
                    <p>{profile.dob}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Age:</h1>
                    <p>{age}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Gender:</h1>
                    <p>{profile.gender}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Relationship:</h1>
                    <p>{profile.relationshipStatus}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Country:</h1>
                    <p>{profile.country}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Avatar URL:</h1>
                    <p>{profile.profilePic}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Join Date:</h1>
                    <p>{profile.createdAt}</p>
                  </div>
                  <div className="profile-list">
                    <h1>Journey:</h1>
                    <p>{journey}</p>
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Login Activity" key="2">
              <p>
                {profile?.userName} *{" "}
                <span style={{ color: "#AB1A93", fontWeight: "bold" }}>
                  Link
                </span>{" "}
              </p>
              <h1>Account login activity</h1>
              <p>You're currently logged in on these devices:</p>
              <div className="account-login-activity-top">
                <div>
                  <AndroidOutlined style={{ fontSize: "30px" }} />
                </div>
                <div className="account-login-activity-top-location">
                  <h3>Realme 8 Pro</h3>
                  <p>Dhaka, Bangladesh</p>
                </div>
                <div>
                  <RightOutlined />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="User Activity" key="3">
              Content of Tab Pane 2
            </Tabs.TabPane>
            <Tabs.TabPane tab="Action" key="4">
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <Button
                  disabled={profile.restrictions === "blocked"}
                  onClick={() => showConfirm("block")}
                  type="danger"
                >
                  {profile.restrictions === "blocked" ? "Blocked" : "Block"}
                </Button>
                <Button
                  onClick={() => showConfirm("temp_block")}
                  disabled={
                    profile.restrictions === "3_days" ||
                    profile.restrictions === "7_days" ||
                    profile.restrictions === "15_days" ||
                    profile.restrictions === "30_days"
                  }
                  type="primary"
                >
                  {profile.restrictions === "3_days" ||
                  profile.restrictions === "7_days" ||
                  profile.restrictions === "15_days" ||
                  profile.restrictions === "30_days"
                    ? "Temporary Blocked"
                    : "Temporary Block"}
                </Button>
                <Button
                  onClick={() => showConfirm("unblock")}
                  style={temporaryBlock}
                  type="primary"
                >
                  Unblock
                </Button>
                <Button
                  style={recordButton}
                  onClick={handleRecord}
                  icon={
                    recording ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                  }
                >
                  {recording ? "Stop Recording" : "Start Recording"}
                </Button>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
