import { destinos } from "@/data/destinos";
import Link from "next/link";
import styled from "styled-components"

export const ListaDestinos = () => {
    return(
    <StyledLista>
    {destinos.map((destino) => (
      <Link href={`viajedetallado/${destino.id}`} key={destino.id}>
        <StyledElement>
          <StyledImage
            src={destino.imagen_corta}
            alt={destino.destino}
            className="destino-image"
            />
          <StyledInfo>
            <h2>{destino.destino}</h2>
            <p>{destino.descripcion_corta}</p>
          </StyledInfo>
        </StyledElement>
      </Link>
    ))}
  </StyledLista>
)
};

const StyledLista = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #151415;
`

const StyledElement = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
    border: 2px dashed #f4070b;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;
`

const StyledInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    margin: 0%;
`
const StyledImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  margin-left:20px;
  margin-right: 20px;
  border-radius: 10px;
`