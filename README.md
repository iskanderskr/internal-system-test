
# Descrição do projeto

É um portal que recebe alertas da api sobre diferentes eventos em servidores físicos e virtuais.

O formato de entrada desses alertas é assim.

    {
	    "server": "xxxx",
	    "description": "ddddd",
	    "created_at": "hh-mm-ss-dd-mm-yyyy",
	    "server_type": "onprem/virtual"
    }

(Presume-se que todos estejam no mesmo fuso horário).

Essas informações devem ser armazenadas em um banco de dados relacional. Em seguida, ser acessado por API e um portal da web.

No portal web, sem a necessidade de autenticação, o usuário deve ser capaz de buscar alertas em uma barra de busca, seja pela descrição do problema (exemplo: "tempo de inatividade", "sem ping", "aviso de capacidade do disco", "cooler quebrado fan ", etc etc etc), bem como pelo nome do servidor.

O nome do servidor nunca muda e é único em toda a infraestrutura.

Como desejável, o product owner solicitou que todos os alertas de um servidor fossem acessados pesquisando-o pelo nome.

Aspectos relacionados a testes, usabilidade, paginação e exibição de informações devem ser levados em consideração.

Do lado da api, além de poder consultar os alertas, também é necessário ter um endpoint que, como métrica / estatística, relacione os 3 servidores com maior número de alertas no último mês, juntamente com um valor inteiro que especifica que quantidade.

# Instalação do projeto

Necessário ter um node atualizado, no projeto foi utilizado v12.18.3 e Yarn instalado, para fazer a instalação do mesmo é necessário o seguinte comando

    npm install -g yarn

 1. Fazer as instalações dos pacotes do projeto, respectivamente na pasta raiz e em /client, rodar o seguinte comando:
`yarn`
2. Para rodar o projeto é necessário rodar o seguinte comando
`yarn dev`
3. O portal estará disponível no localhost na porta 3000, a parte da api está em proxy na porta 5000