import React from "react";

interface ActionButtonsProps {
  onSaveClick: (e: React.FormEvent) => Promise<void>;
  onCancelClick: (e: React.FormEvent) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onSaveClick,
  onCancelClick,
}) => {
  return (
    <div className="flex flex-col">
      <button
        className="mb-2 w-full transform rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:scale-95 hover:bg-blue-400"
        onClick={onSaveClick}
      >
        保存
      </button>
      <button
        className="border-1 w-full transform rounded border-blue-500 px-4 py-2 text-blue-500 duration-200 hover:scale-95"
        onClick={onCancelClick}
      >
        キャンセル
      </button>
    </div>
  );
};

export default ActionButtons;
