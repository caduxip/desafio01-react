# Desafio 01 - Calculadora em React

Aplicacao web de calculadora desenvolvida em React com interface responsiva, componentes reutilizaveis e suporte a execucao local ou via Docker.

## Visao Geral

O projeto implementa uma calculadora simples com:

- Soma
- Subtracao
- Multiplicacao
- Divisao
- Operacao `%`
- Limpeza do visor
- Calculo de resultado
- Layout centralizado e responsivo

A interface foi organizada em componentes reutilizaveis para melhorar manutencao e legibilidade do codigo.

## Tecnologias Utilizadas

- React
- Styled Components
- Create React App
- Jest + Testing Library
- Docker
- Nginx para entrega da versao de producao em container

## Funcionalidades

- Visor para exibicao da expressao e do resultado
- Teclado com botoes numericos e operadores
- Tratamento basico de erro no visor
- Controle para evitar multiplos pontos decimais no mesmo numero
- Substituicao do operador final quando o usuario digita outro operador em seguida
- Avaliacao da expressao com precedencia entre operacoes

## Observacao Sobre o Operador `%`

Nesta implementacao, `%` foi tratado como operacao de modulo ou resto da divisao.

Exemplos:

- `10 % 3 = 1`
- `20 % 6 = 2`

Se o objetivo for usar porcentagem comercial, como `200 + 10%`, a regra precisa ser alterada.

## Estrutura do Projeto

```text
desafio01-calculador/
├── public/
├── src/
│   ├── Components/
│   │   ├── Button/
│   │   ├── Calculator/
│   │   └── Input/
│   ├── constants/
│   │   └── calculator.js
│   ├── utils/
│   │   ├── calculator.js
│   │   └── calculator.test.js
│   ├── App.js
│   ├── global.js
│   ├── index.js
│   └── styles.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Requisitos

Para executar localmente sem Docker:

- Node.js 18 ou superior
- npm 8 ou superior

Para executar com Docker:

- Docker
- Docker Compose Plugin (`docker compose`)

## Como Instalar Localmente

1. Clone o repositorio:

```bash
git clone <url-do-repositorio>
```

2. Entre na pasta do projeto:

```bash
cd desafio01-calculador
```

3. Instale as dependencias:

```bash
npm install
```

## Como Executar em Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A aplicacao ficara disponivel em:

```text
http://localhost:3000
```

## Como Executar os Testes

```bash
npm test -- --watchAll=false
```

Esse comando executa os testes unitarios da logica da calculadora sem abrir o modo interativo de watch.

## Como Gerar Build de Producao

```bash
npm run build
```

O resultado sera gerado na pasta `build/`.

## Como Executar com Docker

O projeto possui configuracao para desenvolvimento e producao.

### Ambiente de Desenvolvimento com Docker

Executa a aplicacao React com hot reload:

```bash
docker compose up app-dev
```

A aplicacao ficara disponivel em:

```text
http://localhost:3000
```

### Ambiente de Producao com Docker

Gera o build e serve a aplicacao com Nginx:

```bash
docker compose up app-prod --build
```

A aplicacao ficara disponivel em:

```text
http://localhost:8080
```

## Como Parar os Containers

```bash
docker compose down
```

## Principais Arquivos de Infraestrutura

- `Dockerfile`: define os estagios de desenvolvimento e producao
- `docker-compose.yml`: orquestra os servicos `app-dev` e `app-prod`
- `.dockerignore`: reduz o contexto enviado ao build do Docker
- `nginx/nginx.conf`: configura o servidor para entregar a SPA corretamente

## Padrao de Componentizacao

O projeto foi organizado para separar responsabilidades:

- `App.js`
  Responsavel pela composicao da tela e controle de estado principal.

- `src/Components/Button`
  Componente reutilizavel para os botoes da calculadora.

- `src/Components/Input`
  Componente do visor.

- `src/Components/Calculator`
  Estrutura visual do card e do teclado.

- `src/constants/calculator.js`
  Constantes da calculadora, como botoes, operadores e valores iniciais.

- `src/utils/calculator.js`
  Regras de negocio da calculadora, incluindo manipulacao de entrada e avaliacao da expressao.

## Boas Praticas Aplicadas

- Separacao entre logica de negocio e interface
- Componentes reutilizaveis
- Constantes centralizadas
- Testes unitarios para a logica principal
- Estilizacao isolada com Styled Components
- Layout responsivo

## Fluxo Recomendado Para Outros Desenvolvedores

1. Instalar dependencias com `npm install`
2. Executar `npm start` para desenvolvimento local
3. Validar alteracoes com `npm test -- --watchAll=false`
4. Validar build com `npm run build`
5. Opcionalmente validar o ambiente em container com `docker compose up app-dev`

## Possiveis Melhorias Futuras

- Suporte a porcentagem comercial
- Historico de operacoes
- Suporte a teclado fisico
- Melhorias de acessibilidade
- Testes de interface com React Testing Library
- Deploy automatizado

## Solucao de Problemas

### Porta 3000 ocupada

Se outra aplicacao estiver usando a porta `3000`, finalize o processo conflitante ou altere a porta de execucao.

### Porta 8080 ocupada

Se estiver usando a versao de producao com Docker e a porta `8080` estiver ocupada, altere o mapeamento no `docker-compose.yml`.

### Dependencias nao instaladas

Se o projeto falhar ao iniciar localmente, remova `node_modules` e reinstale:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Alteracoes no Docker nao refletidas

Refaca o build da imagem:

```bash
docker compose up app-prod --build
```

## Scripts Disponiveis

- `npm start`: inicia a aplicacao em modo desenvolvimento
- `npm test`: executa os testes
- `npm run build`: gera a build de producao
- `npm run eject`: ejeta a configuracao do Create React App

## Autor

Projeto desenvolvido como desafio pratico para construcao de uma calculadora em React.
