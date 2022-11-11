import styled, { css } from "styled-components";

const Input = ({...props}) => {
  return (
    <StInput{...props}/>
  )
}

export default Input

export const StInput = styled.input`
  ${({variant}) => {
      switch(variant){
        //회원가입, 로그인시 사용
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
          
          //회원가입 시 input이 빈칸일 때 placeholder의 색상 변경시 사용
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
            
        // 투두 컨텐트 인풋
        case "todoInput":
          return css`
            height: 48px;
            padding: 12px 0;
            caret-color: #7474ff;
            font-weight: 600;
            font-size: 19px;
            color: #131313;
          `;
    }
  }}
`;