import React, { useContext } from 'react'
import { MyContext } from './ContextProvider';

export default function About() {
    const { UserDBData, setUserDBData } = useContext(MyContext);

  return (
    <div>
        <button onClick={()=>alert(UserDBData.email)}>click</button>
    </div>
  )
}
