import React, { useState, createContext } from 'react';

export const textContext = createContext();

export const textProvider = (props) => {
  // const [text, setText] = useState('hello there')
  const text = 'hello there';


  return (
    <textContext.Provider
      value={text}>
      {props.children}
    </textContext.Provider>
  )
}





