import { HouseAPI } from "@/types";

interface HouseListProps {
  data: HouseAPI[] | undefined;
}

export const HouseList: React.FC<HouseListProps> = ({ data }) => {
  if (data) {
    return (
      <div>
        {data.map((h, index) => (
          <div key={index}>
            <br />
            <ul>
              <h2>{h.name}</h2>
              <p>Founder: {h.founder}</p>
              <p>Common room: {h.commonRoom}</p>
              <ul>
                <h4>Traits</h4>{" "}
                {h.traits.map((t, index) => (
                  <li key={index}>Name: {t.name}</li>
                ))}
              </ul>
              <ul>
                <h4>Head wizards </h4>
                {h.heads.map((w, i) => (
                  <li key={i}>Name: {w.firstName}</li>
                ))}
              </ul>
            </ul>
          </div>
        ))}
      </div>
    );
  }
};
