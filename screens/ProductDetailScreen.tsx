import { WhiteSpace, WingBlank } from "@ant-design/react-native";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { ProductItem } from "../components/ProductItem";

import { View } from "../components/Themed";
import { PRODUCT_LIST } from "../constants/DataSource";
import { IProductItem } from "../services/productItem";
import { RootStackParamList } from "../types";

export default function ProductDetailScreen({
  route,
}: {
  route: RouteProp<RootStackParamList, "ProductDetail">;
}) {
  const { id } = route.params;

  const record = React.useMemo(() => {
    const filter = PRODUCT_LIST.find((item) => item.id === id);
    return filter as IProductItem;
  }, [id]);

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
