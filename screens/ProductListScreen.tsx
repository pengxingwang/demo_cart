import { useQuery } from "@tanstack/react-query";
import React from "react";
import { StyleSheet } from "react-native";
import { ProductItem } from "../components/ProductItem";

import { Text, View } from "../components/Themed";
import { getProductList } from "../services/productItem";
import { RootTabScreenProps } from "../types";

export default function ProductListScreen({
  navigation,
}: RootTabScreenProps<"ProductListTab">) {
  // fetch
  const { data, isLoading, isSuccess } = useQuery(
    ["product-list"],
    async () => {
      const res = await getProductList();
      if (res.success) {
        return res.data;
      }
    }
  );

  return (
    <View style={styles.container}>
      {isLoading && (
        <>
          <Text>Loading...</Text>
        </>
      )}
      {isSuccess && (
        <View>
          {data?.map((item, index) => (
            <ProductItem key={index} record={item} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
