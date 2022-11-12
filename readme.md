# DEMO CART

### 1.备注

1. UI 组件库集成 Ant Design Mobile RN, 集成了 axios 和 react-query 作用请求库

2. 采用购物车 UI(screens)层和逻辑层(context/cartProvider)分离，购物车数据是一个全局的状态，所以放在了 context 里面, 然后用 hooks 暴露出去。

3. 购物车是根据品规作为分类标准的

4. 因总计是统计所有购物车数据，如果前端 mock 分页加载，总计就会随着页数的增加而增加，这样逻辑就不对，因此没有用分页处理。

### 2.expo 地址

https://expo.dev/@pengxw/DemoCart?serviceType=classic&distribution=expo-go

### 3.安卓下载地址

https://expo.dev/artifacts/eas/b4Hfa7FLWofuBqEq4ucq7g.aab
