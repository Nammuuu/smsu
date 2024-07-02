import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";

const ModalEditBatch = ({
  open,
  handleOpen,
  item,
  getScheduledBatchesList,
}) => {
  const [batch, setBatch] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [maped, setMaped] = useState(true)



  const inst = item?.contact_instructor;

  const onSubmitClick = () => {
    let updatedData = {
      course,
      batch,
      date,
      time,
    };

    fetch(baseurl + "/api/class/" + inst, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.info("Updated Successfully");
        handleOpen();
        getScheduledBatchesList();
      });
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
      >
        <DialogHeader className="text-center justify-center">
          {" "}
          Edit Batch
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* batch */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="batch"
                >
                  INSTRUCTOR NAME
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="batch"
                  type="text"
                  placeholder="Intro to AI"
                  value={'Sourabh'}
                  disabled
                />
              </div>
              {/* Course */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="course"
                >
                  From
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="time"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              {/* Date */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  To
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="time"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              {/* time */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="time"
                >
                  Maped Students
                </label>
                <table className="table-auto w-full">
                  <thead style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
                    <tr className="text-left">
                      <th>Student Name</th>
                      <th>Course</th>
                      <th>Fees</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ overflowY: 'scroll', height: '100px' }}>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Ram</td>
                      <td>CCC</td>
                      <td>19000</td>
                      <td
                        className="text-center"
                        onClick={() => setMaped(!maped)}
                      >
                        {
                          maped ?
                            <Button>Remove</Button> :
                            <Button>Add</Button>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
          <Button variant="gradient" color="blue" onClick={onSubmitClick}>
            <span>Save</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ModalEditBatch;
