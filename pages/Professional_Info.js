import React, { useState, useEffect } from "react";
import axios from "axios";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";

export default function Professional_Info() {
  const [Designation, Set_Designation] = useState("");
  const [Department, Set_Department] = useState("");
  const [Summary, setSummary] = useState("");
  // const [educationList, seteducationList] = useState({
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   collegeName: "",
  //   branch: "",
  //   course: "",
  // });
  const [experienceList, setExperienceList] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      companyName: "",
      industry: "",
      post: "",
    },
  ]);

  const [projectList, setprojectList] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      title: "",
      skills: "",
      description: "",
    },
  ]);
  const router = useRouter();
  const { idNumber } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/info/?idNumber=${idNumber}`
        );
        console.log("/////////////////////////////////////////////");
        console.log(response.data);
        console.log("/////////////////////////////////////////////");

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (idNumber) {
      fetchData();
    }
  }, []);

  const handleExperienceChange = (index, field, value) => {
    const list = [...experienceList];
    list[index][field] = value;
    setExperienceList(list);
  };
  const handleprojectChange = (index, field, value) => {
    const list = [...projectList];
    list[index][field] = value;
    setprojectList(list);
  };

  // const handleEducationChange = (field, value) => {
  //   const list = [...educationList];
  //   list[field] = value;
  //   seteducationList(list);
  // };
  const handleExperienceAdd = () => {
    setExperienceList([
      ...experienceList,
      {
        startDate: new Date(),
        endDate: new Date(),
        companyName: "",
        industry: "",
        post: "",
      },
    ]);
  };

  const handleExperienceRemove = (index) => {
    const list = [...experienceList];
    list.splice(index, 1);
    setExperienceList(list);
  };
  const handleprojectAdd = () => {
    setprojectList([
      ...projectList,
      {
        startDate: new Date(),
        endDate: new Date(),
        title: "",
        skills: "",
        description: "",
      },
    ]);
  };

  const handleprojectRemove = (index) => {
    const list = [...projectList];
    list.splice(index, 1);
    setprojectList(list);
  };
  useEffect(() => {
    const storedData = sessionStorage.getItem("professionalFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Set_Designation(parsedData.Designation);
      Set_Department(parsedData.Department);
      setSummary(parsedData.Summary);
      // seteducationList(parsedData.educationList);
      setExperienceList(parsedData.experienceList);
      setprojectList(parsedData.projectList);
    }
  }, []);

  // Effect to update sessionStorage when form data changes
  useEffect(() => {
    const formData = {
      Designation,
      Department,
      Summary,
      // educationList,
      experienceList,
      projectList,
    };
    sessionStorage.setItem("professionalFormData", JSON.stringify(formData));
  }, [
    Designation,
    Department,
    Summary,
    // educationList,
    experienceList,
    projectList,
  ]);

  // const handleNext = () => {
  //   const data = {};
  // };

  const navigateToIndustry = (idNumber) => {
    router.push(`/Industrial_Info?idNumber=${idNumber}`);
    sessionStorage.setItem;
  };
  const navigateToPersonal = (idNumber) => {
    router.push(`/Personal_Info?idNumber=${idNumber}`);
  };
  const handleIndustry = async (e) => {
    console.log(idNumber);
    e.preventDefault();
    try {
      const resp = await axios.get(
        `http://localhost:8000/api/v1/users/Professional_Info_status/?idNumber=${idNumber}`
      );
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const data = {
        idNumber: idNumber,
        designation: Designation,
        department: Department,
        experience: experienceList,
        profileSummary: Summary,
      };
      console.log(data);
      const resp = await axios.post(
        `http://localhost:8000/api/v1/users//update/?idNumber=${idNumber} `,
        data
      );
      console.log(resp.data);
      if (resp.data.statusCode === 200 && resp.data.success) {
        navigateToIndustry(idNumber);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePersonal = () => {
    console.log(idNumber);
    navigateToPersonal(idNumber);
  };

  return (
    <TALayout>
      <div className="main">
        <div className={per.whitebox}>
          <div className={per.head}>Professional Information</div>
          <div className={per.ProInfo}>
            <div className={per.Designation}>
              {" "}
              <div className={per.label}> Job Title </div>
              <input
                className={per.input}
                placeholder="Job Title"
                value={Designation}
                onChange={(event) => {
                  Set_Designation(event.target.value);
                }}
                type="text"
                required
              />
            </div>
            <div className={per.Department}>
              {" "}
              <div className={per.label}> Organisation's Name </div>
              <input
                className={per.input}
                placeholder="Organisation's Name"
                value={Department}
                onChange={(event) => {
                  Set_Department(event.target.value);
                }}
                type="text"
                required
              />
            </div>
          </div>

          <div className={per.Education}>
            <div className={per.label}> Education (Latest) </div>
            <div
              className={per.input}
              // placeholder={exp.companyName}
              style={{
                display: "flex",
                flexDirection: "column",
                fontWeight: "normal",
                gap: 12,
                paddingTop: 15,
                paddingBottom: 15,
                fontSize: 2,
              }}
            >
              <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-4 ">
                <div className="flex  gap-4 justify-between md:justify-start">
                  <label className={per.label_Professional}>To</label>
                  <DatePicker
                    className={per.inputExperience}
                    // selected={educationList.startDate}
                    onChange={(date) =>
                      handleExperienceChange("startDate", date)
                    }
                    required
                  />{" "}
                </div>
                <div className="flex align-middle gap-4 justify-between md:justify-start">
                  <label className={per.label_Professional}>From</label>
                  <DatePicker
                    className={per.inputExperience}
                    // selected={educationList.endDate}
                    onChange={(date) => handleExperienceChange("endDate", date)}
                    required
                  />{" "}
                </div>
              </div>
              {/* <div className="flex align-middle gap-4 justify-between md:justify-start">
                <label className={per.label_Professional}>College Name</label>
                <input
                  className={per.inputExperience}
                  value={educationList.collegeName}
                  style={{ width: "80%" }}
                  placeholder="IIT Bhilai"
                  onChange={(event) =>
                    handleEducationChange("collegeName", event.target.value)
                  }
                  required
                />
              </div> */}
              <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-0">
                <div className="flex align-middle justify-between gap-4 w-84">
                  <label className={per.label_Professional}>Branch</label>
                  <input
                    className={per.inputExperience}
                    // value={educationList.branch}
                    style={{ width: 300 }}
                    placeholder="Computer Science and Engineering"
                    onChange={(event) =>
                      handleEducationChange("branch", event.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex align-middle justify-between gap-4">
                  <label className={per.label_Professional}>Course</label>
                  <input
                    className={per.inputExperience}
                    // value={educationList.course}
                    placeholder="BTech"
                    onChange={(event) =>
                      handleEducationChange("course", event.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={per.Experience}>
            <div className={per.label}> Experience </div>
            {experienceList.map((exp, index) => (
              <div key={index}>
                <div
                  className={per.input}
                  // placeholder={exp.companyName}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "normal",
                    gap: 12,
                    paddingTop: 15,
                    paddingBottom: 15,
                    fontSize: 2,
                  }}
                >
                  <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-4 ">
                    <div className="flex  gap-4 justify-between md:justify-start">
                      <label className={per.label_Professional}>To</label>
                      <DatePicker
                        className={per.inputExperience}
                        selected={exp.startDate}
                        onChange={(date) =>
                          handleExperienceChange(index, "startDate", date)
                        }
                        required
                      />{" "}
                    </div>
                    <div className="flex align-middle gap-4 justify-between md:justify-start">
                      <label className={per.label_Professional}>From</label>
                      <DatePicker
                        className={per.inputExperience}
                        selected={exp.endDate}
                        onChange={(date) =>
                          handleExperienceChange(index, "endDate", date)
                        }
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="flex align-middle gap-4 justify-between md:justify-start">
                    <label className={per.label_Professional}>
                      Company Name
                    </label>
                    <input
                      className={per.inputExperience}
                      value={exp.companyName}
                      style={{ width: "80%" }}
                      placeholder="Company Name"
                      onChange={(event) =>
                        handleExperienceChange(
                          index,
                          "companyName",
                          event.target.value
                        )
                      }
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-0">
                    <div className="flex align-middle justify-between gap-4">
                      <label className={per.label_Professional}>Industry</label>
                      <input
                        className={per.inputExperience}
                        value={exp.industry}
                        placeholder="Industry"
                        onChange={(event) =>
                          handleExperienceChange(
                            index,
                            "industry",
                            event.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="flex align-middle justify-between gap-4">
                      <label className={per.label_Professional}>Post</label>
                      <input
                        className={per.inputExperience}
                        value={exp.post}
                        placeholder="Post"
                        onChange={(event) =>
                          handleExperienceChange(
                            index,
                            "post",
                            event.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className={per.addContainer}>
                  {experienceList.length - 1 === index && (
                    <div className={per.add} onClick={handleExperienceAdd}>
                      +
                    </div>
                  )}

                  {experienceList.length !== 1 && (
                    <div
                      className={per.remove}
                      onClick={() => handleExperienceRemove(index)}
                    >
                      -
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={per.Project}>
            <div className={per.label}> Projects </div>
            {projectList.map((exp, index) => (
              <div key={index}>
                <div
                  className={per.input}
                  // placeholder={exp.companyName}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontWeight: "normal",
                    gap: 12,
                    paddingTop: 15,
                    paddingBottom: 15,
                    fontSize: 2,
                  }}
                >
                  <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-4 ">
                    <div className="flex  gap-4 justify-between md:justify-start">
                      <label className={per.label_Professional}>To</label>
                      <DatePicker
                        className={per.inputExperience}
                        selected={exp.startDate}
                        onChange={(date) =>
                          handleprojectChange(index, "startDate", date)
                        }
                        required
                      />{" "}
                    </div>
                    <div className="flex align-middle gap-4 justify-between md:justify-start">
                      <label className={per.label_Professional}>From</label>
                      <DatePicker
                        className={per.inputExperience}
                        selected={exp.endDate}
                        onChange={(date) =>
                          handleprojectChange(index, "endDate", date)
                        }
                        required
                      />{" "}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 justify-between align-middle md:flex-row md:gap-0">
                    <div className="flex align-middle justify-between gap-4">
                      <label className={per.label_Professional}>
                        Project Title
                      </label>
                      <input
                        className={per.inputExperience}
                        value={exp.title}
                        placeholder="Title"
                        onChange={(event) =>
                          handleprojectChange(
                            index,
                            "title",
                            event.target.value
                          )
                        }
                        required
                      />
                    </div>
                    <div className="flex align-middle justify-between gap-4 w-fit">
                      <label className={per.label_Professional}>
                        Skills Used
                      </label>
                      <input
                        className={per.inputExperience}
                        value={exp.skills}
                        style={{ width: 400 }}
                        placeholder="HTML CSS"
                        onChange={(event) =>
                          handleprojectChange(
                            index,
                            "skills",
                            event.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex align-middle gap-4 justify-between md:justify-start">
                    <label className={per.label_Professional}>
                      Project Description
                    </label>
                    <textarea
                      className={per.inputExperience}
                      rows={3}
                      value={exp.description}
                      style={{ width: "80%" }}
                      placeholder="Description"
                      onChange={(event) =>
                        handleprojectChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <div className={per.addContainer}>
                  {projectList.length - 1 === index && (
                    <div className={per.add} onClick={handleprojectAdd}>
                      +
                    </div>
                  )}

                  {projectList.length !== 1 && (
                    <div
                      className={per.remove}
                      onClick={() => handleprojectRemove(index)}
                    >
                      -
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={per.Summary}>
            <div className={per.label}> Profile Summary </div>

            <textarea
              className={per.input}
              rows={6}
              placeholder="Max 400 words"
              value={Summary}
              onChange={(event) => {
                setSummary(event.target.value);
              }}
              type="text"
              maxLength={400}
              required
            />
          </div>
          <br />
          <div className={per.buttons}>
            <button className={per.button} onClick={handlePersonal}>
              Back
            </button>
            <button className={per.button} onClick={handleIndustry}>
              Next
            </button>
          </div>
        </div>
      </div>
    </TALayout>
  );
}
