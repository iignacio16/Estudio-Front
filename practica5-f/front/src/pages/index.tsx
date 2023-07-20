import Link from "next/link"
import styled from "styled-components"


export default function Home() {
  return (
    <StyledDiv>
      <Link href={"/films"}><StyledButton>Films</StyledButton></Link>
      <Link href={"/planets"}><StyledButton>Planets</StyledButton></Link>
      <Link href={"/vehicles"}><StyledButton>Vehicles</StyledButton></Link>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: beige;
`
const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: blue;
  font-size: 25px;
  color: pink;
  padding: 10px 20px;
  margin: 20px;

`