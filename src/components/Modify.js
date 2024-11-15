import React, { useEffect, useState, useContext } from 'react';
import "../CSS/Modify.css";
import { ModifyContext } from './ModifyContex';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [attendanceDates, setAttendanceDates] = useState([]);
    const { handleData } = useContext(ModifyContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://attendance-server-buy0.onrender.com/users");
                const data = await response.json();
                setUsers(data);

                const dates = [];
                data.forEach(user => {
                    user.attendance.forEach(record => {
                        if (record.startTime && !dates.includes(record.startTime)) {
                            dates.push(record.startTime);
                        }
                    });
                });
                setAttendanceDates(dates);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);
    
        const handleDelete = (id) => {
            fetch(`https://attendance-server-buy0.onrender.com/delete/${id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); 
            })
            .then(() => {
                const newData = users.filter(user => user._id !== id); 
                setUsers(newData);
            })
            .catch(error => console.log("Failed to delete:", error));
        }
                  
    

    const handleDownload = () => {
        const input = document.getElementById('table-to-pdf');
        if (!input) {
            console.error('Element with ID "table-to-pdf" not found.');
            return;
        }

        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('user-attendance.pdf');
        });
    };

    return (
        <div className='modifyDiv'>
            <h1 style={{ textAlign: "center" }}>User Attendance List</h1>
            <div className='info-div'>
                <button className='info-btn'  style={{marginRight:"20px",backgroundColor:"blue"}}onClick={handleDownload}>
                    Download PDF
                </button>
                <button className='info-btn' onClick={() => handleData(users)}>
                    <Link style={{ textDecoration: "none", color: "black" }} to="/ModifyInfo">Info</Link>
                </button>
            </div>

            <div className='table-div' id="table-to-pdf">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Phone</th>
                            <th>Image</th>
                            {attendanceDates.map((date, index) => (
                                <th key={index}>{date}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.age}</td>
                                <td>{user.sex}</td>
                                <td>{user.phone}</td>
                                <td>
                                    {user.imagePath && <img style={{ objectFit: "contain" }} src={`https://attendance-server-buy0.onrender.com/images/${user.imagePath}`} alt="User" width="50" />}
                                </td>
                                {attendanceDates.map((date) => {
                                    const attendanceRecord = user.attendance.find(record => record.startTime === date);
                                    return (
                                        <td key={date}>
                                            {attendanceRecord ? (attendanceRecord.attend ? '✓' : '✗') : '-'}
                                        </td>
                                        
                                    );
                                })}
                                <td ><button style={{backgroundColor:"red",padding:"10px 20px"}} onclick={()=>handleDelete(user._id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;