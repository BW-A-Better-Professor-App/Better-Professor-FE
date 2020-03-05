import React, { useContext } from 'react';
import StudentList from './StudentList';
import UpcomingDeadlines from './UpcomingDeadlines';
import PrivateRoute from '../utils/PrivateRoute';
import styled from 'styled-components';
import StudentCard from './StudentCard'

import { Link } from 'react-router-dom'
import StudentDetails from './StudentDetails'
import { useHistory } from 'react-router-dom';

import { StudentFormContext } from '../contexts/StudentFormContext';


import AddStudent from './AddStudent'



const StyledDiv = styled.div`
display: flex;
justify-content: space-between;
border-radius: 10px;
margin: 1.5rem;
margin-top: 10%;
padding-bottom: 5%;
`;

const TaskTableDiv = styled.div`
width:  50%;
`
const StudentListDiv = styled.div`
width:  20%;
margin-left: 20%;
`

const StyledBtn = styled.div`
width: 30%;
padding: 2%;
background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), rgba(14, 21, 58, 0.84);
border-radius: 27px;
cursor: pointer;
`;

const StyledBtnDiv = styled.div`
display: flex;
justify-content: space-between;
border-radius: 10px;
margin: 1.5rem;
margin-top: 5%;
margin-left: 70%;
width: 20%;
border: 1px solid red;
padding-top: 3%;
`;




export default function TeacherDashboard() {
  const { isActive } = useContext(StudentFormContext)



  let history = useHistory()

  const id = localStorage.getItem('id');
  console.log("isactive in teacherDashboard: ", isActive)

  
    return(
        <div className="Proffessor_dashboard">
            {/* <StyledBtnDiv>
            <StyledBtn>Add Student</StyledBtn>
            <StyledBtn>View Student</StyledBtn>
            </StyledBtnDiv> */}
            <StyledBtnDiv>


              
              <StyledBtn><AddStudent /></StyledBtn>
            

            </StyledBtnDiv>

            <PrivateRoute path="/student-details">
            <StudentDetails/>
          </PrivateRoute>
           
           
           <StyledDiv> 
           <StudentListDiv>
           {/* <PrivateRoute  exact path = '/dashboard'> */}
          <StudentList />
          {/* </PrivateRoute> */}
          </StudentListDiv>
          <TaskTableDiv>
           {/* <PrivateRoute  exact path = '/dashboard'> */}

           {!isActive ? (
             <UpcomingDeadlines />
           ) : (
              <StudentCard/>
           )
          }
           

     

          {/* </PrivateRoute> */}
          </TaskTableDiv>

          </StyledDiv>    
         
         
          
        </div>
    )
}