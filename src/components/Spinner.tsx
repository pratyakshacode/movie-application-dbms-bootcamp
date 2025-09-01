const Spinner = ({ size = 32, color = "blue" }) => {
  return (
    <div
      className={`animate-spin rounded-full border-4 border-t-transparent border-${color}-500`}
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Spinner;