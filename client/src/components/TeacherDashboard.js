import React from 'react';
import StudentList from './StudentList';
import UpcomingDeadlines from './UpcomingDeadlines';
import PrivateRoute from '../utils/PrivateRoute';
import styled from 'styled-components';
import StudentCard from './StudentCard'
import AddStudent from './AddStudent'


const StyledDiv = styled.div`
display: flex;
justify-content: space-between;
border: 1px solid red;
border-radius: 10px;
margin: 1.5rem;
margin-top: 10%;
`;

const TaskTableDiv = styled.div`
width:  50%;
background: yellow;
border: 3px solid red;
`
const StudentListDiv = styled.div`
width:  20%;
background: yellow;
border: 1px solid red;
margin-left: 20%;
`

const StyledBtn = styled.div`
position: absolute;
width: 329px;
height: 88px;
left: 918px;
top: 65px;

background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%), rgba(14, 21, 58, 0.84);
border-radius: 27px;
`;

const StyledBtnDiv = styled.div`
display: flex;
justify-content: space-between;
border: 1px solid red;
border-radius: 10px;
margin: 1.5rem;
margin-top: 15%;
margin-left: 50%;
width: 20%;
`;




export default function TeacherDashboard() {
  const id = localStorage.getItem('id');
    return(
        <div>
            {/* <StyledBtnDiv>
            <StyledBtn>Add Student</StyledBtn>
            <StyledBtn>View Student</StyledBtn>
            </StyledBtnDiv> */}
            <StyledBtnDiv>
            <button>View Students</button>
            <AddStudent />
            </StyledBtnDiv>
           
           
           <StyledDiv> 
           <StudentListDiv>
           {/* <PrivateRoute  exact path = '/dashboard'> */}
          <StudentList />
          {/* </PrivateRoute> */}
          </StudentListDiv>
          <TaskTableDiv>
           {/* <PrivateRoute  exact path = '/dashboard'> */}
           <UpcomingDeadlines />
          {/* </PrivateRoute> */}
          </TaskTableDiv>
         
          </StyledDiv>    
         
         
          
        </div>
    )
}