📊 Projeto Costs
📝 Descrição
O Costs é uma aplicação desenvolvida com base em um tutorial do YouTube, com o objetivo de praticar e aprofundar conhecimentos em desenvolvimento web utilizando React.js.
O sistema permite gerenciar projetos, controlando orçamentos e adicionando múltiplos serviços a cada projeto de forma prática e intuitiva.

⚙️ Funcionalidades
✅ Criação e edição de projetos com orçamento definido

✅ Adição de serviços a um projeto, com nome, custo e descrição

✅ Controle de gastos: impede que os custos ultrapassem o orçamento do projeto

✅ Interface amigável para visualização e gerenciamento de projetos e serviços

📋 Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (versão recomendada: LTS)

npm (gerenciador de pacotes do Node.js)

🚀 Instalação e Execução
1. Clone o repositório
bash
Copiar
Editar
git clone <URL_DO_REPOSITORIO>
cd costs
2. Instale as dependências
bash
Copiar
Editar
npm install
3. Execute o frontend
bash
Copiar
Editar
npm run dev
A aplicação estará disponível em: http://localhost:5173

4. Execute o backend (API simulada)
bash
Copiar
Editar
npm run backend
A API estará disponível em: http://localhost:5000

Observação: mantenha os dois comandos rodando em terminais separados.

🧪 Tecnologias Utilizadas
Frontend
React.js

Vite

React Router

CSS Modules

Backend
JSON Server (API fake)

Outras Bibliotecas
UUID (para geração de IDs únicos)

📁 Estrutura de Pastas
pgsql
Copiar
Editar
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
🤝 Como Contribuir
Faça um fork deste repositório

Crie uma nova branch: git checkout -b minha-feature

Faça suas alterações e commits: git commit -m 'feat: adiciona minha feature'

Envie para o repositório remoto: git push origin minha-feature

Abra um Pull Request

🙏 Agradecimentos
Este projeto foi desenvolvido com base em um tutorial do YouTube, servindo como uma ótima base para estudos e práticas no desenvolvimento de aplicações web com React.

📄 Licença
Este projeto está licenciado sob a MIT License.