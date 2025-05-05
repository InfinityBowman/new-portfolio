import { LoaderCircle } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center m-10">
      <LoaderCircle size={40} className="spin text-blue-400" />
    </div>
  );
};
