import React from 'react';
import StudentList from './StudentList';
import UpcomingDeadlines from './UpcomingDeadlines';
import PrivateRoute from '../utils/PrivateRoute';



export default function TeacherDashboard() {
    return(
        <div>
        <StudentList />
          <UpcomingDeadlines />

        
        </div>
    )
}