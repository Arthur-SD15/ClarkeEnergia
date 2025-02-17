![Banner](/public/images/readme/background-readme.png)

## :warning: Aviso

A aplicação pode sofrer um **cold start** na **primeira requisição** devido à inatividade. Pode levar até 50 segundos para responder à primeira requisição, pois o back-end está hospedado no plano gratuito do Render.


## :bulb: Repositório

Neste repositório, documentarei os aspectos importantes do front-end para o desafio técnico da vaga de Desenvolvedor Júnior na Clarke Energia. Para acessar a documentação do back-end, acesse o repositório clicando [aqui](https://github.com/Arthur-SD15/ClarkeEnergia-API).

Confira a documentação do back-end, clicando [aqui](https://github.com/Arthur-SD15/ClarkeEnergia-API), para um maior entendimento da estrutura principal do projeto e suas regras de negócio. De maneira geral, o desafio técnico consiste em uma aplicação de escolha de fornecedor, com base no consumo de energia médio informado pelo usuário.


## :computer: Projeto

O projeto inicialmente contém uma tela de autenticação na rota `/`, sendo possível se cadastrar manualmente na rota `/register`. A autenticação com o Google é feita por meio do OAuth2, e o cadastro manual armazena a senha criptografada com bcrypt, sendo ambos os processos responsabilidade do back-end.

Na seção principal, a rota `/home` é onde o usuário preenche um campo necessário. Nessa própria rota, é possível listar os fornecedores de 5 em 5, com algumas informações importantes para o usuário, que pode optar por salvar ou não os fornecedores desejados.

Por fim, foi criada a rota `/manage-supplier` para o gerenciamento dos fornecedores, incluindo cadastro, edição e remoção. Além dos filtros para buscar os fornecedores, essa view de Admin poderia estar disponivel para os membros internos da Clarke Energia. De maneira simples, poderia ser criada uma barreira para que estivesse disponível apenas para quem se autenticasse com o e-mail institucional da Clarke.

Vale ressaltar que todas as rotas são protegidas, permitindo acesso apenas a quem possua o token de autenticação, com exceção da rota `/register`.


## :hammer_and_wrench: Tecnologias

Entre as tecnologias utilizadas no projeto, destacam-se:

- **React** + **TypeScript**: Framework e linguagem para o desenvolvimento front-end.
- **Tailwind** + **shadcn/ui**: Ferramentas para estilização da interface.
- **react-toastify**: Biblioteca para melhorar a experiência do usuário, exibindo notificações evidentes.
- **react-router-dom**: Utilizado para o gerenciamento de rotas da aplicação.
- **axios**: Biblioteca para a realização de requisições HTTP.


## :arrow_forward: Executar
```bash
# Clone o repositório.
$ git clone https://github.com/Arthur-SD15/ClarkeEnergia.git

# Instala todas as dependências.
$ npm install

# Executa.
$ npm run dev
 ```
