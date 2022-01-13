# capivas-bot
Bot simples para o Discord (infelizmente) com o intuito de reproduzir músicas. Este bot não possui nenhum fim lucrativo e pode ser usado livremente desde que seguindo as diretrizes do YouTube API v3 e Discord.js.
## Como configurar
### Configurando o Discord
1. Entre em https://discord.com/developers/applications e faça login com sua conta do Discord;
2. Clique em "New Application" no canto superior direito, entre com um nome para sua aplicação e clique em "Create";
3. Na barra lateral esquerda clique em "Bot" e em seguida em "Add Bot";
4. Após criar o bot, role pra baixo e em "Privileged Gateway Intents" selecione todas as opções;
5. Em baixo do nome do seu bot clique no botão para copiar o token;
6. Cole o token em src/Data/config.json no campo "token";
7. Esqueci como pega o link pra adicionar o bot no server e estou morrendo de sono, amanhã confirmo e coloco aqui.

Atenção: Tome cuidado com seu Token e não o revele pra ninguém; caso o revele sem querer clique no botão "Regenerate" para que ninguém possa usar seu bot sem sua permissão;
### Configurando YouTube API
1. Entre em https://console.cloud.google.com/apis/credentials/wizard e faça login com sua conta conta Google;
2. Em "Qual API você usa?" selecione "YouTube Data API v3";
3. Selecione "Dados públicos" e clique em "Próxima";
4. Sua chave de API foi gerada, copie ela e cole em src/Data/config.json no campo "youtube_api_key";
5. Clique em "Concluir".

Atenção: Assim como com o token, tome cuidado com sua chave de API e blah.
### Configurando o projeto
1. Caso não tenha o Node.js instalado, instale-o através do https://nodejs.org/en/;
2. Dentro da pasta src dê um "npm install";
3. Após finalizar, dê um "node ." e caso esteja tudo certo você receberá uma mensagem de sucesso no console.

## Personalizar
O bot está utilizando ! como prefixo por padrão mas caso queira alterar é só entrar em src/Data/config.json e alterar o valor do campo "prefix".

O projeto está utilizando como padrão a cor '#1F0954' ao gerar alguma mensagem embed, você pode alterar isso facilmente alterando o valor do campo "embed_color" em src/Data/config.json. Caso queira cores diferentes pra cada embed, terá que alterá-los individualmente.
