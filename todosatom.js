import { atom } from 'recoil'

/**
 * Átomo principal: guarda a lista de tarefas.
 * É a "fonte da verdade" do estado global da aplicação — qualquer
 * componente pode ler ou escrever aqui através dos hooks do Recoil
 * (useRecoilState, useRecoilValue, useSetRecoilState), sem precisar
 * de Context API ou de passar callbacks manualmente por props.
 */
export const todosState = atom({
  key: 'todosState', // chave única global, obrigatória no Recoil
  default: [
    { id: 1, text: 'Estudar átomos do Recoil', completed: true },
    { id: 2, text: 'Criar um seletor de filtro', completed: false },
    { id: 3, text: 'Conectar os componentes ao estado global', completed: false },
  ],
})
