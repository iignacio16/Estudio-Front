import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HouseAPI } from "@/types";
import { HouseList } from "@/components/HouseList";


export default function Home() {
  const router = useRouter();
  const [houses, setHouses] = useState<HouseAPI[] | undefined>(undefined);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch(
          "https://wizard-world-api.herokuapp.com/Houses"
        );
        const data: HouseAPI[] = await res.json();
        setHouses(data);
      } catch (e: any) {
        if ((e.staus = 404)) {
          alert(`Houses not found`);
          router.push("/");
        }
      }
    };

    fetchHouses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HouseList data={houses} />
    </>
  );
}
