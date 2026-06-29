import React from 'react';

function TaskItem({ task, onDelete, onToggleComplete }) {
  return (
    <li className="flex items-center justify-between p-2 bg-white shadow-sm">
      <span
        className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="bg-red-500 text-white p-1 ml-2"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;