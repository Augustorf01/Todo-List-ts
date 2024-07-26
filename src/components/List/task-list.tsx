// import { useState } from 'react'
import { Task } from '../../App'
import style from '../../layouts/task-list.module.css'
import { Trash2 } from 'lucide-react'

interface TaskListProps {
    removeTask: (id: string) => void,
    IsCompleted: (id: string, status: boolean) => void,
    task: Task[]  // Array de objetos do tipo Task
}

export function TaskList({ task, removeTask, IsCompleted }: TaskListProps) {

    return (
        <div className={style.divList}>
            {task.map((t) => (
                <div key={t.id} className={style.divTask}>
                    <input onClick={() => IsCompleted(t.id, t.IsCompleted)} id={t.id} type="checkbox" placeholder='status' />
                    <label htmlFor={t.id}>{t.Title}</label>

                    <button onClick={() => removeTask(t.id)} className={style.buttonTrash} title='Deletar' name='Deletar' >
                        <Trash2 className={style.trash} size={20} />
                    </button>

                </div>
            ))}
        </div>
    )
}
