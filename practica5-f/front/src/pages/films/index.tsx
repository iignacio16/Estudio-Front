import FilmsLists from "@/components/filmsList";
import { GET_ALL_FILMS } from "@/queries";
import { FilmsConnection, allFilmsQuery } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
    try{
        const client = getClientSSR()
        const {data} = await client.query<allFilmsQuery>({
            query: GET_ALL_FILMS
        })
        return{
            props: {
                data: data.allFilms,
            }
        }

    }catch(e){
        console.log(e)
        return{
            props:{
                hasData: false,
            },
        }
    }
}

const FilmsPage = ({data}: {data: FilmsConnection}) => {
    return <FilmsLists data={data}/>
}

export default FilmsPage;