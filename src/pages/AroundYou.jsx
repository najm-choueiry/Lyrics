import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountry } from "../redux/services/shazamCore";
import { useFetcher } from "react-router-dom";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_k5AZGhkOIIFDxx6J9GLsNAX9l3rWu`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    // at_k5AZGhkOIIFDxx6J9GLsNAX9l3rWu
  }, [country]);

  const { data, isFetching, error } = useGetSongsByCountry(country);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-5 mb-10">
        {" "}
        Around You <span className="font-black">{country} </span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => {
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />;
        })}
      </div>
    </div>
  );
};

export default AroundYou;
