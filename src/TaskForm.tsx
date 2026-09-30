/* 3. The Controlled Action Mutation Input Form Component
• Conceptual Reason: 
This component uses useActionState to track async actions 
seamlessly. It manages operational transactions by tracking state returned from 
server handlers and providing an implicit isPending state natively.
*/

import { useActionState, useEffect, useRef } from "react";
import SubmitButton from "./SubmitButton";
import type { Task, ActionResponse } from "./types";

interface TaskFormProps {
  onSubmitAction: (formData: FormData) => Promise<ActionResponse>;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

export default function TaskForm({ onSubmitAction, editingTask, onCancelEdit }: TaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // useActionState receives: (actionHandler, initialFormState)
  // It returns: [latestFormResultState, wrappedFormActionTrigger, globalPendingBoolean]
  const [state, formAction, isPending] = useActionState(
    async (_prevState: ActionResponse | null, formData: FormData) => {
      return await onSubmitAction(formData);
    },
    { error: undefined, success: false }
  );

  // Safely auto-flush inputs upon confirmed successful transactions
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      ref={formRef}
      className="bg-slate-50 p-5 rounded-xl mb-6 border border-slate-200 shadow-inner"
    >
      <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
        {editingTask ? "📝 Modification Screen" : "➕ Task Creation Form"}
      </h3>

      <div className="flex flex-col gap-3">
        <input
          key={editingTask ? `edit-${editingTask.id}` : "create"}
          defaultValue={editingTask ? editingTask.text : ""}
          name="taskText"
          type="text"
          placeholder="e.g. Master React 19 context engines..."
          disabled={isPending}
          className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm shadow-sm placeholder-slate-400
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all
                     disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200"
        />

        {state?.error && (
          <div className="bg-rose-50 border-l-4 border-rose-500 p-2.5 rounded-r-md">
            <p className="text-rose-700 text-xs font-semibold">{state.error}</p>
          </div>
        )}

        <div className="flex gap-2 mt-1">
          <SubmitButton isEditing={!!editingTask} />
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2.5 bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
