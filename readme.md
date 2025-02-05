## Animus 

Software de gestão de academias e centro de treinamentos. 

## O que é?

Projeto desenvolvido para solucionar o problema de faltas dos alunos, permitindo a criação de aulas e a confirmação de presença pelos atletas, melhorando a gestão dos profissionais e reduzindo bolos.

## Tech Stack

- Node.js – Utilizado no backend para processamento eficiente das requisições.
- ExpressJs – Responsável pelo gerenciamento das chamadas HTTP.
- PostgreSQL – Banco de dados relacional para armazenar dados estruturados.
- MongoDB – Usado para armazenar informações sobre as aulas, garantindo mais leveza e flexibilidade na gestão desses dados.

## Configs .ENV

-Configure seu .Env com essas var
    POSTGRES_HOST

    POSTGRES_PORT

    POSTGRES_USER

    POSTGRES_PASSWORD

    POSTGRES_DB
    
    JWT_SECRET

- execute para gerar um secret para seu jwt
```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
    