// 5. The Root Orchestration Controller Engine
// This file handles all logic, state synchronization with json-server, validation thresholds,
// and multi-intent hooks (useOptimistic, actions).

// Conceptual Reason: 
// This component uses useOptimistic to keep our interface responsive. 
// It immediately updates our list with placeholder additions, mutations, or deletions so 
// the user experiences zero lag while data saves over slow networks.

// src/TaskManager.tsx
import { useState, useEffect, useOptimistic } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import type { Task, ActionResponse } from "./types";
import { useToast } from "./ToastContext";

const API_URL = "http://localhost:3001/tasks";

type OptimisticAction =
    | { type: "ADD"; payload: string }
    | { type: "DELETE"; payload: string }
    | { type: "UPDATE"; payload: { id: string; text: string } };

export default function TaskManager() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { showToast } = useToast(); // ⬅️ Initialize Toast

    // Sync initial dataset and throw crash errors directly to the boundary if connection drops completely
    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error("Server answered with error header code.");
                return res.json();
            })
            .then((data) => setTasks(data))
            .catch((err) => {
                // This forces the nearest React ErrorBoundary to capture the async lifecycle boot error
                setTasks(() => { throw new Error(err.message || "Failed to fetch base records from db.json"); });
            });
    }, []);

    const [optimisticTasks, setOptimisticTasks] = useOptimistic(
        tasks,
        (currentState: Task[], action: OptimisticAction) => {
            switch (action.type) {
                case "ADD": return [...currentState, { id: "temp-" + Date.now(), text: `${action.payload} (Pending...)` }];
                case "DELETE": return currentState.filter((t) => t.id !== action.payload);
                case "UPDATE": return currentState.map((t) => t.id === action.payload.id ? { ...t, text: `${action.payload.text} (Pending...)` } : t);
                default: return currentState;
            }
        }
    );

    async function submitTaskAction(formData: FormData): Promise<ActionResponse> {
        const text = formData.get("taskText") as string;
        if (!text || text.trim().length < 5) return { error: "Validation Failed: Task must encompass 5 or more characters." };

        await new Promise((res) => setTimeout(res, 1200));

        if (editingTask) {
            const targetId = editingTask.id;
            setOptimisticTasks({ type: "UPDATE", payload: { id: targetId, text } });
            setEditingTask(null);

            try {
                const res = await fetch(`${API_URL}/${targetId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setTasks((prev) => prev.map((t) => (t.id === targetId ? data : t)));
                return { success: true };
            } catch {
                showToast("Could not modify your task. Reverting UI state..."); // ⬅️ Trigger Toast
                return { error: "Network Error: Failed to commit modifications to server." };
            }
        } else {
            setOptimisticTasks({ type: "ADD", payload: text });

            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error();
                const data = await res.json();
                setTasks((prev) => [...prev, data]);
                return { success: true };
            } catch {
                showToast("Failed to create task on the server. Reverting..."); // ⬅️ Trigger Toast
                return { error: "Network Error: Failed to create entry on database server." };
            }
        }
    }

    async function deleteTaskAction(id: string) {
        setOptimisticTasks({ type: "DELETE", payload: id });
        await new Promise((res) => setTimeout(res, 600));

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error();
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch {
            showToast("Deletion failed on backend. Recovering task element..."); // ⬅️ Trigger Toast
        }
    }

    return (
        <>
            <TaskForm onSubmitAction={submitTaskAction} editingTask={editingTask} onCancelEdit={() => setEditingTask(null)} />
            <TaskList tasks={optimisticTasks} onDeleteAction={deleteTaskAction} onEdit={(task) => setEditingTask(task)} />
        </>
    );
}

