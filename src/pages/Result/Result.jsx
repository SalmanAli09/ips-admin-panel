import React, { useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";

function Result() {
    const [rollNo, setRollNo] = useState('');
    const [storedValues, setStoredValues] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loader, setLoader] = useState(false)
    const db = getFirestore();
    const handleShowResult = async () => {
        setLoader(true);
        const querySnapshot = await getDocs(collection(db, "myCollection"));
        const temporaryArr = [];

        querySnapshot.forEach((doc) => {
            temporaryArr.push(doc.data());
        });

        setLoader(false);
        setStoredValues(temporaryArr);

        // Assuming rollNo is a variable you want to filter against
        const results = temporaryArr.map((item) => {
            return {
                rowData: item.rowData.filter((student) => student.rollNo === rollNo)
            };
        });

        const filteredResults = results.filter((result) => result.rowData.length > 0);

        if (filteredResults.length > 0) {
            setSearchResults(filteredResults);
        } else {
            // Handle the case where no results are found
            setSearchResults([]);
        }
    };




    return (
        <>

            <div className="backround">
                <div className="container">
                    <div className="row mx-auto">
                        <div className="row" style={{ marginTop: "150px" }}>
                            <div className="col-md-12">
                                <h1>Islamia Public School - Student Results Portal</h1>
                            </div>
                            <div className="col-md-6 mt-5">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder="Enter Student's Name" 
                                         aria-label="Recipient's username" />
                                    <input type="text" class="form-control mx-1" placeholder="Enter Student's ID" value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)} aria-label="Recipient's username" />
                                    <button class="btn rounded btn-23 mx-1" type="button" onClick={handleShowResult} id="button-addon2">Search Result</button>
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            {loader ? (
                                <p>Searching Result...</p>
                            ) : (
                                searchResults.length === 0 ? (
                                    <p>No Data Found</p>
                                ) : (
                                    // Render your results here
                                    searchResults.map((item, index) => (
                                        <div key={index}>
                                            {searchResults.map((item, index) => (
                                                <div key={index}>
                                                    {item.rowData.map((student, studentIndex) => (
                                                        <div className="col-md-12">
                                                            <div key={studentIndex}>
                                                                <div className="row mb-5">
                                                                    <center>
                                                                        <table width="100%" style={{ border: "1px solid black", width: "100%" }}>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th style={{ border: "1px solid black", width: "300px" }} width="300" className='text-center p-2' >
                                                                                        Class
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        Section
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        Roll #
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        Name
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Father Name
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        English
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Maths
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Science
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Sindhi
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        GK
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Urdu
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Islamiyat
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Quran Majeed
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Obtained Marks
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Total Marks
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Grade
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        Percentage
                                                                                    </th>
                                                                                </tr>
                                                                                <tr>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        {student?.class}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        {student?.section}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        {student?.rollNo}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2' >
                                                                                        {student?.name}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.fatherName}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.english}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.maths}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.science}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.sindhi}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.gk}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.urdu}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.islamiyat}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.quranMajeed}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.total}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.obtained}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.grade}
                                                                                    </th>
                                                                                    <th style={{ border: "1px solid black", width: "100px" }} className='text-center p-2'>
                                                                                        {student?.percentage}
                                                                                    </th>
                                                                                </tr>
                                                                            </thead>
                                                                        </table>
                                                                    </center>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                )
                            )}

                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Result;
