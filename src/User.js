import React from 'react'

const User = (props) => {
    const {data} = props;
    const {name,age}=data;
  return (
    <>
      <h1>user component {name} {age}</h1>
    </>
  )
}

export default User;
