# Aplicação Buy Material

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) na versão 18.0.7.

## Requisitos Funcionais

### Cenário 1: Solicitante de Compra

Dado que sou um solicitante, preciso solicitar a compra de pilhas AAA. O sistema deve possibilitar registrar:
- **Nome do Solicitante**
- **Descrição do Item** (texto livre)
- **Preço do Produto** (texto livre com máscara de "R$ XX,XX")

### Cenário 2: Almoxarife (Aprovador de Solicitações)

Dado que sou Almoxarife, aprovador de solicitações de compra, preciso aprovar ou reprovar as solicitações. O sistema deve possibilitar que o aprovador:
- Visualize uma tela idêntica à do solicitante, porém com campos preenchidos como readonly.
- Selecione uma ação para a solicitação (Aprovar ou Reprovar) através de um campo select.
- Preencha obrigatoriamente um campo de Observações, apenas se a solicitação for reprovada.

### Cenário 3: Usuário Administrativo

Dado que sou um usuário da área do setor administrativo, quero consultar os fluxos de solicitação de compra de material de escritório. O sistema deve:
- Ter uma página para consulta de todos os dados das solicitações.
- Permitir filtrar as solicitações por status do fluxo (Aprovados e Reprovados), nome do solicitante e descrição do item.

## Tecnologias Utilizadas

- Angular 18
- Banco de dados: SqlServer
- Linguagem de Back-end: Node.js

### Passos para Configuração

1. **Clone o repositório**

    ```bash
    git clone https://github.com/EricBernardi/portal_office_supply.git
    cd portal_office_supply
    ```

2. **Instale as dependências**

    ```bash
    npm install
    ```

## Servidor de Desenvolvimento

Execute `npm start` para iniciar o servidor de desenvolvimento. Navegue para `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você modificar qualquer arquivo de origem.

## Build

Execute `npm run build` para realizar o build do projeto. Os artefatos de build serão armazenados no diretório `dist/`.
