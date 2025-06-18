import { ReactNode, useEffect } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  sizeClass?: string;
  heightClass?: string;
}

export default function Dialog({ isOpen, onClose, title, icon, children, footer, sizeClass, heightClass }: DialogProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full ${sizeClass || 'max-w-md'} ${heightClass || ''} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="flex justify-center mb-4">
            {icon}
          </div>
        )}
        {title && (
          <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        )}
        <div>{children}</div>

        {footer && <div className="mt-6 flex justify-center gap-4">{footer}</div>}
      </div>
    </div>
  );
}
