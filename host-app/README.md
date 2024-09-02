# Host: Micro Front-Ends Container

## Descrição
Este projeto é o contêiner host que integra todos os micro front-ends (login, dashboard, companies, e parceiros) em uma única aplicação. Ele foi desenvolvido utilizando React e TypeScript.

## URLs dos Micro Front-Ends
- Login: `http://localhost:4201/remoteEntry.js`
- Dashboard: `http://localhost:4202/remoteEntry.js`
- Companies: `http://localhost:4203/remoteEntry.js`
- Parceiros: `http://localhost:4204/remoteEntry.js`

## Instalação
1. Clone o repositório.
2. Navegue até a pasta do projeto: `cd host-app`.
3. Instale as dependências: `npm install`.

## Uso
- Para rodar o projeto em modo de desenvolvimento: `npm start`.
- Acesse `http://localhost:4200` no navegador.

### Nota
Para que o contêiner host funcione corretamente, é necessário iniciar todos os micro front-ends nas suas respectivas portas:

- **Login:** `npm start` na pasta `login-app` (`http://localhost:4201`)
- **Dashboard:** `ng serve` na pasta `dashboard-app` (`http://localhost:4202`)
- **Companies:** `ng serve` na pasta `external-companies-app` (`http://localhost:4203`)
- **Parceiros:** `ng serve` na pasta `parceiros-app` (`http://localhost:4204`)

## Comandos Importantes
- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.

## Lista de Tarefas

### Tarefas Concluídas
- [x] Configuração do host para integrar todos os micro front-ends.
- [x] Configuração do Module Federation para comunicação entre os micro front-ends.
- [x] Documentação inicial com instruções de instalação e uso.
- [x] Configuração das rotas para cada micro front-end no host.
- [x] Implementação da verificação do checkbox no login para decidir se o usuário será salvo no cookie ou no local storage.
- [x] Redirecionamento para a URL compartilhada após o login, garantindo que o usuário retorne ao link desejado.
- [x] Implementação navbar com menu de navegação.
- [x] Funcionalidade de logout para encerrar a sessão do usuário.

### Tarefas Pendentes
- [ ] Implementar testes unitários e automatizados. **(1-2 dias)**
- [ ] Melhorar o tratamento de erros de carregamento de micro front-ends e retorno visual para o usuário.**(1-2 dias)**
- [ ] Criar um modal de confirmação de modificações nas telas de parceiros e empresas externas.**(1/2 dia)**
- [ ] Adicionar animação de loading para melhorar a experiência do usuário durante as requisições e transições de tela.**(1/2 dia)**
- [ ] Criar um micro front-end de componentes para uso comum entre os micro front-ends, ou integrar uma biblioteca como o Material UI para padronização de componentes.**(1-2 dias)**

