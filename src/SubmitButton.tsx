/* 
2. The Smart Sub-Form Submit Button Component
Conceptual Reason: 
This component uses useFormStatus to access parent form operations context-free. 
Instead of manually passing cascading conditional attributes down multiple levels 
of nested structural layers, this element natively queries contextual metadata to 
display localized inputs dynamically. */

// The useFormStatus hook is a React API introduced in React 19 that allows child 
// components to access the status of their nearest parent <form> element.

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEditing: boolean;
}

export default function SubmitButton({ isEditing }: SubmitButtonProps) {
  // useFormStatus hooks instantly into the nearest parent <form> wrapper element
  const { pending, data } = useFormStatus();

  // You can intercept submitted field keys in real-time right inside the UI template!
  const currentTaskInput = data?.get("taskText") as string;

  return (
    <button
      type="submit"
      disabled={pending}
      className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-lg text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        ${pending
          ? "bg-slate-400 cursor-not-allowed animate-pulse"
          : isEditing
            ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
            : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        }`}
    >
      {pending
        ? `${isEditing ? "Updating" : "Adding"} "${currentTaskInput || "Task"}"...`
        : isEditing ? "Save Changes" : "Add Task"
      }
    </button>
  );
}
