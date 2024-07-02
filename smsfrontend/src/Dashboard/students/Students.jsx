import React, { useEffect, Fragment, useState } from "react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import AddStudent from "./AddStudent";
import { Checkbox } from "@material-tailwind/react";
import baseurl from "../../Config";
import Student from "./Student";
import Loader from "../../Components/Loader";
import { CSVLink } from "react-csv";
import Pagination from "../../Components/Pagination";
import { GlobalPagination } from "../../Components/GlobalPagination";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import moment from "moment";
import StudenDocument from "./StudenDocument";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Students = ({ updateAuth }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [filterBy, setFilterBy] = useState("all");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [documentopen, setDocumentOpen] = useState(false);
  const navigate = useNavigate();

  const handleDocumentOpen = (data) => {
    setDocumentOpen(!documentopen);
    setSelectedData(data);
  };

  useEffect(() => {
    getStudentList(filterBy);
  }, [currentPage]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const updatedPageData = pageData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setPageData(updatedPageData);
  };

  const handleRowSelect = (index) => {
    const updatedPageData = [...pageData];
    updatedPageData[index].selected = !updatedPageData[index].selected;
    setPageData(updatedPageData);

    const allSelected = updatedPageData.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  const getStudentList = (filterby) => {
    const query = new URLSearchParams({
      page: currentPage,
      limit: 1300,
    }).toString();
    fetch(baseurl + "/api/students?" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        // setStudentsData(result);
        if (filterBy === "all") {
          setProduct(result);
        } else {
          let filteredData = result.filter(
            (student) => student.status === filterBy
          );
          setProduct(filteredData);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + `/api/students/` + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Deleted Successfully");
          getStudentList();
        });
    }
  }

  const ShowStudent = (student) => {
    sessionStorage.setItem("auth", JSON.stringify(student._id));
    updateAuth();
    navigate("/student/dashboard");
  };

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <GridToolbarDensitySelector />
      </GridToolbarContainer>
    );
  };

  // Replace with the actual total number of pages in your dataset.

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // You can also fetch data for the new page here.
  };

  const DataWithID = (data) => {
    const NewData = [];
    if (data !== undefined) {
      for (let item of data) {
        NewData.push({
          ...item,
          id: data.indexOf(item),
          date: moment(item.createdAt).format("D / M / Y"),
        });
      }
    } else {
      NewData.push({ id: 0 });
    }
    return NewData;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => (
        <div className="flex justify-center">{params.row.id + 1}</div>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      renderCell: (params) => (
        <div
          onClick={() => ShowStudent(params.row)}
          style={{ cursor: "pointer" }}
        >
          <div className="flex items-center gap-1">
            <img
              className="rounded-full w-10 h-10"
              src={
                baseurl + `/${params.row?.profilePic}` ||
                "https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-placeholder-png-image_3918418.jpg"
              }
              alt="profile"
            />
            <h5>{params.row?.name}</h5>
          </div>
        </div>
      ),
    },
    {
      field: "regno",
      headerName: "Reg No",
      type: "number",
      width: 100,
    },
    {
      field: "course",
      headerName: "Course",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      type: "text",
      width: 150,
    },
    {
      field: "contact",
      headerName: "Contact No.",
      width: 150,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      width: 100,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "number",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">
          {moment(params.row.dob).format("MMMM Do YYYY")}
        </div>
      ),
    },
    {
      field: "admdate",
      headerName: "DOJ",
      type: "number",
      width: 150,
      renderCell: (params) => (
        <div className="flex justify-center">
          {moment(params.row.admdate).format("MMMM Do YYYY")}
        </div>
      ),
    },
    {
      field: "locker_no",
      headerName: "Locker No.",
      type: "number",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <p>{params?.locker_no || "NA"}</p>
        </div>
      ),
    },
    {
      field: "documents",
      headerName: "Documents",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <Button onClick={() => handleDocumentOpen(params.row)} size="sm">
            View
          </Button>
        </div>
      ),
    },
    {
      field: "shift",
      headerName: "Shift",
      type: "number",
      width: 80,
      renderCell: (params) => (
        <div className="flex justify-center">
          <p>{params.row?.shift || "-"}</p>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
    },
    {
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="flex justify-center">
          <Menu>
            <MenuHandler>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link
                  to={"/admin/editStudent/" + params.row._id}
                  state={params.row}
                  className="flex "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                  Edit
                </Link>
              </MenuItem>
              <MenuItem>
                <div
                  className="flex "
                  onClick={() => {
                    deleteData(params.row._id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  Delete
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-5 p-5 ml-auto  bg-[#f5f6fa]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--secondary-color)] ">
            Students
          </h2>
          {/* Students */}
          <div className="flex items-center flex-col sm:flex-row">
            {/* <div className="flex items-center">
              <div className="text-[var(--secondary-color)]">
                Filter By Status
              </div>{" "}
              <div>
                <select
                  name="filter"
                  id="filter"
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setLoader(true);
                  }}
                  className="w-32 p-2 mx-2"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="absconded">Break</option>
                </select>
              </div>
            </div>
            <div className=" w-48 mx-2">
              <div className="relative flex w-full flex-wrap items-stretch">
                <input
                  type="textarea"
                  className="relative m-0 block w-[1%] min-w-0 pl-2 pr-8 py-2  flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-[var(--theme-color)] focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  placeholder="Search by name"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                <div
                  className=" absolute bottom-1 right-1 input-group-text flex items-center whitespace-nowrap rounded px-1 py-1.5 text-center text-base font-normal text-neutral-700  cursor-pointer"
                  id="basic-addon2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
            <Button onClick={handleOpen} className="h-fit">
              + Add Student
            </Button>
            <Button className="h-fit ml-1">
              <CSVLink data={pageData} filename={"enquiries.csv"}>
                Download CSV
              </CSVLink>
            </Button>
            <AddStudent open={open} handleOpen={handleOpen} />
          </div>
        </div>

        {/* Student Table */}
        <div className="my-10">
          <div className=" ">
            {loader ? (
              <div className="w-full h-[90vh] flex justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="relative overflow-x-scroll">
                {/* <table className=" w-full text-sm text-left text-gray-500 ">
                  <thead className="text-md text-[var(--secondary-color)] uppercase bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="">
                        <Checkbox
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th scope="col" className="px-2">
                        Student
                      </th>
                      <th scope="col" className="px-2">
                        Reg. No.
                      </th>
                      <th scope="col" className="px-2">
                        Course
                      </th>
                      <th scope="col" className="px-2">
                        Father Name
                      </th>
                      <th scope="col" className="px-2">
                        Address
                      </th>
                      <th scope="col" className="px-2">
                        Contact
                      </th>
                      <th scope="col" className="px-2">
                        Gender
                      </th>
                      <th scope="col" className="px-2">
                        DOB
                      </th>
                      <th scope="col" className="">
                        Admission Date
                      </th>
                      <th scope="col" className="px-2">
                        Library
                      </th>
                      <th scope="col" className="px-2">
                        Documents
                      </th>
                      <th scope="col" className="px-2">
                        Shift
                      </th>
                      <th scope="col" className="px-2">
                        Status
                      </th>
                      <th scope="col" className="px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.data?.map((item, index) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(search.trim().toLowerCase())
                      ) {
                        return (
                          <Student
                            index={index}
                            item={item}
                            updateAuth={updateAuth}
                            key={item._id}
                            getStudentList={getStudentList}
                            handleRowSelect={() => handleRowSelect(index)}
                            checked={selectAll}
                          />
                        );
                      }
                    })}
                  </tbody>
                </table> */}
                <DataGrid
                  rows={DataWithID(product.data)}
                  columns={columns}
                  components={{ Toolbar: CustomToolbar }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
                <StudenDocument
                  item={selectedData}
                  open={documentopen}
                  handleDocumentOpen={handleDocumentOpen}
                />
              </div>
            )}
            <div className="flex justify-end">
              {/* <nav aria-label="Page navigation example">
                <ul className="pagination flex space-x-5 border w-1/4 px-2 py-1 mx-5 mt-5">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={handlePrevious}
                      disabled={page === 1}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &laquo;
                      </span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array(pageCount)
                    .fill(null)
                    .map((ele, index) => {
                      return (
                        <li className="page-item" key={index}>
                          <a
                            className={page === index + 1 ? "page-link active" : "page-link"}
                            href="#"
                            onClick={() => {
                              setPage(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      );
                    })}
                  <li className="page-item">
                    <a
                      className="page-link"
                      aria-label="Next"
                      onClick={handleNext}
                      disabled={page === pageCount}
                    >
                      <span
                        aria-hidden="true"
                        className="border px-2 py-1 shadow-xl rounded-lg"
                      >
                        &raquo;
                      </span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav> */}
              {/* <GlobalPagination
                currentPage={product?.currentPage}
                totalPages={product?.totalPages}
                onChange={handlePageChange}
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div div className="bg-[var(--theme-color)]">
        <h1 className="font-extrabold text-sm text-center text-white px-2 py-3">
          &#169; 2023 SMS Education | All Rights Reserved
        </h1>
      </div>
    </>
  );
};

export default Students;
