import { ImSpinner6 as LoadingIcon } from 'react-icons/im';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center m-10">
      <LoadingIcon
        size={40}
        className="spin text-blue-400"
      />
    </div>
  );
}
