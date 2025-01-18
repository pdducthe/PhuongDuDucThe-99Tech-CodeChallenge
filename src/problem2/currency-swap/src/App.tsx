import React from "react";
import "./App.css";
import { ConfigProvider } from "antd";
const Layout = React.lazy(() => import("./components/Layout"));
const Home = React.lazy(() => import("./pages/home"));

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token:{
            fontFamily:'Inter'
          }
        }}
      >
        <Layout>
          <Home />
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
