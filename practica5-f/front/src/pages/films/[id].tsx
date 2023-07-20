import FilmDetail from "@/components/filmDetail";
import { GET_FILM } from "@/queries";
import { Film, filmByIDQuery } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    const client = getClientSSR();
    const { data } = await client.query<filmByIDQuery>({
      query: GET_FILM,
      variables: { filmId: id },
    });

    return {
      props: {
        data: data.film,
        id: id
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

const filmPage = ({data, id }: {data:Film; id:string})=>{
    return <FilmDetail data={data} id={id}/>
}

export default filmPage;