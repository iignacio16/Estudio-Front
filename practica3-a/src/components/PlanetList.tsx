import { PlanetsAPI } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";

const PlanetLists: React.FC<{ data: PlanetsAPI }> = ({ data }) => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div>
      <h1>Plabets (page: {page})</h1>
      <ul>
        {data &&
          data.results &&
          data.results.map((p) => {
            const id = p.url.split("/").slice(-2)[0];
            return(
            <li key={p.name}>
              <Link href={`/planet/${id}`}>{p.name}</Link>
            </li>
            )
          })}
      </ul>
      <div>
        {data.previous && (
            <Link href={`/planets/${parseInt(page as string) - 1}`}>Previous</Link>
        )}{" "} | {" "}
        {data.next && (
            <Link href={`/planets/${parseInt(page as string) + 1}`}>Next </Link>
        )}
      </div>
    </div>
  );
};



export default PlanetLists;