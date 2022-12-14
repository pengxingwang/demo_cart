import { Flex, Stepper, WhiteSpace } from "@ant-design/react-native";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../components/Themed";
import { ICartItem, useCart } from "../context/cartProvider";
import { RootStackNavigation } from "../types";

/**
 * 购物车item
 * @returns
 */
export const CartItem = ({
  record,
  index,
  navigation,
}: {
  record: ICartItem;
  index: number;
  navigation: RootStackNavigation;
}) => {
  const { changeCartCount, removeCart } = useCart();

  const handleRouter = () => {
    navigation.navigate("ProductDetail", {
      id: record.id,
    });
  };

  const handleDelete = () => {
    removeCart(record);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleRouter}>
      <FontAwesome
        onPress={handleDelete}
        size={30}
        style={styles.close}
        name="close"
        color="red"
      />
      <Image
        style={styles.img}
        source={{
          uri: record.img,
        }}
      />
      <WhiteSpace />
      <Flex>
        <Text style={styles.title}>{record.title}</Text>
        <Flex.Item>
          <Text style={styles.skuName}>{record.name}</Text>
        </Flex.Item>
      </Flex>
      <WhiteSpace />
      <Text style={styles.content}>{record.content}</Text>
      <WhiteSpace />
      <Flex>
        <Flex.Item>
          <Stepper
            min={0}
            value={record.total}
            onChange={(value) => {
              changeCartCount(index, value);
            }}
          />
        </Flex.Item>
        <Flex.Item>
          <Text style={styles.currentMoney}>
            ￥{Number(record.price) * record.total}
          </Text>
        </Flex.Item>
      </Flex>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  close: {
    position: "absolute",
    zIndex: 10,
    right: 2,
    top: 2,
  },
  img: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  skuName: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "500",
    color: "rgb(16, 142, 233)",
  },
  content: {},
  btnWrapper: {
    display: "flex",
  },
  price: {
    width: 100,
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  currentMoney: {
    textAlign: "right",
  },
});
