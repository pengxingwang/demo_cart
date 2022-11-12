import {
  Button,
  Flex,
  InputItem,
  Toast,
  WhiteSpace,
  WingBlank,
} from "@ant-design/react-native";
import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { CartItem } from "../components/CartItem";

import { Text, View } from "../components/Themed";
import { useCart } from "../context/cartProvider";
import { RootStackNavigation, RootTabScreenProps } from "../types";

const PROMO_CODE = "promo code HelloWorld";

export default function ShoppingCartScreen({
  navigation,
}: RootTabScreenProps<"ShoppingCartTab">) {
  const { cartList, totalMoney } = useCart();
  // 点击使用promoCode状态
  const [promoCodeVisible, setPromoCodeVisible] =
    React.useState<boolean>(false);
  // promoCodeValue
  const [promoCode, setPromoCode] = React.useState("");
  // promoCode是否正确状态
  const [correct, setCorrect] = React.useState<boolean | undefined>(undefined);

  const handleOk = () => {
    if (promoCode !== PROMO_CODE) {
      Toast.info("错误的promo code");
      setCorrect(false);
    } else {
      Toast.info("正确的promo code, 满减100元");
      setCorrect(true);
      setPromoCodeVisible(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={150}>
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
                      navigation={navigation as unknown as RootStackNavigation}
                    />
                  </WingBlank>
                  <WhiteSpace size="lg" />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <WingBlank>
          <View>
            {!promoCodeVisible ? (
              <Button onPress={() => setPromoCodeVisible(true)}>
                Promo Code?
              </Button>
            ) : (
              <Flex style={styles.promoCodeWrapper}>
                <Flex.Item>
                  <InputItem
                    placeholder="请输入Promo Code"
                    style={styles.promoCode}
                    onChange={(v) => setPromoCode(v)}
                  />
                </Flex.Item>
                <Text style={styles.okBtn} onPress={() => handleOk()}>
                  使用
                </Text>
                <Text
                  onPress={() => setPromoCodeVisible(false)}
                  style={styles.cancelBtn}
                >
                  取消
                </Text>
              </Flex>
            )}
          </View>
          <Flex style={styles.totalWrapper}>
            <Flex.Item>
              <Text style={styles.label}>共计</Text>
            </Flex.Item>
            <Flex.Item>
              <Text style={styles.money}>￥{totalMoney}</Text>
            </Flex.Item>
          </Flex>
          {correct && (
            <Text style={styles.discount}>
              折扣金额：{totalMoney - 100 < 0 ? 0 : totalMoney - 100}
            </Text>
          )}
          <Button type={"primary"}>结算</Button>
        </WingBlank>
      </KeyboardAvoidingView>
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
  promoCodeWrapper: {},
  promoCode: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
  },
  okBtn: {
    marginRight: 5,
    color: "rgb(16, 142, 233)",
  },
  cancelBtn: {
    marginRight: 5,
    color: "red",
  },
  discount: {
    textAlign: "right",
  },
});
