import EpisodeDetails from "@/components/EpisodeDetails";
import { GET_EPISODES } from "@/queries";
import { Episode, EpisodeQuery } from "@/types";
import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Episode: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [epsiode, setEpisode] = useState<Episode>();

  const { loading, data, error } = useQuery<EpisodeQuery>(GET_EPISODES, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setEpisode(data.episode);
    } else {
      <div>Not data yet...</div>;
    }
  }, [data]);

  if (loading) <div>Loading...</div>;
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <EpisodeDetails data={epsiode} />;
};

export default Episode;
