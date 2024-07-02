import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Radio,
} from "@material-tailwind/react";

const ModalChangeStatus = ({ open, handleOpen }) => {
    const [course, setCourse] = useState("");
    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[20%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Student Status
                </DialogHeader>
                <DialogBody divider className=" overflow-y-scroll">
                    <form>
                        <div className="flex flex-wrap mt-5 mb-6">
                            <div className="w-full px-3 mb-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="course"
                                >
                                    Select Course
                                </label>
                                <select
                                    label="Select Course"
                                    className="p-2 border focus-visible:outline-none w-full rounded-md"
                                    value={course}
                                    onChange={(e) => {
                                        setCourse(e.target.value);
                                    }}
                                >
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="break">Break</option>
                                </select>
                            </div>
                            <div className="w-full px-3 mb-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="course"
                                >
                                    Remark
                                </label>
                                <textarea
                                    rows={5}
                                    className="border border-black rounded-md w-full"
                                    placeholder="Add your remark"
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
                    <Button variant="gradient" color="blue">
                        <span>Change</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ModalChangeStatus;
