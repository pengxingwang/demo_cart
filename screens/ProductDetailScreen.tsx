import { WhiteSpace, WingBlank } from "@ant-design/react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ProductItem } from "../components/ProductItem";

import { View } from "../components/Themed";

export default function ProductDetailScreen({ route, navigation }) {
  const { record } = route.params;

  return (
    <ScrollView
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <WhiteSpace />
        <WingBlank>
          <ProductItem record={record} />
        </WingBlank>
        <WhiteSpace size="lg" />
      </View>
    </ScrollView>
  );
}
