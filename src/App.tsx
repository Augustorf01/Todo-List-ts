import { Header } from "./components/Header.tsx";
import { CreateTask } from "./components/create-task.tsx";
import { TaskList } from "./components/List/task-list.tsx";
import { CounterTask } from "./components/List/counter-task.tsx";
import { EmptyList } from "./components/List/Empty/empty-list.tsx";

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Definindo a interface Task para tipos de dados da task.
export interface Task {
  id: string,
  Title: string,
  IsCompleted: true | false,
}

// App é o componente principal da nossa aplicação.
export function App() {
  const [task, setTask] = useState<Task[]>([
    { 
      id: uuidv4().toString(), 
      Title: 'Task 1', 
      IsCompleted: false 
    },
    { 
      id: uuidv4().toString(), 
      Title: 'Task 2', 
      IsCompleted: false 
    },
    { 
      id: uuidv4().toString(), 
      Title: 'Task 3', 
      IsCompleted: false 
    },
  ])

  // Adiciona uma nova task ao array e atualiza o estado.
  const addNewTask = (taskTitle: string) => {
    const newTask = {
      id: uuidv4().toString(),
      Title: taskTitle, 
      IsCompleted: false 
    } 
      setTask([...task, newTask])
    }

  // remove a task do array e atualiza o estado.
  const taskDelete = (taskId: string) => {
    // filter() cria um novo array sem o item desejado.
    // setTask() atualiza o estado do componente.
    const updatedTasksById = setTask(task.filter(t => t.id !== taskId))

    return updatedTasksById;
  }

  const concluidas = (taskId: string, checkedTask: boolean) => {
    const updatedTasks = task.map(task => {
      if (task.id === taskId) {
        return { ...task, IsCompleted: !checkedTask };
      }
      return { ...task };
    });
  
    setTask(updatedTasks);
    console.log(updatedTasks);
  }

  const checkedTasksCounter = task.reduce((prevValue, currentTask) => {
    if (currentTask.IsCompleted) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  return (
    <main>
      <Header />

        <div>
           <CreateTask handleList={addNewTask}/> {/* handleList é um callback que é chamado quando uma nova task é adicionado. */}
        </div>

        <CounterTask 
          createdTasks={task.length}
          finishedTasks={checkedTasksCounter}
        />

        {task.length === 0 ? <hr /> : ''}

        {
        task.length > 0 
        ? <TaskList 
            task={task}
            removeTask={taskDelete}
            IsCompleted={concluidas}
          /> 
        : <EmptyList />
        }

    </main>
  )
}
