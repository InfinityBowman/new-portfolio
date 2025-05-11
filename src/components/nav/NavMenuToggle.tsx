interface NavMenuToggleProps {
  onToggle: () => void;
  isOpen: boolean;
}

export default function NavMenuToggle({ onToggle, isOpen }: NavMenuToggleProps) {
  return (
    <div className="fixed top-0 right-0 p-6 w-fit z-50">
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center rounded-md"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        type="button"
      >
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line
            x1="4"
            y1="6"
            x2="20"
            y2="6"
            className={`transition-transform duration-300 ${
              isOpen ? 'transform rotate-45 translate-y-[-0.02rem] translate-x-[0.55rem]' : ''
            }`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="4"
            y1="12"
            x2="20"
            y2="12"
            className={`transition duration-300 ${isOpen ? 'translate-x-7 opacity-25' : ''}`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <line
            x1="4"
            y1="18"
            x2="20"
            y2="18"
            className={`transition-transform duration-300 ${
              isOpen ? 'transform -rotate-45 translate-y-[0.51rem] -translate-x-[0.51rem]' : ''
            }`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
