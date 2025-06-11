import React from "react";
import { ScrollView, View } from "react-native";

export default function MovieDetails() {
  return (
    <View className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      ></ScrollView>
    </View>
  );
}
