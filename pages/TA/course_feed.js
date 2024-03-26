import React from "react";
import feed from "./course_feed.module.css";
import Layout from "./layout";

export default function CourseFeed() {
  let CourseList = [];
  console.log(CourseList);
  return (
    <Layout>
      <div className={feed.content}>
        <div className={feed.head}>Course Feed</div>
        <div className={feed.whitebox}>
          <table className={feed.table}>
            <thead>
              <tr>
                <th width={"20%"} className={feed.tableHeader}>
                  Code
                </th>
                <th width={"30%"} className={feed.tableHeader}>
                  Name
                </th>
                <th width={"30%"} className={feed.tableHeader}>
                  Professor
                </th>
                <th width={"20%"} className={feed.tableHeader}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {CourseList.map((course, index) => (
                <tr key={index}>
                  <td>{course.CourseCode}</td>
                  <td>{course.CourseName}</td>
                  <td>{course.ProfessorName}</td>
                  <td>{course.Status}</td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
