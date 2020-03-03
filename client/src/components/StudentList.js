import React, { useEffect, useState } from 'react';
import axios from 'axios'

import StudentCard from './StudentCard'

export default function StudentList() {
    const [students, setStudents] =  useState([])

    useEffect(() => {
        axios
        .get(``)
        .then(response => {
            console.log('response', response.___);
            setStudents(response.__);
        })
        .catch(err => {
            console.log('error, go fix!', err);
        })
    }, []);

    return (
        <section className="student-list">
            <SearchFrom />
            <div>
            {students.map(student => (
                <StudentCard
                key={student.id}
                name={student.name}
                assignments={student.assignments}
                dueDate={student.assignments.dueDates}
                notes={student.notes}
                />
            ))}
            </div>
        </section>
    );
}

//needs to display a list of students.
//need to be able to click on each student's name and have their details display
