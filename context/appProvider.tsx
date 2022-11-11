import { Provider } from "@ant-design/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "./cartProvider";

// App所有的provider
export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <Provider>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <CartProvider>{children}</CartProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </Provider>
  );
};
