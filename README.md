# Mapa da CPI

O **Mapa da CPI** é um projeto open-source criado para auxiliar na análise dos [milhares de documentos](https://legis.senado.leg.br/comissoes/docsRecCPI?codcol=2441) enviados para a [CPI da COVID-19](https://pt.wikipedia.org/wiki/CPI_da_COVID-19), em curso no Brasil desde abril de 2020.

Em estágio embrionário, o projeto apresenta duas ferramentas:

- *Bot de Documentação*: Uma série de ferramentas em `Python` para baixar os documentos, extrair o texto e criar um dicionário de palavras.

- *Mapa da CPI*: Um site que permite a busca de documentos a partir de palavras.

## Como Colaborar

Antes de tudo uma pequena nota do autor:

Esse é um projeto pessoal, sem nenhum tipo de financiamento, que iniciei no pouco tempo livre que tenho, na tentativa de otimizar a investigação desse volume enorme de dados.
Meu foco inicial foi fazer funcionar. Eu sei que a interface precisa ficar mais bonita, tenho planos de novas features de visualização de dados, etc. Porém, não consigo realizar sozinho.

--

Precisamos de pessoas que possam contribuir no desenvolvimento do projeto como um todo:

- *Designers*: que nos ajudem a criar uma identidade sólida e um fluxo de uso que potencialize a análise de dados por humanos.
- *Front-End Devs*: para implementar o design em (`Vue`)
- *Cientistas de Dados*: que utilizem `Python` ou outras linguagens, pra propor e implementar análises sobre os dados
- *Juristas*: para direcionar a análise dos dados
- *Revisores*: para revisar os dados extraídos pelo bot

A sessão "Issues" aqui do GitHub pode ser usada para discutir bugs e novas features.

## Instalação

Esse serviço roda no nosso servidor em http://www.mapadacpi.com.

As instruções a seguir são para desenvolvedores que queiram instalar o serviço localmente para fazer alterações e contribuir via Pull Request.

Esse projeto é feito em `Nuxt`, utilizando o `Nodejs` para o Back-End e o `Vue` + `Vuetify` para o Front-End.

```bash
# Clone o repositório
$ git clone https://github.com/mapadacpi/mapadacpi.git

# Instale as dependências
$ npm install
```

Durante o desenvolvimento e testes, o servidor pode ser rodado localmente com o comando:

```bash
#
$ npm run dev
```

Crie commits com nomes explicativos enquanto faz as alterações, então envie um Pull Request e nós garantimos a revisão em no máximo 48h.

## Estrutura

O projeto atualmente contém apenas duas páginas: `home` e `search`.

Para acesso aos dados existe uma `REST API`, que retorna o conteúdo de arquivos gerados pelo `bot`.

Para rodar adequadamente o seviço web é necessário instalar e rodar o `bot`. Em breve vamos estruturar um serviço para edição simultânea dos dados e será possível baixar os dados já extraídos e revisados.

Ao instalar o `bot`, a estrutura de diretórios deve ser:

```
  projeto/
    mapadacpi/
    cpi-bot/
```

Caso a estrutura esteja diferente, é necessário alterar o endereço em `mapadacpi/api/rest.js`.
