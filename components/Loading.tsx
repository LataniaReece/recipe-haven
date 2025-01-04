interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function Loading({
  size = "md",
  text = "Loading...",
}: LoadingProps) {
  const spinnerSizeClasses = {
    sm: "h-6 w-6 border-t-2 border-b-2",
    md: "h-9 w-9 border-t-2 border-b-2",
    lg: "h-12 w-12 border-t-2 border-b-2",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 mt-7 lg:mt-0">
      <div
        className={`animate-spin rounded-full ${spinnerSizeClasses[size]} border-secondaryColor`}
      ></div>
      {text && <p className={`font-medium ${textSizeClasses[size]}`}>{text}</p>}
    </div>
  );
}
