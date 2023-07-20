import LocationDetails from "@/components/LocationDetails";
import { GET_LOCATION } from "@/queries";
import { LocationQuery, Locations } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const client = getClientSSR();
    const { data } = await client.query<LocationQuery>({
      query: GET_LOCATION,
      variables: { id },
    });

    return {
      props: {
        data: data.location,
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

const Location = ({ data }: { data: Locations }) => {
  return <LocationDetails data={data} />;
};

export default Location;
