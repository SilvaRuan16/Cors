Projeto Costs
Descrição
O Costs é um projeto desenvolvido com base em um tutorial do YouTube. Ele tem como objetivo auxiliar no controle de gastos de um projeto, permitindo a adição de múltiplos serviços associados a ele. Com esta aplicação, é possível gerenciar orçamentos, custos e serviços de forma prática e eficiente.
Funcionalidades

Criação e edição de projetos com orçamento definido.
Adição de serviços a um projeto, com nome, custo e descrição.
Controle de gastos, verificando se os custos dos serviços ultrapassam o orçamento.
Interface amigável para visualização e gerenciamento de projetos e serviços.

Pré-requisitos
Antes de executar o projeto, certifique-se de ter instalado:

Node.js (versão recomendada: LTS)
npm (gerenciador de pacotes do Node.js)

Instruções de Instalação e Execução
Siga os passos abaixo para executar o projeto localmente:

Clone o repositório:
git clone <URL_DO_REPOSITORIO>
cd costs


Instale as dependências:
npm install


Execute o frontend:Para iniciar a interface do projeto (view), use o comando:
npm run dev

A aplicação estará disponível em http://localhost:5173 (ou outra porta, conforme indicado no terminal).

Execute o backend:Para iniciar a API local, use o comando:
npm run backend

A API estará disponível em http://localhost:5000.


Observações

Certifique-se de que ambos os comandos (npm run dev e npm run backend) estejam rodando simultaneamente em terminais separados.
Caso encontre erros, verifique se todas as dependências foram instaladas corretamente e se as portas 5173 (frontend) e 5000 (backend) estão livres.

Tecnologias Utilizadas

Frontend:
React.js
Vite (para desenvolvimento rápido)
React Router (para navegação)
CSS Modules (para estilização)


Backend:
JSON Server (API simulada)


Outras bibliotecas:
UUID (para geração de IDs únicos)



Estrutura do Projeto
costs/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── project/
│   │   ├── service/
│   ├── App.jsx
│   ├── index.css
├── public/
├── package.json
├── README.md

Como Contribuir

Faça um fork do projeto.
Crie uma branch para sua feature (git checkout -b minha-feature).
Commit suas mudanças (git commit -m 'Adiciona minha feature').
Envie para o repositório remoto (git push origin minha-feature).
Abra um Pull Request.

Agradecimentos
Este projeto foi criado com base em um tutorial do YouTube, com o objetivo de aprendizado e prática em desenvolvimento web com React.
Licença
Este projeto é de código aberto e está disponível sob a MIT License.
