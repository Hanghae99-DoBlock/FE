import React, { useState } from 'react'

const useInput = (initialState) => {
    const [value,setValue] = useState(initialState)

    const onChange = e =>{
        setValue(e.target.value)

    }

    const onReset = e =>{
        setValue('')
    }



  return {value,onChange, onReset}
}

export default useInput