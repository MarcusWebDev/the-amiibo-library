import LoadingSpinner from "../LoadingSpinner";

const LoadingSpinnerWrapper = ({ className, isLoading, children }) => {
  return isLoading ? (
    <div className={`LoadingSpinnerWrapper ${className ?? ""}`}>
      <LoadingSpinner />
    </div>
  ) : (
    children
  );
};

export default LoadingSpinnerWrapper;
