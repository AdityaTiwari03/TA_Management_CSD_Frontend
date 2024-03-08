import React from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
export default function Professional_Info() {
  const [Designation, Set_Designation] = useState("hello");
  const [Department, Set_Department] = useState("world");
  const [Summary, setSummary] = useState("");
  const [experienceList, setExperienceList] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      companyName: "Google",
      industry: "IT",
      post: "CEO",
    },
  ]);

  const handleExperienceChange = (index, field, value) => {
    const list = [...experienceList];
    list[index][field] = value;
    setExperienceList(list);
  };

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
  return (
    <TALayout>
      <div className="main">
        <div className={per.whitebox}>
          <div className={per.head}>Professional Information</div>
          <div className={per.ProInfo}>
            <div className={per.Designation}>
              {" "}
              <div className={per.label}> Designation </div>
              <input
                className={per.input}
                placeholder="Designation"
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
              <div className={per.label}> Department </div>
              <input
                className={per.input}
                placeholder="Department"
                value={Department}
                onChange={(event) => {
                  Set_Department(event.target.value);
                }}
                type="text"
                required
              />
            </div>
          </div>
          <div className={per.Experience}>
            <div className={per.label}> Experience </div>
            {experienceList.map((exp, index) => (
              <div key={index}>
                <div
                  className={per.input}
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
            <Link href="/Industrial_Info" className={per.link}>
              <button className={per.button}>Next</button>
            </Link>
            <Link href="/Personal_Info" className={per.link}>
              {" "}
              <button className={per.button}>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </TALayout>
  );
}
