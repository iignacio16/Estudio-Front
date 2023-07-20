import PlanetLists from "@/components/PlanetList";
import { PlanetsAPI } from "@/types";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {page} = context.query

    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
    const data: PlanetsAPI = await res.json()
    return{
        props:{
            data,
        }
    }
}

const Planets = ({data}:{data:PlanetsAPI}) => {
    return <PlanetLists data={data} />
}

export default Planets;