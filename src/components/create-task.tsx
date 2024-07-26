import styles from '../layouts/create-task.module.css'
import plus from '../assets/plus.svg'
import { useState } from 'react'

// função que será chamada quando um novo item for adicionado.  
// PropType é uma biblioteca que ajuda a garantir que a função recebe um argumento do tipo correto.  
// O argumento é um string.  
// O nome da prop é "handleList" e o tipo é uma função que recebe um string como argumento.  
// A função não retorna nada.  
// A função é chamada quando o botão é clicado.  
// O botão é um botão do tipo "submit" que envia o formulário.  
interface CreateTaskProps {
    handleList: (task: string) => void;
}

// A função CreateTask recebe uma prop handleList (que é uma função que será chamada quando um novo item for adicionado)
export function CreateTask({ handleList }: CreateTaskProps) {

    const [input, setInput] = useState<string>('')

    const handleAddTask = () => {
        if (input.length > 0) {
            handleList(input);
            setInput('');
        }
      };

    return (
        <div className={styles.div}>

            <input
                className={styles.input}
                type="text"
                placeholder="Adicione uma nova tarefa"
                value={input} // usar o state para controlar o input do usuario.
                onChange={(e) => setInput(e.target.value)} // usar o onChange para atualizar o state quando o usuario digita.
            />
            <button 
                type='submit' 
                className={styles.button} 
                onClick={handleAddTask} 
                disabled={input.length === 0}
            >
                Criar 
                <img src={plus} alt=''/>
            </button>

        </div>
    )
}