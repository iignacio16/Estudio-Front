import { Planet } from "@/types"

interface Props {
    planet: Planet | undefined
}

const PlanetDetail: React.FC<Props> = ({planet}) => {
    if(!planet) return <div>Loading...</div>
    return(
        <div>
            <h2>{planet.name}</h2>
            <p>Rotation period: {planet.rotation_period}</p>
            <p>Orbital period: {planet.orbital_period}</p>
            <p>Diameter: </p>
            <p>Climate: </p>
            <p>Gravity: </p>
            <p>Terrain: </p>
            <p>Surface Water: </p>
            <p>Populaion: </p>
            <h4>Residents: </h4>
            <ul>
                {planet.residents.map((n,index)=>(
                    <li key={index}>Name:{n.name}</li>
                ))}
            </ul>
            <h4>Films: </h4>
            <ul>
                {planet.residents.map((f,index)=>(
                    <li key={index}>Title: {f.name}</li>
                ))}
            </ul>
            <p>Created at: </p>
            <p>Edited at: </p>
            <p>Url: </p>
        </div>
        )
}

export default PlanetDetail;