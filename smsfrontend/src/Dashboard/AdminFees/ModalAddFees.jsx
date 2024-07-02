import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Radio,
} from "@material-tailwind/react";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import Select from "react-select";

const ModalAddFees = ({ open, handleOpen, getFeesList }) => {
  const [studentsData, setStudentsData] = useState([]);
  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("cash");
  const [transId, setTransId] = useState("");
  const [paid, setPaid] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getStudentList();
  }, []);

  const getStudentList = () => {
    fetch(baseurl + "/api/students?limit=10000&page=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setStudentsData(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (selectedOption) => {
    setRegno(selectedOption?.value || '');
    setName(selectedOption?.label || '');
  };

  const onSubmitClick = () => {
    // Create the data object with updated name and mode
    const data = { name, regno, amount, mode, transId, paid, date };
    console.log(data)  
  

    // Post Api For Posting Data
    fetch(baseurl + "/api/fee", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        toast.success("Fees Added Successfully");
        handleOpen();
        getFeesList();
      })
      .catch((err) => {
        console.log(err);
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
          Add Fees
        </DialogHeader>
        <DialogBody divider className="h-[25rem] overflow-y-scroll">
          <form className="w-full px-5 sm:px-10 mt-5">
            <div className="flex flex-wrap -mx-3 mb-6">
              {/* Regno */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="regno"
                >
                  Reg No.
                </label>

                <Select
                  options={studentsData?.data?.map((student) => ({
                    value: student.regno,
                    label: `${student.regno} | ${student.name}`,
                  })) || []}
                  isSearchable
                  placeholder="Select option..."
                  onChange={handleChange}
                />

              </div>
              {/* Name */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  placeholder="Select Reg No."
                  id="name"
                  type="text"
                  value={name}
                  disabled
                />

              </div>
              {/* amount */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="amount"
                  type="number"
                  placeholder="15000"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              {/* mode */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="amount"
                >
                  Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  <Radio
                    id="upi"
                    name="type"
                    label="UPI"
                    onChange={() => {
                      setMode("upi");
                    }}
                  />
                  <Radio
                    id="cash"
                    name="type"
                    label="Cash"
                    onChange={() => {
                      setMode("cash");
                    }}
                    defaultChecked={mode === "cash"}
                  />
                  <Radio
                    id="bTransfer"
                    name="type"
                    label="Bank Transfer"
                    onChange={() => {
                      setMode("bTransfer");
                    }}
                  />
                </div>
              </div>
              {/* Transaction ID */}
              {mode === "upi" || mode === "bTransfer" ? (
                <div className="w-full px-3 mb-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="transId"
                  >
                    Transaction ID
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="transId"
                    type="text"
                    placeholder="7645"
                    value={transId}
                    onChange={(e) => {
                      setTransId(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {/* Paid */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="paid"
                >
                  Paid
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="paid"
                  type="number"
                  placeholder="7645"
                  value={paid}
                  onChange={(e) => {
                    setPaid(e.target.value);
                  }}
                />
              </div>
              {/* Date */}
              <div className="w-full px-3 mb-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
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

export default ModalAddFees;
