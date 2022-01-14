import { useState } from "react";

import Crypto from "crypto";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio. Check
    if (!newTaskTitle) {
      alert("Não crie tarefas com titulo vazio!");
      return null;
    } else {
      let NewTask = {
        id: tasks.length ? tasks.length : 0,
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks([...tasks, NewTask]);
      console.log(tasks);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(
      tasks.map((task) => {
        if (task.id == id) {
          task.isComplete = !task.isComplete;
          return task;
        }
        return task;
      })
    );
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    setTasks(
        tasks.filter((task) => {
          if (task.id == id) {
            return false;
          }
          return true;
        }),
      );
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
