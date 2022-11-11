import {
  Button,
  Flex,
  InputItem,
  Radio,
  Toast,
  WhiteSpace,
} from "@ant-design/react-native";
import { RadioValue } from "@ant-design/react-native/lib/radio/PropsType";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useCart } from "../context/cartProvider";
import { IProductItem } from "../services/productItem";

interface EventRadioGroup {
  target: { value: RadioValue };
}
/**
 * 商品item
 * @returns
 */
export const ProductItem = ({ record }: { record: IProductItem }) => {
  // 单个商品数量
  const [count, setCount] = React.useState<number | null>(1);
  // 品规
  const [value, setValue] = React.useState<RadioValue>();

  React.useEffect(() => {
    // 默认选择第一个品规
    setValue(record.sku?.[0].skuId);
  }, [record.sku]);

  const { addCart } = useCart();

  const handleAddCart = () => {
    if (!value) {
      Toast.info({
        content: "请选择商品规格",
      });
      return;
    }
    if (Number(count) < 1) {
      Toast.info({
        content: "数量需要大于0",
      });
      return;
    }
    // 获取品规名称
    const name = record.sku.find((item) => item.skuId === value)?.name;
    addCart({
      name: name as string,
      skuId: value as string,
      total: Number(count),
      ...record,
    });
    Toast.info({
      content: "加入购物车成功",
    });
  };

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
      <Radio.Group
        onChange={(e: EventRadioGroup) => setValue(e.target.value)}
        value={value}
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 6,
        }}
      >
        {record.sku.map((item, index) => (
          <Radio key={index} value={item.skuId}>
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
      <InputItem
        type={"number"}
        style={styles.input}
        defaultValue={"1"}
        onChange={(v) => setCount(Number(v))}
      >
        数量
      </InputItem>

      <Flex>
        <Text style={styles.price}>￥{record.price}</Text>
        <Flex.Item>
          <Button type={"primary"} onPress={handleAddCart}>
            添加购物车
          </Button>
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
