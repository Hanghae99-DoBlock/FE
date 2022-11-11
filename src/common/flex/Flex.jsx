import React from 'react'
import styled from 'styled-components'

const Flex = ({children,...props}) => {
  return (
    <StFlex {...props}>{children}</StFlex>
  )
}


export default Flex

export const StFlex = styled.div`
    display: flex;
    flex-direction: ${({dir})=> dir ? dir : "column"};
    justify-content: ${({jc})=> jc };
    width:${({wd})=> wd};
    height : ${({ht})=> ht};
    align-items: ${({ai})=> ai};
    border-right: ${({br})=>br};
    margin : ${({mg})=> mg};
    gap : ${({gap})=> `${gap}px`};
    padding : ${({pd})=>pd};
    background-color : ${({bg})=> bg};
    border-radius : ${({brd})=> brd};
    top:${({top})=>top};
    left:${({left})=>left};
    right:${({right})=>right};
    position : ${({ps})=>ps};
    z-index : ${({zi})=>zi};
    color : ${({color})=>color};
    min-height : ${({mh})=>mh};
    max-height : ${({mxh})=>mxh};
    min-width : ${({mw})=>mw};
    max-width : ${({mxw})=>mxw};
    font-size : ${({fs})=>`${fs}px`};
    font-weight : ${({fw})=>fw};
    line-height : ${({lh})=>`${lh}px`};
`;