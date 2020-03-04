import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth'; 

export default function UpcomingDeadlines() {
        const [deadlines, setDeadlines] = useState([])

        useEffect(() => {
            axiosWithAuth()
            .get(`/tasks`)
            .then(response => {
                setDeadlines(resonse.data);
            })
            .catch(err => {
                console.log('unable to fetch deadlines', err);
            })
        }, []);

    return(
        <div className='upcoming-deadlines'>
            {deadlines.map(deadline => (
                <div key={deadline.id}>
                    <h3>{deadline.name}</h3>
                    <p>{deadline.duedate}</p>
                </div>
            ))}

        </div>
    )
}