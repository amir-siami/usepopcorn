function Logo({ classes, text, img, role }) {
  return (
    <div className={classes}>
      <span role={role}>{img}</span>
      <h1>{text}</h1>
    </div>
  );
}

export default Logo;
