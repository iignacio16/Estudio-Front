import CharacterDetails from "@/components/CharacterDetaiils";
import { CHARACTER_ID, GET_ALL_IDS } from "@/queries";
import { Character,  CharacterIDQuery, CharacterQuery } from "@/types";
import { client } from "@/utils/apolloclient";
import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from "next";
import { getServerSideProps } from "../location/[id]";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query<CharacterQuery>({
      query: GET_ALL_IDS,
    });

    if (!data) {
      return {
        paths: [],
        fallback: true,
      };
    }

    const totalIDS: number = data.characters.info.count; //826
    const paths: string[] = [];
    for (let i = 1; i <= totalIDS; i++) {
      paths.push(i.toString());
    }
    const staticPaths = paths.map((i) => ({
      params: { id: i },
    }));

    return {
      paths: staticPaths,
      fallback: false,
    };
  } catch (e) {
    console.log(e);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps<{ character: Character }> = async ({
  params,
}) => {
  try {
    const { id } = params as { id: string };
    const { data } = await client.query<CharacterIDQuery>({
      query: CHARACTER_ID,
      variables: { id },
    });

    const character = data.character;
    return {
      props: {character},
      revalidate: 1,
    };
  } catch (e) {
    console.log(e);
    return { notFound: true };
  }
};

export default function CharacterPage({character}: InferGetServerSidePropsType<typeof getServerSideProps>){
    return <CharacterDetails data={character}/>
}