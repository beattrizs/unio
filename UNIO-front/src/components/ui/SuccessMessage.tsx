interface SuccessMessageProps {
  message: string;
}

export default function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div
      role="status"
      className="mb-4 rounded-full border border-deepgreen bg-deepgreen/10 px-5 py-3 text-center font-medium text-deepgreen"
    >
      {message}
    </div>
  );
}
