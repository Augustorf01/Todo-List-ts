import empty from '../../../assets/empty-list.svg'
import style from '../../../layouts/empty-theme/Tasks.module.css'

export function EmptyList() {
    return (
        <>
            <div className={style.bottomlist}>
                <img className={style.emptylist} src={empty} />
                <p>
                    <strong>
                        Você ainda não tem tarefas cadastradas
                    </strong>
                    <br/>
                    Crie tarefas e organize seus itens a fazer
                </p>    
            </div>
        </>
    )
}