import Link from "next/link";
import Profile from "./Profile";

function Header() {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        background: "wheat",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "18px",
        justifyContent: "space-between",
        fontWeight: "600",
      }}
    >
      <div style={{ gap: "30px", display: "flex" }}>
        <Link href={"/"}>Home</Link>
        <Link href={"/movies"}>Movies</Link>
      </div>
      <div>
        <Profile />
      </div>
    </div>
  );
}

export default Header;
