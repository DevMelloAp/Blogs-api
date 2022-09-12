Neste projeto realizado durante o curso de Desenvolvimento Web na Trybe, desenvolvi uma API e um banco de dados para a produção de conteúdo para um blog!

Essa aplicação foi desenvolvida em Node.js usando o pacote sequelize para fazer um CRUD de posts.

Foi desenvolvido também endpoints que estarão conectados ao banco de dados seguindo os princípios do REST;

Para fazer um post foi necessário usuário e login, portanto foi trabalhada a relação entre user e post, também foi necessária a utilização de categorias para os posts, trabalhando, assim, a relação de posts para categories e de categories para posts.

Orientações

Rodando no Docker vs Localmente

Com Docker

Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. 

Rode os serviços node e db com o comando docker-compose up -d --build.

Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers;

Esses serviços irão inicializar um container chamado blogs_api e outro chamado blogs_api_db;

A partir daqui você pode rodar o container blogs_api via CLI ou abri-lo no VS Code;

Use o comando docker exec -it blogs_api bash.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

Instale as dependências [Caso existam] com npm install. (Instale dentro do container)

Atenção: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

sparkles Dica: A extensão Remote - Containers (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

Sem Docker

Instale as dependências [Caso existam] com npm install

Dica: Para rodar o projeto desta forma, obrigatoriamente você deve ter o node instalado em seu computador.

O avaliador espera que a versão do node utilizada seja a 16.




