import React, { useEffect, useRef } from "react";

interface FullscreenDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FullscreenDialog: React.FC<FullscreenDialogProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 h-full w-full overflow-y-auto"
    >
      <div className="flex h-full w-full items-center justify-center px-4 text-center">
        <div className="inline-block h-full w-full max-w-none transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button onClick={onClose} className="text-gray-500">
              Close
            </button>
          </div>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default FullscreenDialog;
