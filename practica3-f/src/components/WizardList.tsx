import { WizardsAPI } from "@/types";
import Link from "next/link";
import styled from "styled-components"


interface WizardListProps {
  data: WizardsAPI[];
  showElixirs: boolean;
}

export const WizardList: React.FC<WizardListProps> = ({
  data,
  showElixirs = false,
}) => {
  return (
    <Container>
      {data?.map((w, i) => (
        <div key={i}>
          <br />
          <ul>
            <h2>
              <Link href={`/wizard/${w.id}`}>
                {w.firstName} {w.lastName}
              </Link>
            </h2>
            <ul>
              {showElixirs && <h5>Elixirs</h5> &&
                w.elixirs.map((e) => {
                  return (
                    <li key={e.id}>
                      <Link href={`/elixirs/${e.id}`}>{e.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </ul>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
width: 200px;
height: fit-content;
border: 1px solid black;
padding: 10px;
margin: 10px;
display: flex;
flex-direction: column;
align-items: flex-start;
border-radius: 10px;
> h2 {
    text-align: center;
    width: 100%;
}

`
