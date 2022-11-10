import { Button, Flex, WhiteSpace } from "@ant-design/react-native";
import React from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { IProductItem } from "../services/productItem";

/**
 * 商品item
 * @returns
 */
export const ProductItem = ({ record }: { record: IProductItem }) => {
  const [count, setCount] = React.useState<string | null>(null);
  return (
    <View style={styles.cell}>
      <Image
        style={styles.img}
        source={{
          uri: record.img,
        }}
      />
      <WhiteSpace />
      <Text style={styles.title}>{record.title}</Text>
      <WhiteSpace />
      <Text style={styles.content}>{record.content}</Text>
      <WhiteSpace />
      <TextInput
        style={styles.input}
        defaultValue={"1"}
        onChangeText={setCount}
      />
      <Flex>
        <Text style={styles.price}>￥{record.price}</Text>
        <Flex.Item>
          <Button type={"primary"}>添加购物车</Button>
        </Flex.Item>
      </Flex>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {},
  img: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
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
});
