import { Episode } from "@/types";
import Link from "next/link";

const EpisodeDetails = ({data}: {data?:Episode}) => {
    if(!data){
        return <div>Dentro del componente ya y no hay data</div>
    }
    return(
        <div>
        <h3>{data.name}</h3>
        <p>Air date: {data.air_date}</p>
        <ul>
            {data.characters.map((c, index)=>(
                <li key={index}>
                    <Link href={`/character/${c.id}`}>
                        {c.name}
                    </Link>
                </li>
            ))}
        </ul>
            
        </div>
    )
}

export default EpisodeDetails;