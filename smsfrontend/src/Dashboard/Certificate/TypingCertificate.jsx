import React, { useState } from 'react'
import { MdArrowForward } from 'react-icons/md';
import { Button, Input, Textarea } from '@material-tailwind/react'
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';


const TypingCertificate = ({ back }) => {

    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        regNo: '',
        language: null,
        speedWpm: '',
        average: '',
        address: '',
        from: '',
        to: '',
        grade: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectOption = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            options: selectedOption,
        }));
    };
    const handleSelectlanguageOption = (selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            language: selectedOption,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        PrintCertificate(`/admin/certificate/print-certificate`, { state: { formData } });
        console.log('Form submitted:', formData);
    };

    const selectedlanguageOptions = [
        { label: 'English', value: 'english' },
        { label: 'Hindi', value: 'hindi' },
    ];

    const SelectOptions = [
        { label: 'Credit', value: 'credit' },
        { label: 'Distinction', value: 'distinction' },
        { label: 'Excellent', value: 'excellent' }
        // Add more courses as needed
    ];

    const PrintCertificate = useNavigate()
    const { Id } = useParams();

    return (
        <div>
            <Button onClick={back}>Back to Certificate</Button>
            <div className="p-5 mx-auto max-w-xl">
                <form onSubmit={handleSubmit}>
                    {/* Course Select Field */}

                    <div className="py-2">
                        <Select
                            id="grade"
                            name="grade"
                            value={formData.language}
                            onChange={handleSelectlanguageOption}
                            options={selectedlanguageOptions}
                            placeholder="Typing Language"
                            isSearchable
                            isClearable
                        />
                    </div>

                    <div className="py-2">
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            label="Enter Student Name"
                            size="regular"
                            fullWidth
                        />

                    </div>
                    <div className="py-2">

                        <Input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            value={formData.fatherName}
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
                            type="number"
                            id="speedWpm"
                            name="speedWpm"
                            value={formData.speedWpm}
                            onChange={handleInputChange}
                            label="Speed"
                            size="regular"
                            fullWidth
                        />
                    </div>
                    <div className="py-2">

                        <Input
                            type="number"
                            id="average"
                            name="average"
                            value={formData.average}
                            onChange={handleInputChange}
                            label="Average"
                            size="regular"
                            fullWidth
                        />
                    </div>
                    <div className="py-2">

                        <Input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            label="Address"
                            size="regular"
                            fullWidth
                        />
                    </div>
                    <div className="py-2">
                        <Input
                            type="date"
                            id="from"
                            name="from"
                            value={formData.from}
                            onChange={handleInputChange}
                            variant="outlined"
                            label="From"
                            size="regular"
                            fullWidth
                        />

                    </div>
                    <div className="py-2">
                        <Input
                            type="date"
                            id="to"
                            name="to"
                            value={formData.to}
                            onChange={handleInputChange}
                            variant="outlined"
                            label="To"
                            size="regular"
                            fullWidth
                        />

                    </div>
                    <div className="py-2">
                        <Input
                            id="grade"
                            name="grade"
                            value={formData.grade}
                            onChange={handleInputChange}
                            variant="outlined"
                            label="Enter Grade"
                            size="regular"
                            fullWidth
                        />
                    </div>

                    <Button
                        type="submit"
                        buttonType="filled"
                        size="lg"
                        ripple="light"
                        fullWidth
                        className='flex justify-center items-center mt-2'
                    >
                        Submit <MdArrowForward size={20} className="ml-2" />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default TypingCertificate