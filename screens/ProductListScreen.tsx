import { WhiteSpace, WingBlank } from "@ant-design/react-native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ProductItem } from "../components/ProductItem";

import { Text, View } from "../components/Themed";
import { PRODUCT_LIST } from "../constants/DataSource";
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
        // 因为mock的数据只能重复，为了购物车功能多样化，这里直接写死数据
        return PRODUCT_LIST;
      }
    }
  );

  return (
    <ScrollView
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {isLoading && (
        <>
          <Text>Loading...</Text>
        </>
      )}
      {isSuccess && (
        <View>
          {data?.map((item, index) => (
            <View key={index}>
              <WhiteSpace />
              <WingBlank>
                <ProductItem record={item} />
              </WingBlank>
              <WhiteSpace size="lg" />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
