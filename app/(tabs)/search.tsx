/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const handleSearch = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(handleSearch);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-fit h-auto" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Cari judul film disini..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#FFBCCF"
                className="my-3"
              />
            )}

            {moviesError && (
              <Text className="text-red-500 px-5 my-3">{moviesError}</Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Hasil Pencarian{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "Film tidak ditemukan"
                  : "Cari film favoritmu"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
