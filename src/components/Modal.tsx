import { useState, useEffect } from "react";

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: any
}

const Modal = ( { isOpen, onClose, title, children }: ModalProps ) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    // Start fade-out animation
    setShow(false);
    // Wait for animation to finish before unmounting
    setTimeout(onClose, 300);
  };

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className={`bg-white rounded-xl w-11/12 max-w-lg p-6 relative transform transition-all duration-300 ${
              show ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

            <div>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
