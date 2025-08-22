import "./LoadingSpinner.scss";

const LoadingSpinner = ({ className }) => {
  return <div className={`LoadingSpinner ${className ?? ""}`} />;
};

export default LoadingSpinner;
