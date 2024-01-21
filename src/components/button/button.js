import "../Home/Home.css";

const Button = ({ ButtonText, className, onClick }) => {
  return (
    <div className={`standard-btn ${className}`} onClick={onClick}>
      {ButtonText}
    </div>
  );
};

export default Button;
