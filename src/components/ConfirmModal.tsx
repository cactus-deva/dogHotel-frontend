
interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }
  
  export default function ConfirmModal({ message, onConfirm, onCancel }: ConfirmModalProps) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4 max-w-sm w-full mx-4">
          <p className="text-lg text-gray-700">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  