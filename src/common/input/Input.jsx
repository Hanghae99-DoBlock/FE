import React from 'react'
import styled, { css } from "styled-components";

const Input = ({...props}) => {
  return (
    <StInput{...props}/>
  )
}

export default Input

export const StInput = styled.input`
    ${({theme})=>{
        switch(theme){
            case "join" :
                return css`
                width:335px;
                height: 50px;
                background-color: #F4F4F4;
                border-radius: 10px;
                padding:12px 0 12px 16px;
                outline-color: #7474FF;
                
                ::placeholder{
                color:#C8C8C8;
                margin-left : 16px;
                font-weight : 500;
                padding:12px 0 16px
                }

                
                `;

            case "changeBlue" :
              return css`
                width:335px;
                height: 50px;
                background-color: #F4F4F4;
                border-radius: 10px;
                padding:12px 0 12px 16px;
                
                ::placeholder{
                color:#7474FF;
                margin-left : 16px;
                font-weight : 500;
                padding:12px 0 16px
                }

                
                `;
        }
    }}


`;