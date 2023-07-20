import { Button } from "@mui/material"
import { useRouter } from "next/router"
export default function Home() {
  const router = useRouter();
  return (
    <>
    <Button onClick={()=>{
      router.push("/events")
    }}>Ir a eventos</Button>
    </>
  )
}
