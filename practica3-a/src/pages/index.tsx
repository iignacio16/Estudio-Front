import { useRouter } from "next/router";
import { useState } from "react"

export default function Home() {
  const router = useRouter();
  const [idPlanet, setIdPlanet] = useState("");

  const handleChange = (e:any) => {
    setIdPlanet(e.target.value);
  };

  const handleRedirect = () => {
    if (idPlanet) {
      router.push(`planet/${idPlanet}`);
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Id planet"
        value={idPlanet}
        onChange={handleChange}
        required
      />
      <button onClick={handleRedirect}>Go to Planet</button>
    </div>
  );
}



