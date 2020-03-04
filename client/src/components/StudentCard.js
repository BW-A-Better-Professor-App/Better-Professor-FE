import React from "react";

const StudentCard = props => {
  const firstname= props.name;
  console.log('this is first name: ', firstname)
  return (
    <div>
      <h1>{props.name}</h1>

    </div>
  );
};
export default StudentCard;
