import React, { useState } from 'react';
import '../../firebase';
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import { notification } from 'antd'


function Upload() {
    let [storedValues, setStoredValues] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('1');
    const [selectedSection, setSelectedSection] = useState('A');
    console.log(rowData)

    const db = getFirestore();



    const fetchDataFromFirestore = async () => {
        const querySnapshot = await getDocs(collection(db, "myCollection"));
        const temporaryArr = [];
        querySnapshot.forEach((doc) => {
            temporaryArr.push(doc.data());
        });
        setStoredValues(temporaryArr);
    };





    const addRow = () => {
        setRowData((prevData) => [
            ...prevData,
            {
                class: selectedClass,
                section: selectedSection,
                rollNo: "",
                name: '',
                fatherName: '',
                english: '',
                maths: '',
                science: '',
                sindhi: '',
                gk: '',
                urdu: '',
                islamiyat: '',
                quranMajeed: '',
                obtained: "675",
                total: "",
                percentage: "",
                grade: "",
            }
        ]);
    };

    // const handleUpload = async () => {
    //     console.log(rowData);
    //     const docRef = await addDoc(collection(db, "myCollection"), {
    //         rowData
    //     });
    //     notification.success({
    //         message: "Uploaded Successfully"
    //     })
    // };

    const handleUpload = async () => {
        const docRef = await addDoc(collection(db, "myCollection"), {
            rowData: [...rowData],
        });
        console.log({
            rowData: [...rowData],
        });
        notification.success({
            message: "Uploaded Successfully"
        })
    }

    // const handleCellChange = (index, field, value) => {
    //     setRowData((prevData) => {
    //         const newData = [...prevData];
    //         newData[index][field] = value;
    //         return newData;
    //     });
    //     if(field === "quranMajeed" && field[quranMajeed].value > 75){
    //         alert("max mark for this is 75")
    //     }
    // };


    // ...

    const handleCellChange = (index, field, value) => {
        setRowData((prevData) => {
            const newData = [...prevData];
            const currentRow = newData[index];

            const maxMarks = 75;

            if (field === 'quranMajeed' && parseInt(value, 10) > 50) {
                notification.error({
                    message: "Maximum marks for Quran Subject is 75",
                });
                currentRow[field] = maxMarks.toString();
            } else if (field === 'sindhi' && parseInt(value, 10) > 100) {
                alert(`Maximum marks for Sindhi is ${maxMarks}`);
                currentRow[field] = maxMarks.toString();
            } else {
                currentRow[field] = value;
            }

            const subjectFields = ['english', 'maths', 'science', 'sindhi', 'gk', 'urdu', 'islamiyat', 'quranMajeed'];

            currentRow.total = subjectFields.reduce((total, subject) => {
                return total + (parseInt(currentRow[subject], 10) || 0);
            }, 0).toString();

            console.log(currentRow.total, '=====')

            let percentage_com = (currentRow.total / 675) * 100;
            console.log(percentage_com)

            // const maxTotal = subjectFields.length * 100;
            currentRow.percentage = percentage_com.toFixed(2) + '%';

            if (percentage_com >= 90) {
                currentRow.grade = 'A';
            } else if (percentage_com >= 80) {
                currentRow.grade = 'B';
            } else if (percentage_com >= 70) {
                currentRow.grade = 'C';
            } else {
                currentRow.grade = 'D';
            }

            return newData;
        });
    };



    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-md-6">
                    <p className='fs-5 fw-bold'>Select the Class</p>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <p className='fs-5 fw-bold'>Select the Class Section</p>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        value={selectedSection}
                        onChange={(e) => setSelectedSection(e.target.value)}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
            </div>
            <div className="row my-4">
                <div className="col-md-12 text-end">
                    <button className='btn btn-primary me-2' onClick={addRow}>Add Row</button>
                    <button className='btn btn-success' onClick={handleUpload}>Upload Result</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table width="100%" style={{ border: "1px solid black" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid black" }} className='text-center' >
                                    Class
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center' >
                                    Section
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center' >
                                    Roll #
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center' >
                                    Name
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Father Name
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    English
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Maths
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Science
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Sindhi
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    GK
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Urdu
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Islamiyat
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Quran Majeed
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Total Marks
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Obtained Marks
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Grade
                                </th>
                                <th style={{ border: "1px solid black" }} className='text-center'>
                                    Percentage
                                </th>
                            </tr>
                        </thead>
                        <thead>
                            <tr>
                                <td className='text-center' >

                                </td>
                                <td className='text-center' >

                                </td>
                                <td className='text-center' >

                                </td>
                                <td className='text-center' >
                                </td>
                                <td className='text-center'>

                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    100
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    100
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    100
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    100
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    75
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    75
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    75
                                </td>
                                <td style={{ border: "1px solid black" }} className='text-center'>
                                    50
                                </td>
                                <td className='text-center'>

                                </td>
                                <td className='text-center'>

                                </td>
                                <td className='text-center'>

                                </td>
                                <td className='text-center'>

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            style={{ border: "1px solid black" }}
                                            className='text-center p-2'
                                            contentEditable
                                            onBlur={(e) => handleCellChange(index, Object.keys(row)[cellIndex], e.target.innerText)}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
}

export default Upload;
