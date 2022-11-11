import { Button, Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { CartItem } from "../components/CartItem";

import { Text, View } from "../components/Themed";
import { useCart } from "../context/cartProvider";
import { RootTabScreenProps } from "../types";

export default function ShoppingCartScreen({
  navigation,
}: RootTabScreenProps<"ShoppingCartTab">) {
  const { cartList, totalMoney } = useCart();
  console.log(cartList, "cartList");

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {cartList.length === 0 && <Text>请选购商品</Text>}
        {cartList.length > 0 && (
          <View>
            {cartList?.map((item, index) => (
              <View key={index}>
                <WhiteSpace />
                <WingBlank>
                  <CartItem
                    record={item}
                    index={index}
                    navigate={navigation.navigate}
                  />
                </WingBlank>
                <WhiteSpace size="lg" />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <WingBlank>
        <Flex style={styles.totalWrapper}>
          <Flex.Item>
            <Text style={styles.label}>共计</Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={styles.money}>￥{totalMoney}</Text>
          </Flex.Item>
        </Flex>
        <Button type={"primary"}>结算</Button>
      </WingBlank>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
  container: {
    height: "90%",
  },
  totalWrapper: {
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  money: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "right",
  },
});
