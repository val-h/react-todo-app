interface ButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
}

const Button = ({
  label,
  className,
  onClick,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
