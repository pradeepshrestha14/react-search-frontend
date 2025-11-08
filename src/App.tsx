import React, { useState } from "react";
import { Layout, Typography } from "antd";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useDebounce } from "./hooks/useDebounce";
import { SearchBar } from "./components/SearchBar";
import { ProductList } from "./components/ProductList";

const { Header, Content } = Layout;
const { Title } = Typography;

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedQuery = useDebounce(searchTerm, 500);

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ minHeight: "100vh", background: "#fff" }}>
        <Header style={{ background: "#fff", padding: "1rem 2rem" }}>
          <Title level={3} style={{ margin: 0 }}>
            🛍️ Product Search
          </Title>
        </Header>
        <Content style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <ProductList query={debouncedQuery} />
        </Content>
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;


