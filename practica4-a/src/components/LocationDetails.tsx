import { Locations } from "@/types";
import Link from "next/link";

const LocationDetails = ({data}: {data:Locations}) => {
    return(
        <div>
        <h2>{data.name}</h2>
        <p>Dimension: {data.dimension}</p>
        <ul>
            {data.residents.map((c,index)=>(
                <li key={index}>
                    <Link href={`character/${c.id}`}>
                    {c.name}
                    </Link>
                </li>
            ))}
        </ul>
        </div>
    )
} 
export default LocationDetails;