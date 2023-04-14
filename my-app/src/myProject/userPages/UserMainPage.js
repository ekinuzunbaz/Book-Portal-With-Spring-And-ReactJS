import React from "react";
import jwtDecoder from "jwt-decode";
import "antd/dist/antd.css";
import "../../styles.css";
import { Layout } from "antd";

const { Content } = Layout;

export default function UserMainPage() {
  const decoded = jwtDecoder(localStorage.getItem("token"));
  const userName = decoded.sub;

  let message = null;
  var date = new Date();
  var hour = date.getHours();
  console.log(hour);
  if (hour >= 6 && hour <= 12) {
    message = "Good morning";
  } else if (hour >= 12 && hour < 19) {
    message = "Good afternoon";
  } else {
    message = "Good evening";
  }

  return (
    <Layout style={{ height: "82vh" }}>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <h3>
            {message} {userName}. Please choose an operation from above
          </h3>
        </div>
      </Content>
    </Layout>
  );
}
