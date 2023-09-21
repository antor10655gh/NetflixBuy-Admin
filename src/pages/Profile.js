import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import { useParams } from "react-router-dom";
import SingleProfile from "../components/shared/profile/SingleProfile";

function Profile() {
  const [profile, setProfile] = useState({});
  const { id } = useParams();

  const token = JSON.parse(localStorage.getItem("token"));
  //chat.linkfy.org/api/v1/user/${id}
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/user/${id}`, {
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

  return (
    <>
      <SingleProfile profile={profile} />
    </>
  );
}

export default Profile;
