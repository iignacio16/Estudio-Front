import PlanetDetail from "@/components/PlanetDetail";
import { Planet, PlanetAPI } from "@/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PlanetbyID: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [planet, setPlanet] = useState<Planet | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const fetchPlanet = async () => {
        try {
            const res = await fetch(`https://swapi.dev/api/planets/${id}`);
            const dataAPI: PlanetAPI = await res.json();
            const data: Planet = {
                ...dataAPI,
                residents: await Promise.all(
                    dataAPI.residents.map(async (url:string)=>{
                        const people = await fetch(url)
                        const result = await people.json()
                        return result;
                    })
                ),
                films: await Promise.all(
                    dataAPI.films.map(async (url:string)=>{
                        const film = await fetch(url)
                        const result = await film.json()
                        return result;
                    })
                )
            }
            setPlanet(data);
        } catch (e: any) {
          if ((e.status = 404)) {
            alert("planet not found");
            router.push("/");
          }
        }
      };

      fetchPlanet();
    }
  }, [id]);

  return(
    <PlanetDetail planet={planet}/>
  )
};

export default PlanetbyID;
