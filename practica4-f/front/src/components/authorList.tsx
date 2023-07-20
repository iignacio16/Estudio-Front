import { Author } from "@/types";
import { useRouter } from "next/router";
import styled from "styled-components";
import { InfinitySpin } from "react-loader-spinner";

const AuthorList = ({ data }: { data: Author[] }) => {
  const router = useRouter();
  return (
    <>
      {data.length < 0 && <InfinitySpin />}
      <Grid>
        {data.map((a) => (
          <StyledCell
            key={a._id}
            onClick={() => {
              router.push(`/author/${a._id}`);
            }}
          >
            <p>Name: {a.name}</p>
          </StyledCell>
        ))}
      </Grid>
    </>
  );
};

export default AuthorList;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 3px;
  border-bottom: 2px solid white;
`;

const StyledCell = styled.div`
  flex-direction: column;
  padding: 10px 20px 10px 20px;
  text-align: center;
  border: 1px solid #ddd;
  background-color: #ffffffc4;
  cursor: pointer;
`;
