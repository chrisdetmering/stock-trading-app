import React, { useState, createContext } from 'react';

export const SearchHoldingContext = createContext();

export const TextProvider = (props) => {
  // const [text, setText] = useState('hello there')
  const text = 'hello there';


  return (
    <SearchHoldingContext.Provider
      value={text}>
      {props.children}
    </SearchHoldingContext.Provider>
  )
}





