import React, { useState } from "react";
import add_course from "./Add_Course.module.css";
import Layout from "./layout";

export default function CourseFeed() {
  const [CourseCode, SetCourseCode] = useState("");
  const [CourseName, SetCourseName] = useState("");
  const [ProfessorName, SetProfessorName] = useState("");
  const [CourseList, SetCourseList] = useState([]);
  function removeCourse(index) {
    const updatedCourseList = [...CourseList];
    updatedCourseList.splice(index, 1);
    SetCourseList(updatedCourseList);
  }
  function add() {
    const A = {
      CourseCode: CourseCode,
      CourseName: CourseName,
      ProfessorName: ProfessorName,
      Status: "Pending",
    };
    SetCourseList([...CourseList, A]);
    console.log(CourseList);
  }

  return (
    <Layout>
      <div className={add_course.content}>
        <div className={add_course.head}>Select a Course</div>
        <div className={add_course.inputs}>
          <div className={add_course.input}>
            <div className={add_course.label}>Course Code</div>
            <input
              className={add_course.CourseCode}
              placeholder="CS500"
              value={CourseCode}
              onChange={(event) => {
                SetCourseCode(event.target.value);
              }}
            />
          </div>
          <div className={add_course.input}>
            <div className={add_course.label}>Course Name</div>
            <input
              className={add_course.CourseName}
              placeholder="Machine Learning"
              value={CourseName}
              onChange={(event) => {
                SetCourseName(event.target.value);
              }}
            />
          </div>
          <div className={add_course.input}>
            <div className={add_course.label}>Professor Name</div>
            <input
              className={add_course.ProfessorName}
              placeholder="Gagan Raj Gupta"
              value={ProfessorName}
              onChange={(event) => {
                SetProfessorName(event.target.value);
              }}
            />
          </div>
          <div className={add_course.add} onClick={add}>
            +
          </div>
        </div>
        <div className={add_course.whitebox}>
          <table className={add_course.table}>
            <tbody>
              {CourseList.map((course, index) => (
                <tr key={index}>
                  <td width={"20%"}>{course.CourseCode}</td>
                  <td width={"40%"}>{course.CourseName}</td>
                  <td width={"30%"}>{course.ProfessorName}</td>
                  <td
                    width={"10%"}
                    className={add_course.remove}
                    onClick={() => removeCourse(index)}
                  >
                    -
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
