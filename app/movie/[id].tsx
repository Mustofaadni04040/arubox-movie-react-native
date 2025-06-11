import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-accent font-normal text-sm">{label}</Text>

      <Text className="text-white font-bold text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>

          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-accent text-sm">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-accent text-sm">{movie?.runtime}</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-accent text-sm">
              ({movie?.vote_count} suara)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview as string} />
          <MovieInfo
            label="Genre"
            value={movie?.genres?.map((g) => g.name).join(" - ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget! / 1_000_000} juta`}
            />
            <MovieInfo
              label="Pendapatan"
              value={`$${Math.round(movie?.revenue!) / 1_000_000} juta`}
            />
          </View>

          <MovieInfo
            label="Rumah Produksi"
            value={
              movie?.production_companies
                .map((c) => c.name)
                .join(" - ") as string
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-3 left-0 right-0 mx-5 bg-[#FF0C51] rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Kembali</Text>
      </TouchableOpacity>
    </View>
  );
}
