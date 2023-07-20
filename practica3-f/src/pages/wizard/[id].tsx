import { LoadingSpinner } from "@/components/LoadingSpinner";
import { WizardList } from "@/components/WizardList";
import { WizardsAPI } from "@/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WizardDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [wizard, setWizard] = useState<WizardsAPI[]>([]);

  useEffect(() => {
    if (id) {
      try {
        const fetchWizard = async () => {
          const response = await fetch(
            `https://wizard-world-api.herokuapp.com/Wizards/${id}`
          );
          const data: WizardsAPI = await response.json();
          setWizard([data]);
        };
        fetchWizard()
      } catch (error: any) {
        if (error.status === 404) {
          alert("Wizard not found");
          router.push("/");
        }
      };
    }
  }, [id]);

  if(wizard.length === 0){
      return (<LoadingSpinner/>)
  } 

  return (
    <WizardList data={wizard} showElixirs={true}/>
  )
};

export default WizardDetails;