import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div
        className="main-content"
        style={{
          height: "calc(100vh - 120px)",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
