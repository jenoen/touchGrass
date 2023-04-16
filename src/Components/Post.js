import React from "react";
import Style from "./style.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";

function Post() {
  return (
    <div>
      <img
        src="https://cdn.discordapp.com/attachments/1095540680388005959/1096929381433233439/bunny_run.jpg"
        alt="bunnytouchgrass"
        style={{ width: "40px", height: "40px", marginLeft: "330px" }}
      ></img>
      <div class="topnav">
        <input type="text" placeholder="Search.."></input>
        <div style={{ background: "pink", marginTop: "5%", width: "100%" }}>
          <h2
            style={{
              position: "absolute",
              paddingLeft: "10px",
              marginTop: "3px",
            }}
          >
            {" "}
            + Make an Event{" "}
          </h2>
          <h2 style={{ paddingLeft: "75%", paddingTop: "3px" }}> Filters </h2>
        </div>
      </div>
      {/* <div style = {{background: 'green', height: "180px", width: "88%", borderRadius: "50px", marginLeft: "19px", marginTop: "20%" }}> */}
      {/* <div style = {{background: 'white', height: "170px", width: "88%", borderRadius: "50px", marginLeft: "19px", marginTop: "30%"}}> */}
      <div
        className="box"
        style={{
          marginTop: "30px",
          width: "90%",
          marginLeft: "15px",
          borderRadius: "20px",
          height: "130px",
        }}
      >
        <h1 style={{ marginLeft: "-100px", marginTop: "-48px" }}>
          {" "}
          Run Downtown LA{" "}
        </h1>
        <div style={{ marginTop: "40px" }}>
          <h2> Sun 05/14 </h2>
          <h2> 10 miles </h2>
          <h2> Westwood, LA </h2>
          <br></br>
          <img src="https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cnVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" />
          <h2> Host: Still Run </h2>
          <h2> Non-profit: NAMI </h2>
          <h2> Raises $2.40/mile</h2>
        </div>
      </div>

      <div
        className="box"
        style={{
          marginTop: "30px",
          width: "90%",
          marginLeft: "15px",
          borderRadius: "20px",
          height: "130px",
        }}
      >
        <h1 style={{ marginLeft: "-100px", marginTop: "115px" }}>
          {" "}
          Undie Run{" "}
        </h1>
        <div style={{ marginTop: "40px" }}>
          <h2> Sun 05/14 </h2>
          <h2> 10 miles </h2>
          <h2> Westwood, LA </h2>
          <br></br>
          <img src="https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cnVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" />
          <h2> Host: Frats </h2>
          <h2> Non-profit: NAMI </h2>
          <h2> Raises $2.40/mile</h2>
        </div>
      </div>

      <div
        className="box"
        style={{
          marginTop: "30px",
          width: "90%",
          marginLeft: "15px",
          borderRadius: "20px",
          height: "130px",
        }}
      >
        <h1 style={{ marginLeft: "-100px", marginTop: "275px" }}>
          {" "}
          Run For My Life{" "}
        </h1>
        <div style={{ marginTop: "40px" }}>
          <h2> Sun 05/144444444 </h2>
          <h2> 10 miles </h2>
          <h2> Westwood, LA </h2>
          <br></br>
          <img src="https://images.unsplash.com/flagged/photo-1556746834-cbb4a38ee593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cnVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" />
          <h2> Host: UCLA </h2>
          <h2> Non-profit: NAMI </h2>
          <h2> Raises $2.40/mile</h2>
        </div>
      </div>
    </div>
  );
}

export default Post;
