import { Book } from "@/types";
import { styled } from "styled-components";
import { InfinitySpin } from "react-loader-spinner";
import { useRouter } from "next/router";

const BookList = ({ data }: { data: Book[] }) => {
  const router = useRouter();
  return (
    <>
      {data.length < 0 && <InfinitySpin />}
      <Grid>
        {data.map((b) => (
          <StyledCell
            key={b._id}
            onClick={() => {
              router.push(`/books/${b._id}`);
            }}
          > 
            <p>Title: {b.title}</p>
            <p>Pages: {b.pages}</p>
          </StyledCell>
        ))}
      </Grid>
    </>
  );
};
export default BookList;

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
