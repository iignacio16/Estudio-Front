import { destinos } from "@/data/destinos"
import {useRouter} from "next/router";
import styled from "styled-components"

const ViajeDetallado = () => {
    const router = useRouter();
    const {id} = router.query;
    const destino = destinos.find((d)=> id === d.id);

    return (
        <StyledContainer>
                <StyledButton onClick={()=>{
                    router.push("/")
                }}>
                    Volver
                </StyledButton>
            <StyledViaje>
                <StyledImg src={destino?.imagen_larga} alt={destino?.destino}></StyledImg>
                <StyledInfo>
                    <h1>{destino?.destino}</h1>
                    <p>{destino?.descripcion_larga}</p>
                </StyledInfo>
            </StyledViaje>
        </StyledContainer>
    )
}

export default ViajeDetallado;
const StyledContainer = styled.div`
    height: 100vh;
    margin-bottom: 20px;
    background-color: aquamarine;
`

const StyledButton = styled.button`
    background-color: #ff01af;
    border:none;
    color:black;
    padding: 15px 32px;
    text-align: center;
    font-size: 16px;
    justify-content: flex-start;
    cursor: pointer;
`

const StyledViaje = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
`

const StyledImg = styled.img`
    width: 300px;
    height: 300px;
    margin-top: 20px;
    border-radius: 5px;
`

const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: medium;
`