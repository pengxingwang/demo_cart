import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { IProductItem } from "../services/productItem";

/**
 * 商品item
 * @returns
 */

export const ProductItem = ({ record }: { record: IProductItem }) => {
  return (
    <View style={styles.cell}>
      <Image
        style={styles.img}
        source={{
          uri: record.img,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    height: "60%",
  },
  img: {
    width: 100,
    height: 200,
  },
});
