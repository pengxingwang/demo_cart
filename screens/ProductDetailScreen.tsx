import { WhiteSpace, WingBlank } from "@ant-design/react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ProductItem } from "../components/ProductItem";

import { View } from "../components/Themed";
import { PRODUCT_LIST } from "../constants/DataSource";

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;

  const record = React.useMemo(() => {
    const filter = PRODUCT_LIST.find((item) => item.id === id);
    return filter;
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
          <ProductItem record={record} canNavigate={false} />
        </WingBlank>
        <WhiteSpace size="lg" />
      </View>
    </ScrollView>
  );
}
