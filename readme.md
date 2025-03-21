## Animus 

Software de gestão de academias e centro de treinamentos. 

Aberto a contribuições, entre em contato comigo !

## O que é?

Animus é um software de gestão para academias e centros de treinamento, projetado para otimizar a administração de aulas e a confirmação de presença dos alunos, reduzindo faltas e melhorando a organização dos profissionais.

## Arquitetura 

Construído com arquitetura de microserviços, o sistema segue os princípios do SOLID e utiliza o padrão Singleton para garantir modularidade, reutilização de código e escalabilidade. Além disso, é um software multitenant, permitindo que diferentes academias utilizem a plataforma de forma independente.

## Tech Stack

- Node.js – Utilizados para criar APIs RESTful de forma eficiente e escalável, seguindo boas práticas de arquitetura.
- PostgreSQL – Escolhido como banco de dados relacional para armazenar dados estruturados com consistência e confiabilidade.
- MongoDB – Utilizado para armazenar informações sobre aulas, garantindo mais flexibilidade e agilidade na consulta desses dados.
- Cloudinary – Plataforma usada para armazenamento de imagens e vídeos curtos, garantindo uploads rápidos e gratuitos.
- Jest – Ferramenta de testes unitários para garantir a confiabilidade e qualidade do código.
- Socketio - Para ter configurar o websocket e ter uma menor latência e comunicação em tempo real.



## Configs .ENV

- Configure seu .Env com essas var
POSTGRES_HOST
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
POSTGRES_SSL


JWT_SECRET & REFRESH_SECRET

- execute para gerar um secret para seu jwt e gere outro para refresh no windows
```
node -e 'console.log(require('crypto').randomBytes(32).toString('hex'))'
```

- no linux com openssl

```
openssl rand -hex 32
```