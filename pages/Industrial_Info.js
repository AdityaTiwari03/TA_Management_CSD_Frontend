import React from "react";
import TALayout from "./layout";
import per from "../styles/Personal.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Industrial_Info() {
  const [formData, setFormData] = useState({
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
  const router = useRouter();
  const { idNumber } = router.query;
  useEffect(() => {
    const storedData = sessionStorage.getItem("industrialFormData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Effect to update sessionStorage when form data changes
  useEffect(() => {
    sessionStorage.setItem("industrialFormData", JSON.stringify(formData));
  }, [formData]);
  const fetchData = async () => {
    try {
      if (idNumber) {
        const response = await axios.get(
          `http://localhost:8000/api/v1/users/info/?idNumber=${idNumber}`
        );
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [idNumber]);

  const handleProfessional = async () => {
    router.push(`/Professional_Info?idNumber=${idNumber}`);
  };
  const navigateToTADashboard = () => {
    router.push("/TA/course_feed");
  };
  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const data = {
        idNumber: idNumber,
        areaOfSpecialisation: formData.areaOfSpecialisation,
        primaryProgrammingSkills: formData.primaryProgrammingSkills,
        secondaryProgrammingSkills: formData.secondaryProgrammingSkills,
        primarySkills: formData.primarySkills,
        secondarySkills: formData.secondarySkills,
        softwareTools: formData.softwareTools,
        hardwareTools: formData.hardwareTools,
        publications: formData.publications,
        patents: formData.patents,
      };

      const response = await axios.post(
        `http://localhost:8000/api/v1/users/Industrial_Info`,
        data
      );

      console.log(response.data);

      if (response.data.statusCode === 200 && response.data.success) {
        navigateToTADashboard();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (field, index, value) => {
    const data = { ...formData };
    data[field][index] = value;
    setFormData(data);
  };

  const handleAddInput = (field) => {
    if (formData[field].length < 2) {
      const data = { ...formData };
      data[field].push("");
      setFormData(data);
    }
  };

  const handleRemoveInput = (field, index) => {
    if (formData[field].length > 1) {
      const data = { ...formData };
      data[field].splice(index, 1);
      setFormData(data);
    }
  };

  // const handleSubmit = () => {
  //   console.log(formData);
  // };
  return (
    <TALayout>
      <div className="main">
        <div className={per.whitebox}>
          <div className={per.head}>Industrial Information</div>
          <div className={per.industrialContainer}>
            <div className={per.IndInfo}>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Area of Specialisation </div>
                {formData.areaOfSpecialisation.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "areaOfSpecialisation",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {formData.areaOfSpecialisation.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("areaOfSpecialisation", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.areaOfSpecialisation.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("areaOfSpecialisation")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={per.IndInfo}>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Primary Skills </div>
                {formData.primarySkills.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "primarySkills",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {formData.primarySkills.length > 1 && (
                        <div
                          className={per.remove}
                          onClick={() =>
                            handleRemoveInput("primarySkills", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.primarySkills.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("primarySkills")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Secondary Skills </div>
                {formData.secondarySkills.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "secondarySkills",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.secondarySkills.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("secondarySkills", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.secondarySkills.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("secondarySkills")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={per.IndInfo}>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Primary Programming Skills </div>
                {formData.primaryProgrammingSkills.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "primaryProgrammingSkills",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.primaryProgrammingSkills.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("primaryProgrammingSkills", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.primaryProgrammingSkills.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleAddInput("primaryProgrammingSkills")
                          }
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Secondary Programming Skills </div>
                {formData.secondaryProgrammingSkills.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "secondaryProgrammingSkills",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.secondaryProgrammingSkills.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput(
                              "secondaryProgrammingSkills",
                              index
                            )
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.secondaryProgrammingSkills.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleAddInput("secondaryProgrammingSkills")
                          }
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={per.IndInfo}>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Software Tools </div>
                {formData.softwareTools.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "softwareTools",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.softwareTools.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("softwareTools", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.softwareTools.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("softwareTools")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Hardware Tools </div>
                {formData.hardwareTools.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange(
                          "hardwareTools",
                          index,
                          e.target.value
                        )
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.hardwareTools.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("hardwareTools", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.hardwareTools.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("hardwareTools")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={per.IndInfo}>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Patents </div>
                {formData.patents.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange("patents", index, e.target.value)
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.patents.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() => handleRemoveInput("patents", index)}
                        >
                          -
                        </div>
                      )}
                      {formData.patents.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("patents")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={per.IndustrialEntries}>
                {" "}
                <div className={per.label}> Publications </div>
                {formData.publications.map((value, index) => (
                  <div key={index}>
                    <input
                      className={per.input_Ind}
                      value={value}
                      onChange={(e) =>
                        handleInputChange("publications", index, e.target.value)
                      }
                    />
                    <div className={per.addContainer}>
                      {" "}
                      {formData.publications.length > 1 && (
                        <div
                          className={per.add}
                          onClick={() =>
                            handleRemoveInput("publications", index)
                          }
                        >
                          -
                        </div>
                      )}
                      {formData.publications.length < 2 && (
                        <div
                          className={per.add}
                          onClick={() => handleAddInput("publications")}
                        >
                          +
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={per.buttons}>
            <button className={per.button} onClick={handleNext}>
              Save
            </button>{" "}
            <button className={per.button} onClick={handleProfessional}>
              Back
            </button>
          </div>
        </div>
      </div>
    </TALayout>
  );
}
