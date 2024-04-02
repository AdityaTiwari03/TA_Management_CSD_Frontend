import React, { useEffect, useState } from "react";
import TALayout from "./layout";
import dashboard from "./dashboad.module.css";
import img from "../../public/images.jpg";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useRouter } from "next/router";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function Dashboard(ta) {
  const router = useRouter();
  const { idNumber } = router.query;
  ta = true;
  const [TA_Name, set_TA_Name] = useState("");
  const [TA_ID, set_TA_ID] = useState("");
  const [TA_Email, set_TA_Email] = useState("");
  const [TA_Mobile, set_TA_Mobile] = useState("");
  const [TA_Status, set_TA_Status] = useState("Pending");
  const [TA_Department, set_TA_Department] = useState("");
  const [TA_info, set_TA_Info] = useState({
    areaOfSpecialisation: [""],
    primarySkills: [""],
    secondarySkills: [""],
    primaryProgrammingSkills: [""],
    secondaryProgrammingSkills: [""],
    softwareTools: [""],
    hardwareTools: [""],
    publications: [""],
    patents: [""],
  });
  const [experienceList, setExperienceList] = useState([
    {
      startDate: new Date("2022-06-15"),
      endDate: new Date("2023-09-20"),
      companyName: "TechSolutions Inc.",
      industry: "Information Technology",
      post: "Software Engineer",
    },
    {
      startDate: new Date("2020-12-10"),
      endDate: new Date("2022-02-28"),
      companyName: "Global Finance Group",
      industry: "Finance",
      post: "Financial Analyst",
    },
    {
      startDate: new Date("2019-04-05"),
      endDate: new Date("2021-08-15"),
      companyName: "HealthCare Innovations",
      industry: "Healthcare",
      post: "Research Scientist",
    },
  ]);
  [
    {
      startDate: new Date("2015-08-01"),
      endDate: new Date("2017-05-01"),
      collegeName: "XYZ Higher Secondary School",
      branch: "Science",
      course: "Higher Secondary",
    },
    {
      startDate: new Date("2017-08-01"),
      endDate: new Date("2021-05-01"),
      collegeName: "ABC College of Engineering",
      branch: "Computer Science",
      course: "B.Tech",
    },
    {
      startDate: new Date("2021-08-01"),
      endDate: new Date("2023-05-01"),
      collegeName: "DEF Institute of Technology",
      branch: "Data Science",
      course: "M.Tech",
    },
  ];
  const [TA_Education, set_TA_Education] = useState([
    {
      startDate: new Date("2015-08-01"),
      endDate: new Date("2017-05-01"),
      collegeName: "XYZ Higher Secondary School",
      branch: "Science",
      course: "Higher Secondary",
    },
    {
      startDate: new Date("2017-08-01"),
      endDate: new Date("2021-05-01"),
      collegeName: "ABC College of Engineering",
      branch: "Computer Science",
      course: "B.Tech",
    },
    {
      startDate: new Date("2021-08-01"),
      endDate: new Date("2023-05-01"),
      collegeName: "DEF Institute of Technology",
      branch: "Data Science",
      course: "M.Tech",
    },
  ]);
  const [project_List, set_Project_List] = useState([
    {
      startDate: new Date("2024-03-15T00:00:00.000Z"),
      endDate: new Date("2024-04-10T00:00:00.000Z"),
      title: "Website Redesign",
      skills: "UI/UX Design, HTML, CSS, JavaScript",
      description:
        "Redesigning the company website to improve user experience and modernize the design.",
    },
    {
      startDate: new Date("2024-03-20T00:00:00.000Z"),
      endDate: new Date("2024-04-05T00:00:00.000Z"),
      title: "Mobile App Development",
      skills: "React Native, Firebase, API Integration",
      description:
        "Developing a mobile application for both iOS and Android platforms to facilitate easy access to our services.",
    },
    {
      startDate: new Date("2024-03-10T00:00:00.000Z"),
      endDate: new Date("2024-04-15T00:00:00.000Z"),
      title: "Data Analysis Project",
      skills: "Python, Pandas, NumPy, Data Visualization",
      description:
        "Analyzing large datasets to extract meaningful insights for optimizing business processes and decision-making.",
    },
  ]);
  const [Linkedin, Set_Linkedin] = useState("linkedin");
  const [GitHub, Set_Github] = useState("github");
  const [Portfolio, Set_Portfolio] = useState("portfolio");
  const [Other, Set_Other] = useState("otherlink");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log(idNumber);
        const resp2 = await axios.get(
          `https://ta-backend-new.vercel.app/api/v1/users/info/?idNumber=${idNumber} `
        );
        set_TA_Name(resp2.data.data.firstName + " " + resp2.data.data.lastName);
        set_TA_Email(resp2.data.data.email);
        set_TA_Mobile(resp2.data.data.phone);
        set_TA_ID(resp2.data.data.idNumber);
        const resp = await axios.get(
          `https://ta-backend-new.vercel.app/api/v1/users/Professional_Info_status/?idNumber=${idNumber} `
        );
        set_TA_Department(resp.data.data.userInfo.department || "EECS");
        set_TA_Info({
          ...TA_info,
          areaOfSpecialisation: resp2.data.data.userInfo.areaOfSpecialisation,
          primarySkills: resp2.data.data.userInfo.primarySkills,
          secondarySkills: resp2.data.data.userInfo.secondarySkills,
          primaryProgrammingSkills: resp2.data.data.userInfo.primaryProgrammingSkills,
          secondaryProgrammingSkills: resp2.data.data.userInfo.secondaryProgrammingSkills,
          softwareTools: resp2.data.data.userInfo.softwareTools,
          hardwareTools: resp2.data.data.userInfo.hardwareTools,
          publications: resp2.data.data.userInfo.publications,
          patents: resp2.data.data.userInfo.patents,
        });
        const newProjects = resp2.data.data.userInfo.experience.map((exp) => ({
          startDate: new Date(exp.from),
          endDate: new Date(exp.to),
          companyName: exp.companyName,
          industry: exp.industry,
          post: exp.designation,
        }));
        // setExperienceList(newProjects);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TALayout>
      <div className="main">
        <div className={dashboard.whitebox}>
          <div className="flex flex-col md:flex-row w-full">
            <div className={dashboard.photo}>
              <Image
                src={img}
                height={250}
                width={250}
                className={dashboard.img}
              />
            </div>
            <div className={dashboard.info}>
              <div className={dashboard.Ta_name}>{TA_Name}</div>
              <div className={dashboard.Ta_des}>ID : {TA_ID}</div>
              <div className={dashboard.Ta_des}>Email : {TA_Email}</div>
              <div className={dashboard.Ta_des}>Mobile No : {TA_Mobile}</div>
              <div className={dashboard.Ta_des}>Status : {TA_Status}</div>
              <div className={dashboard.Ta_des}>
                Department : {TA_Department}
              </div>
              {ta ? null : <div className={dashboard.Approve}>Approve</div>}
            </div>
          </div>
          <div className="w-full flex gap-5 h-fit">
            <div className={dashboard.container}>
              <div className={dashboard.head}>Industrial Information</div>
              {Object.entries(TA_info).map(([key, value], index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    {key.replace(/([A-Z])/g, " $1").trim()}{" "}
                    {/* Convert camelCase to Title Case */}
                  </AccordionSummary>
                  <AccordionDetails
                    style={{ backgroundColor: "#d9d9d9", color: "#4a3c8d" }}
                  >
                    {Array.isArray(value) ? value.join(", ") : value}
                  </AccordionDetails>
                </Accordion>
              ))}{" "}
            </div>
            <div className={dashboard.container}>
              <div className={dashboard.head}>Experience</div>
              {experienceList.map((experience, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    {experience.post}
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      backgroundColor: "#d9d9d9",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      color: "#4a3c8d",
                    }}
                  >
                    <div>
                      <span>
                        {experience.startDate.toLocaleDateString()} -{" "}
                        {experience.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span>{experience.companyName}</span>
                      <span style={{ marginLeft: "10px" }}>
                        ({experience.industry})
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}{" "}
              <div className={dashboard.head} style={{ marginTop: 30 }}>
                Education
              </div>
              {TA_Education.map((education, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    {education.course}
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      backgroundColor: "#d9d9d9",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      color: "#4a3c8d",
                    }}
                  >
                    <div>
                      <span>
                        {education.startDate.toLocaleDateString()} -{" "}
                        {education.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span>{education.collegeName}</span>
                      <span style={{ marginLeft: "10px" }}>
                        ({education.branch})
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}{" "}
            </div>
          </div>
          <br />
          <div className="flex gap-5 mb-10">
            <div className="w-3/5">
              <div className={dashboard.head}>Projects</div>
              {project_List.map((project, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    style={{ backgroundColor: "#d9d9d9" }}
                  >
                    {project.title}
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      backgroundColor: "#d9d9d9",
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      color: "#4a3c8d",
                    }}
                  >
                    <div>
                      <span>
                        {project.startDate.toLocaleDateString()} -{" "}
                        {project.endDate.toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span>{project.title}</span>
                      <span style={{ marginLeft: "10px" }}>
                        ({project.skills})
                      </span>
                    </div>
                    <div>{project.description}</div>
                  </AccordionDetails>
                </Accordion>
              ))}{" "}
            </div>
            <div className="w-1/4">
              {" "}
              <div className={dashboard.head}>Links</div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#d9d9d9" }}
                >
                  Linkedin
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#d9d9d9",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    color: "#4a3c8d",
                  }}
                >
                  <div>{Linkedin}</div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#d9d9d9" }}
                >
                  Github
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#d9d9d9",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    color: "#4a3c8d",
                  }}
                >
                  <div>{GitHub}</div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#d9d9d9" }}
                >
                  PortFolio
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#d9d9d9",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    color: "#4a3c8d",
                  }}
                >
                  <div>{Portfolio}</div>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: "#d9d9d9" }}
                >
                  Other Links
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "#d9d9d9",
                    border: "none",
                    display: "flex",
                    flexDirection: "column",
                    color: "#4a3c8d",
                  }}
                >
                  <div>{Other}</div>
                </AccordionDetails>
              </Accordion>
            </div>{" "}
          </div>
        </div>{" "}
      </div>
    </TALayout>
  );
}
