function Footer() {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        background: "wheat",
        color: "black",
        display: "flex",
        alignItems: "center",
        padding: "12px",
        justifyContent:'center',
        fontWeight:'600'
      }}
    >
      {`TMDB @ ${new Date().toDateString()}`}
    </div>
  );
}

export default Footer;
