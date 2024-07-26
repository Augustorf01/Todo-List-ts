import style from '../../layouts/empty-theme/counter-task.module.css'

interface CounterTaskProps {
    createdTasks: number,
    finishedTasks: number,
}

export function CounterTask({ createdTasks, finishedTasks }: CounterTaskProps) {
  return (
    <div>
        <div className={style.topList}>

            <div className={style.counter1}>
                <p>
                    Tarefas Criadas
                </p>
                <span>{createdTasks}</span>
            </div>

            <div className={style.counter2}>
                <p>
                    Concluídas 
                </p>
                <span>{finishedTasks} de {createdTasks}</span>
            </div>

        </div>
    </div>
  )
}