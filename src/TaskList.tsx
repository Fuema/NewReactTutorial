// 4. The Live Optimistic Task Queue Display
// Conceptual Reason: Data Rendering Layer

import type { Task } from "./types";

interface TaskListProps {
  tasks: Task[];
  onDeleteAction: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onDeleteAction, onEdit }: TaskListProps) {
  return (
    <div className="mt-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Current Work Queue ({tasks.length})
      </h3>

      {tasks.length === 0 && (
        <p className="text-sm text-slate-400 italic bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-xl text-center">
          No operations found. Use the form above to add tasks!
        </p>
      )}

      <ul className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
        {tasks.map((task) => {
          // Identify if an item state signature is a local mock runtime item
          const isOptimistic = task.id.toString().startsWith("temp-") || task.text.includes("(Pending...)");

          return (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 transition-all duration-200 hover:bg-slate-50/70 ${isOptimistic ? "bg-slate-50/50 opacity-60 italic" : ""
                }`}
            >
              <span className={`text-sm font-medium tracking-tight text-slate-700 truncate pr-4 ${isOptimistic ? "text-slate-400" : ""}`}>
                {task.text}
              </span>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onEdit(task)}
                  disabled={isOptimistic}
                  className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-md hover:bg-amber-600 transition-colors shadow-sm disabled:opacity-30 disabled:pointer-events-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteAction(task.id)}
                  disabled={isOptimistic}
                  className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-md hover:bg-rose-600 transition-colors shadow-sm disabled:opacity-30 disabled:pointer-events-none"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
