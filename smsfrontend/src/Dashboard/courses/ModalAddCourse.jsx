import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { MultiSelect } from "react-multi-select-component";

const ModalAddCourse = ({ open, handleOpen, getCourseList }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [instructorData, setInstructorData] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [instructor, setInstructor] = useState([]);
  const [level, setLevel] = useState("");
  const [lessons, setLessons] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState(2);
  const [status, setStatus] = useState("active");

  // Editor
  const editor = useRef(null);

  useEffect(() => {
    getCategoryList();
    getInstructorList();
  }, []);

  const getCategoryList = () => {
    fetch(baseurl + "/api/category ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setCategoryData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInstructorList = () => {
    fetch(baseurl + "/api/instructor", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setInstructorData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("level", level);
    formData.append("lessons", lessons);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("rating", rating);
    formData.append("category", category);
    formData.append("instructor", JSON.stringify(instructor));
    formData.append("status", status);

    // Post Api For Posting Data
    fetch(baseurl + "/api/course", {
      method: "POST",
      body: formData, // Send formData directly
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Course Added Successfully");
        getCourseList();
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });

    // Empty the value of fields
    setImg("");
    setTitle("");
    setDesc("");
    setLevel("");
    setLessons("");
    setDuration("");
    setPrice("");
    setCategory("");
    setInstructor("");
  };

  return (
    <>
      <Dialog
        open={open}
        // handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Add Course
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Course Name */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="course-name"
                >
                  Course Title
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="course-name"
                  type="text"
                  placeholder="e.g., CCC"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              {/* Category */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Course Category
                </label>
                <Select
                  id="category"
                  label="Select Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e);
                  }}
                >
                  {categoryData.map((item) => {
                    return <Option value={item.name}>{item.name}</Option>;
                  })}
                </Select>
              </div>
              {/* Instructor */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Instructor
                </label>

                <MultiSelect
        options={instructorData.map((item)=>({
           label:item.name,
            value:item._id
        }))}
        value={instructor}
        onChange={setInstructor}
        labelledBy="Select"
      />

              </div>
              {/* Course Level */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="level"
                >
                  Course Level
                </label>
                <div className="flex gap-2 flex-wrap">
                  <Radio
                    id="Beginner"
                    name="type"
                    label="Beginner"
                    onChange={(e) => {
                      setLevel("Beginner");
                    }}
                  />
                  <Radio
                    id="intermediate"
                    name="type"
                    label="Intermediate"
                    onChange={(e) => {
                      setLevel("Intermediate");
                    }}
                  />
                  <Radio
                    id="advanced"
                    name="type"
                    label="Advanced"
                    onChange={(e) => {
                      setLevel("Advanced");
                    }}
                  />
                </div>
              </div>
              {/* Total Lessons */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lessons"
                >
                  Total Lessons
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lessons"
                  type="number"
                  placeholder="9"
                  value={lessons}
                  onChange={(e) => {
                    setLessons(e.target.value);
                  }}
                />
              </div>
              {/* img */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="img"
                >
                  Course img
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="img"
                  type="file"
                  // value={img}
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                  }}
                />
              </div>
              {/* Description */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lessons"
                >
                  Course Description
                </label>
                <Textarea
                  resize={true}
                  label="Message"
                  value={desc}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}
                />
                {/* <JoditEditor
                  ref={editor}
                  value={desc}
                  onChange={(value) => setDesc(value)}
                /> */}
              </div>
              {/* Status */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  <Radio
                    id="Active"
                    name="status"
                    label="Active"
                    value="active"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    defaultChecked
                  />
                  <Radio
                    id="Paused"
                    name="status"
                    label="Paused"
                    value="paused"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </div>
              </div>
              {/* Course Price */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="price"
                >
                  Course Price
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="price"
                  type="number"
                  placeholder="200"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              {/* Duration */}
              <div className="w-full md:w-1/2 px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="duration"
                >
                  Duration
                </label>
                <input
                  className="scroll-smooth appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="p-2 bg-[var(--theme-color)] rounded-lg text-white hover:bg-[var(--secondary-color)] cursor-pointer transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          {/* <Button variant="gradient" color="blue" onClick={onSubmitClick}>
            <span>Save</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalAddCourse;
