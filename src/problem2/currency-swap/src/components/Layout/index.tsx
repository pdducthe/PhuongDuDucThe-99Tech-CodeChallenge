import Footer from "../Footer";
import BaseHeader from "../Header";

export default function Layout({ children }: any) {
  
  return (
    <>
      <BaseHeader />
      <main style={{flex:1}}>{children}</main>
      <Footer />
    </>
  );
}
