import { ElixirDetails } from "@/components/ElixirDetails";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ElixirAPI } from "@/types";
import {GetServerSideProps, NextPage} from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query;
    if(!id) <LoadingSpinner/>

    const res = await fetch(`https://wizard-world-api.herokuapp.com/Elixirs/${id}`);
    const data: ElixirAPI = await res.json();

    return{
        props: {
            data,
        }
    }
}

const ElixirsPage: NextPage<{data: ElixirAPI}> = ({data}) => {
    return(
        <ElixirDetails data={data}/>
    )
}

export default ElixirsPage;