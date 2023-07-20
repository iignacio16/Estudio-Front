import PlanetList from "@/components/planetList";
import { GET_ALL_PLANETS } from "@/queries";
import { PlanetsConnection, allPlanetsQuery } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const client = getClientSSR();
    const { data } = await client.query<allPlanetsQuery>({
      query: GET_ALL_PLANETS,
    });

    return {
      props: {
        data: data.allPlanets,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        hasData: false,
      },
    };
  }
};

const PlanetsPage = ({data}: {data:PlanetsConnection}) => {
    return <PlanetList data={data}/>
}
export default PlanetsPage;