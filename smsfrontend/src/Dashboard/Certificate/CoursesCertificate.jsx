import React, { useEffect, useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import { useCertificate } from "../../context/useCertificate";

const CoursesCertificate = ({ back }) => {
  const { courseInfo, GetStudentList, GetCourses, course } = useCertificate();

  const [formData, setFormData] = useState({
    course: null,
    name: "",
    fatherName: "",
    regNo: "",
    date: "",
    address: "",
    options: null,
  });

  const [courseSelect, setCourseSelect] = useState(null);
  const [selectStudent, setSelectStudent] = useState(null);

  useEffect(() => {
    GetCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectCourse = (selectedCourse) => {
    const selected = course?.data?.find(
      (item) => item._id === selectedCourse.value
    );
    setFormData((prevData) => ({
      ...prevData,
      course: selected,
    }));
    setCourseSelect(selectedCourse);
  };

  const handleSelectStudent = (selectedStudent) => {
    const selected = courseInfo?.students?.find(
      (item) => item?._id === selectedStudent?.value
    );
    setFormData((prevData) => ({
      ...prevData,
      student: selected,
    }));
    setSelectStudent(selectedStudent);
  };
  const handleSelectOption = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      options: selectedOption,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PrintCertificate(`/admin/certificate/print-certificate`, {
      state: { formData },
    });
    console.log("Form submitted:", formData);
  };

  const selectedCourseOptions = [
    { label: "O Level", value: "olevel" },
    { label: "Course 2", value: "course2" },
    // Add more courses as needed
  ];

  const SelectOptions = [
    { label: "Credit", value: "credit" },
    { label: "Distinction", value: "distinction" },
    { label: "Excellent", value: "excellent" },
    // Add more courses as needed
  ];

  const PrintCertificate = useNavigate();
  useEffect(() => {
    GetStudentList(formData.course?._id);
  }, [formData.course]);

  return (
    <div>
      <Button onClick={back}>Back to Certificate</Button>
      <div className="p-5 mx-auto max-w-xl">
        <form onSubmit={handleSubmit}>
          {/* Course Select Field */}
          <div className="py-2">
            <Select
              id="course"
              name="course"
              value={courseSelect}
              onChange={handleSelectCourse}
              options={course?.data?.map((item) => ({
                label: item?.title,
                value: item?._id,
              }))}
              placeholder="Select Course"
              isSearchable
            />
          </div>
          <div className="py-2">
            <Select
              id="course"
              name="course"
              value={selectStudent}
              onChange={handleSelectStudent}
              options={courseInfo?.students?.map((item) => ({
                label: item?.name,
                value: item?._id,
              }))}
              placeholder="Select Student"
              isSearchable
            />
          </div>
          <div className="py-2">
            <Input
              type="text"
              id="fatherName"
              name="fatherName"
              value={formData?.student?.fname}
              onChange={handleInputChange}
              label="Father's Name"
              size="regular"
              fullWidth
            />
          </div>
          <div className="py-2">
            <Input
              type="text"
              id="regNo"
              name="regNo"
              value={formData.regNo}
              onChange={handleInputChange}
              label="Registration Number"
              size="regular"
              fullWidth
            />
          </div>
          <div className="py-2">
            <Input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              variant="outlined"
              label="Date"
              size="regular"
              fullWidth
            />
          </div>
          <div className="py-2">
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              size="regular"
              fullWidth
            />
          </div>
          <div className="py-2">
            <Select
              id="course"
              name="course"
              value={formData.options}
              onChange={handleSelectOption}
              options={SelectOptions}
              placeholder="Options"
              isSearchable
              isClearable
            />
          </div>

          <Button
            type="submit"
            buttonType="filled"
            size="lg"
            ripple="light"
            fullWidth
            className="flex justify-center items-center mt-2"
          >
            Submit <MdArrowForward size={20} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CoursesCertificate;
