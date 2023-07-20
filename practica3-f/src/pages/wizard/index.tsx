import { WizardList } from "@/components/WizardList";
import { WizardsAPI } from "@/types";
import { GetServerSideProps, NextPage} from "next"

export const getServerSideProps: GetServerSideProps = async (context) => {
    try{
        const response = await fetch("https://wizard-world-api.herokuapp.com/Wizards")
        const data: WizardsAPI[] = await response.json()
        return{
            props: {
                data,
            }
        }
    }catch(error){
        console.log(error);
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
}

const WizardsPage: NextPage<{data: WizardsAPI[]}> = ({data})=> {
    return (
        <WizardList data={data} showElixirs={false}/>
    )
}

export default WizardsPage;