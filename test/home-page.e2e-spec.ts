import { test, expect } from '@playwright/test';

test('load home page success', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'}); // navegar para homepage

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo List/);
});

test('create new task success', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await page.getByPlaceholder('Adicione uma nova tarefa').fill('Task 4')
  await page.getByRole('button', { name: 'Criar' }).click()

  await expect(page.getByText('Task 4')).toBeVisible()
  await expect(page.getByText('Tarefas Criadas4')).toBeVisible()
})

test('mark task as completed', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await page.getByText('Task 3').click()
  await page.getByText('Task 2').click()
  await page.getByText('Task 1').click()

  await expect(page.getByText('Concluídas3 de')).toBeVisible()
})

test('deselect task as completed', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await page.getByText('Task 3').click() // marcando
  await page.getByText('Task 2').click() // marcando
  await page.getByText('Task 1').click() // marcando

  await page.getByText('Task 3').click() // desmarcando
  await page.getByText('Task 2').click() // desmarcando
  await page.getByText('Task 1').click() // desmarcando

  await expect(page.getByText('Concluídas0 de')).toBeVisible()
})

test('delete task', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  await page.locator('div').filter({ hasText: /^Task 3$/ }).getByRole('button').click()
  await expect(page.getByText('Task 3')).toBeHidden()
  await expect(page.getByText('Tarefas Criadas2')).toBeVisible()
  await expect(page.getByText('de 2')).toBeVisible()
})

test('Test all of application', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle'});

  // 1. Espera escontrar os contadores de tarefas criadas (3) e concluídas (0)
  expect(page.getByText('Tarefas Criadas3')).toBeVisible()
  expect(page.getByText('Concluídas0 de')).toBeVisible()
  ////////////////////////////////////

  // 2. Espera marcar todas as tarefas como concluídas
  await page.getByText('Task 3').click() // marcando
  await page.getByText('Task 2').click() // marcando
  await page.getByText('Task 1').click() // marcando
  await expect(page.getByText('Concluídas3 de')).toBeVisible()
  ///////////////////////////////////
  
  // 3. Espera desmarcar todas as tarefas
  await page.getByText('Task 3').click() // desmarcando
  await page.getByText('Task 2').click() // desmarcando
  await page.getByText('Task 1').click() // desmarcando
  await expect(page.getByText('Concluídas0 de')).toBeVisible()
  //////////////////////////////////

  // 4. Espera adicionar uma nova tarefa
  // 5. Espera quera o contador de tarefas criadas seja atualizado corretamente.
  // 6. Espera que o contador de concluídas permaneça inalterado.
  await page.getByPlaceholder('Adicione uma nova tarefa').fill('Task 4')
  await page.getByRole('button', { name: 'Criar' }).click()
  await expect(page.getByText('Task 4')).toBeVisible()
  await expect(page.getByText('Tarefas Criadas4')).toBeVisible()
  expect(page.getByText('Concluídas0 de')).toBeVisible()
  //////////////////////////////////

  // 7. Espera marcar a nova tarefa criada pelo usuário como concluída
  // 8. Espera que o contador de concluídas seja atualizado corretamente
  await page.getByText('Task 4').click()
  expect(page.getByText('Concluídas1 de')).toBeVisible()
  /////////////////////////////////

  // 9. Espera desmarcar a nova tarefa criada pelo usuário
  await page.getByText('Task 4').click()
  expect(page.getByText('Concluídas0 de')).toBeVisible()
  /////////////////////////////////

  // 10. Espera remover 3 tarefas da lista já existente, verificando se a tarefa sumiu 
  // e se o contador de "Tarefas Criadas" e "Concluídas" está sendo atualizado da forma correta a cada remoção.
  await page.locator('div').filter({ hasText: /^Task 1$/ }).getByRole('button').click()
  await expect(page.getByText('Task 1')).toBeHidden()
  await expect(page.getByText('Tarefas Criadas3')).toBeVisible()
  await expect(page.getByText('de 3')).toBeVisible()

  await page.locator('div').filter({ hasText: /^Task 2$/ }).getByRole('button').click()
  await expect(page.getByText('Task 2')).toBeHidden()
  await expect(page.getByText('Tarefas Criadas2')).toBeVisible()
  await expect(page.getByText('de 2')).toBeVisible()

  await page.locator('div').filter({ hasText: /^Task 3$/ }).getByRole('button').click()
  await expect(page.getByText('Task 3')).toBeHidden()
  await expect(page.getByText('Tarefas Criadas1')).toBeVisible()
  await expect(page.getByText('de 1')).toBeVisible()
  ////////////////////////////////
  
  // 11. Espera remover a nova tarefa criada pelo usuário
  await page.locator('div').filter({ hasText: /^Task 4$/ }).getByRole('button').click()
  await expect(page.getByText('Task 4')).toBeHidden()
  await expect(page.getByText('Tarefas Criadas0')).toBeVisible()
  await expect(page.getByText('de 0')).toBeVisible()
  ////////////////////////////////
})
