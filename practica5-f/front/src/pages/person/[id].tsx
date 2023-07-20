import PersonDetail from "@/components/personDetail";
import { GET_PERSON } from "@/queries";
import { Person, personQuery } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const client = getClientSSR();
    const { data } = await client.query<personQuery>({
      query: GET_PERSON,
      variables: { id },
    });

    return {
      props: {
        data: data.person,
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

const PersonPage = ({ data }: { data: Person }) => {
  return <PersonDetail data={data} />;
};
export default PersonPage;
