import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import InstructorAttendance from "../manage-student/InstructorAttendance";
import InstructorMapedStudents from "./InstructorStudents";
import InstructorStudents from "../../InstructorDashboard/InstructorStudents/InstructorStudents";

const ModalOneViewProfile = ({ open, handleOpen }) => {

    return (
        <>
            <Dialog
                open={open}
                handler={handleOpen}
                className="min-w-[80%] md:min-w-[60%] lg:min-w-[80%]"
            >
                <DialogHeader className="text-center justify-center">
                    {" "}
                    Instructor Profile
                </DialogHeader>
                <DialogBody divider className="h-[25rem] overflow-y-scroll">
                    <InstructorAttendance />
                    <InstructorMapedStudents />
                    <InstructorStudents />
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
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default ModalOneViewProfile;
