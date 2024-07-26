import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { CreateTask } from "../create-task"

describe('should display input & button and execute your features correctly', () => {
    it('should display the input and button',  () => {
        const wrapper = render(<CreateTask handleList={() => {}} />)

        const input = wrapper.getByPlaceholderText('Adicione uma nova tarefa')
        const button = wrapper.getByText('Criar')

        // Expect that input is on document
        expect(input).toBeInTheDocument()

        // Expect that button is on document
        expect(button).toBeInTheDocument()

        wrapper.debug() // Show html on log
    })

    it('should check if button is disabled when input is empty and enabled when input is filled.', async () => {
        const wrapper = render(<CreateTask handleList={() => {}} />)
        const input = wrapper.getByPlaceholderText('Adicione uma nova tarefa')
        const button = wrapper.getByText('Criar')

        // Expect that input element beginning with empty value
        expect(input).toHaveValue('')

        // check if button are disabled when there's no text in input
        expect(input).toBeTruthy()
        expect(button).toBeDisabled()

        // simulate the typing of user in input element
        await userEvent.type(input, 'Task 4 - teste')

        // check if button are enabled when there's text in input
        expect(input).toHaveValue('Task 4 - teste')

        // check if button are enabled when there's text in input
        expect(button).toBeEnabled()

        wrapper.debug() // show the html on log
    })

    it('should call handleList when button is clicked', async () => {
        // Cria uma função mock para handleList
        const handleAddTask = vi.fn()
        
        // Loading that component with mock function
        const wrapper = render(<CreateTask handleList={handleAddTask}/>)

        // Set input and button locale
        const input = wrapper.getByPlaceholderText('Adicione uma nova tarefa')
        const button = wrapper.getByText('Criar')

        // simulate the typing of user in input element and her click button
        await userEvent.type(input, 'Task 5 - Teste')
        await userEvent.click(button)

        expect(handleAddTask).toBeCalledWith('Task 5 - Teste')

        // wrapper.debug()
    })

    it('should check input type="checkbox" when is clicked for mark, unmark when clicked again and set the status correctly', async () => {
        // const wrapper = render(<CreateTask handleList={() => {}} />)

        // const checkboxList = 
    })
})