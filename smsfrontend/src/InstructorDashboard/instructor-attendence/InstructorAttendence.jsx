import React, { useState } from 'react'
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import ModalAddAttendance from './ModalAddAttendance';
import { Button } from '@material-tailwind/react';
import moment from 'moment';


const InstructorAttendence = () => {

  const [prevAttendance, setPrevAttendance] = useState(false)
  const [addAttendance, setAddAttendance] = useState(false)
  const handleattendance = () => setAddAttendance(!addAttendance)

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


  const Data = [
    {
      id: 1,
      name: 'Dummy',
      regNo: 326945,
      todayAttendance: 'Present',
      course: 'DCA',
      batchTime: '7 AM to 8 AM',
      mobileNo: '7052237052',
      instructorName: 'Sourabh Verma'
    }

  ]

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 100,
      // renderCell: (params) => (
      //   <div>
      //     {params.row.name}
      //     <div className="text-blue-800 font-black">
      //       Dropout
      //     </div>
      //   </div>
      // )
    },
    {
      field: "todayAttendance",
      headerName: "Today Attendance",
      width: 200,
      renderCell: (params) => (
        <div className='w-full'>
          {prevAttendance ? <p>Absent</p> : <select name="" id="" className='rounded-sm w-full p-3'>
            <option value="#"></option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
            <option value="present">Present</option>
            <option value="holiday">Holiday</option>
          </select>}
        </div>
      )
    },
    { field: "regNo", headerName: "Reg No", width: 100 },
    { field: "course", headerName: "Course", width: 100 },
    { field: "batchTime", headerName: "Batch Time", width: 150 },
    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "instructorName", headerName: "Teacher Name", width: 150 },
    {
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center" onClick={handleattendance}>
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
        </div>
      ),
    },

  ];

  return (
    <div className='p-5 ml-auto shadow-lg  h-[100vh] overflow-y-scroll scrollbar-hide bg-[#f5f6fa] mt-5'>
      <div className='text-2xl font-black'>
        {
          prevAttendance ? <div>{moment('2023-12-07T12:00:00Z').format('LL')} ATTENDANCE ENTRY</div> :
            <div>{moment().format('LL')} ATTENDANCE ENTRY</div>
        }
      </div>
      <div className='flex gap-2 my-2 '>
        <Button onClick={() => setPrevAttendance(true)} variant={prevAttendance ? 'contained' : 'outlined'}>Yesterday</Button>
        <Button onClick={() => setPrevAttendance(false)} variant={prevAttendance ? 'outlined' : 'contained'} >Today</Button>
      </div>
      <DataGrid
        rows={Data}
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
      <ModalAddAttendance
        open={addAttendance}
        handleOpen={handleattendance}
      />
    </div>
  )
}

export default InstructorAttendence