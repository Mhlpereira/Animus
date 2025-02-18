## Animus 

Software de gestão de academias e centro de treinamentos. 

## O que é?

Animus é um software de gestão para academias e centros de treinamento, projetado para otimizar a administração de aulas e a confirmação de presença dos alunos, reduzindo faltas e melhorando a organização dos profissionais.

## Arquitetura 

Construído com arquitetura de microserviços, o sistema segue os princípios do SOLID e utiliza o padrão Singleton para garantir modularidade, reutilização de código e escalabilidade. Além disso, é um software multitenant, permitindo que diferentes academias utilizem a plataforma de forma independente.

## Tech Stack

- NestJS & Node.js – Utilizados para criar APIs RESTful de forma eficiente e escalável, seguindo boas práticas de arquitetura.
- Golang (Middleware) – Implementado para melhorar a performance e reduzir custos operacionais na comunicação entre serviços.
- PostgreSQL – Escolhido como banco de dados relacional para armazenar dados estruturados com consistência e confiabilidade.
- MongoDB – Utilizado para armazenar informações sobre aulas, garantindo mais flexibilidade e agilidade na consulta desses dados.
- NATS – Responsável pela comunicação entre microserviços, proporcionando um sistema leve e altamente performático.
- Cloudinary – Plataforma usada para armazenamento de imagens e vídeos curtos, garantindo uploads rápidos e gratuitos.
- Jest – Ferramenta de testes unitários para garantir a confiabilidade e qualidade do código.



## Configs .ENV

- Configure seu .Env com essas var
POSTGRES_HOST
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
POSTGRES_SSL


JWT_SECRET

- execute para gerar um secret para seu jwt no windows
```
node -e 'console.log(require('crypto').randomBytes(32).toString('hex'))'
```

- no linux com openssl

```
openssl rand -hex 32
```