import VehicleList from "@/components/vehicleList";
import { GET_ALL_VEHICLES } from "@/queries";
import { VehiclesConnection, allVehiclesQuery } from "@/types";
import { getClientSSR } from "@/utils/apolloclient";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    try{
        const client = getClientSSR()
        const {data} = await client.query<allVehiclesQuery>({
            query: GET_ALL_VEHICLES
        })

        return{
            props:{
                data: data.allVehicles
            }
        }
    }catch(e){
        console.log(e)
        return{
            props:{
                hasData:false
            },
        }
    }
};

const VehiclesPage = ({data}: {data:VehiclesConnection})=>{
    return <VehicleList data={data}/>
};
export default VehiclesPage