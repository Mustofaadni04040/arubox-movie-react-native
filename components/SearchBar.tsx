import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

export default function SearchBar({
  onPress,
  placeholder,
}: {
  onPress?: () => void;
  placeholder: string;
}) {
  return (
    <View className="flex flex-row gap-3 items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        className="size-5"
        resizeMode="contain"
        source={icons.search}
        tintColor="#FFBCCF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor={"#fff"}
        className="flex-1 ml-2 text-white placeholder:opacity-50"
      />
    </View>
  );
}
