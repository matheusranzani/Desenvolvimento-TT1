# Desenvolvimento-TT1

Documentação do que foi desenvolvido no projeto da FAPESP com bolsa TT-1 intitulado **Análise Dinâmica e Benchmarks para Event Races em Aplicações JavaScript** durante o período de junho de 2023 a janeiro de 2024 com orientação do professor André Endo.

## Ideia geral

O propósito deste projeto é desenvolver métodos que intensifiquem os testes automatizados através de uma análise dinâmica específica e de baixo impacto. O foco principal está na exploração de duas áreas específicas: identificação de _event races_ e detecção de testes _flaky_.

## Atividades desenvolvidas

### Estudo de ferramentas de teste e do conceito de assincronismo em JavaScript

Antes de realmente começar a trabalhar no projeto, foi necessário estudar e entender algumas das princiapis ferramentes de teste utilizadas em aplicações JavaScript, em específico, **Jest** e **Mocha**.\
Além disso, um conceito essencial em JavaScript foi preciso ser revisado: o assincronismo de eventos.\
Esta parte inicial de nivelamento para começar a trabalhar no projeto pode ser acessada na pasta [Estudos iniciais](https://github.com/matheusranzani/Desenvolvimento-TT1/tree/main/Estudos%20iniciais).

### Leitura de artigos relacionados a _event races_ em Node.js e ferramentas de análise dinâmica para identificá-los

Após a fase incial de nivelamento, foi feita a leitura de importantes artigos que explicam como _event races_ podem acontcer no desenvolvimento de aplicações com Node.js. Além disso, os artigos destacam algumas ferramentas de análise dinâmica capazes de identificar condições de corrida em determinadas situações. As ferramentas abordadas nos artigos foram: **NodeRT** e **NodeRacer**.\
O entendimento de testes _flaky_ também foi abordado em um dos artigos. Basicamente, testes _flaky_ são definidos como testes que retornam aprovações e falhas ao mesmo tempo, apesar de nenhuma alteração ao código ou no próprio teste ter ocorrido.\
Os artigos mencionados podem ser encontrados na pasta [Artigos importantes](https://github.com/matheusranzani/Desenvolvimento-TT1/tree/main/Artigos%20importantes).

### Criação de um _benchmark_ para os projetos usados no artigo do NodeRT

Depois de entender o funcionamento das ferramentas de teste abordadas nos artigos, começou a fase de executar alguma ferramenta em um abiente de desenvolvimento e analisar como ela funciona. A ferramenta escolhida para fazer este estudo inicial foi o **NodeRT**.
O projeto do **NodeRT** é _open source_ e pode ser acessado no seguinte [link do GitHub](https://github.com/NodeRT-OpenSource/NodeRT-OpenSource).\
Em resumo, o _benchmark_ foi desenvolvido para verificar quais projetos do _dataset_ utilizado no artigo do **NodeRT** realmente são capazes de utilizar a ferramenta para gerar um arquivo que registre possíveis _event races_.
O _benchmark_ citado pode ser encontrado no seguinte [link](https://docs.google.com/spreadsheets/d/10UefGj8RDqWlGdw3rw1sIN1CUGQSmZF9JrhP5g9OOjc/edit#gid=0).

### Geração de um exemplo de _event race_ fora do _dataset_ do NodeRT

Como pode ser visto no _benchmark_ desenvolvido para os projetos do **NodeRT**, a execução da ferramenta não teve êxito, ou sequer foi capaz de ser executada em alguns projetos. Portanto, surgiu a idea de criar um exemplo simples de condição de corrida e rodar a ferramenta neste exenplo, a fim de garantir que a ferramenta estava sendo utilizada de forma correta.\
De modo consequente, a execução do **NodeRT** no exemplo citado teve êxito e o código desenvolvido pode ser visto na pasta [jest-mocha-race-condition](https://github.com/matheusranzani/Desenvolvimento-TT1/tree/main/jest-mocha-race-condition).


### Verificação se o NodeRT funciona em projetos com Jest

No exemplo criado na pasta [jest-mocha-race-condition](https://github.com/matheusranzani/Desenvolvimento-TT1/tree/main/jest-mocha-race-condition) pode-se ver que existem três tipos de teste: um com o Node.js "puro", outro com o **Mocha** e, por fim, um com o **Jest**. Na documentação do **NodeRT** fica claro que a ferramenta é capaz de gerar o arquivo com as condições de corrida em projetos Mocha, mas não fica explícito se ela é capaz de ser utilizada com outros frameworks de teste. Por isso, a ferramenta foi testada em alguns projetos que utilizam o **Jest**.\
Infelizmente, como conclusão, a ferramenta é capaz de rodar os testes em Jest, entretanto ela não gera o _log_ que aponta para os possíveis _event races_ dos projetos. Quando submetida aos mesmo projetos, so que dessa vez utilizando o **Mocha**, ela é capaz de gerar corretamente o arquivo com as condições de corrida.

### Tentativa de reprodução do exemplo de motivação do artigo do NodeRT

Para analisar a ferramenta de forma mais minuciosa, surgiu a ideia de tentar reproduzir o exemplo de motivação presente no artigo do **NodeRT**. Este exemplo pertence ao projeto _fiware-pep-steelskin_ e representa uma das condições de corrida presentes no _dataset_ da ferramenta.\
Lamentavelmente, não foi possível fazer a ferramenta gerar o arquivo com as possíveis condições de corrida do exemplo. De qualquer maneira, o código reproduzido pode ser visto na pasta [fiware-pep-steelskin-test](https://github.com/matheusranzani/Desenvolvimento-TT1/tree/main/fiware-pep-steelskin-test).


## Guia para instalação do NodeRT

Um guia básico para a instalação do **NodeRT** pode ser acessado no próprio [repositório do projeto](https://github.com/NodeRT-OpenSource/NodeRT-OpenSource). Entretanto, alguns erros podem ocorrer durante a instação de ferramenta.\
Dessa maneira, aqui está um guia mais detalhado para a instalção do **NodeRT**.\
_Observação: os comandos aqui funcionam em distribuições Linux baseadas em Debian/Ubuntu._

### Pré-requisitos

Para o **NodeRT** funcionar, antes de tudo, é preciso ter o Node.js e o yarn instalados na máquina.

#### Instalção do Node.js
```sh
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Instalação do yarn
```sh
npm install --global yarn
```

### Instalação do GraalVM

Agora, com estas ferramentas básicas instaladas, é preciso instalar o GraalVM, que é um JDK capaz de executar aplicações Node.js. No caso do **NodeRT**, foi utilizada a versão 21.2.0.\
O link para baixar a versão 21.2.0 está [aqui](https://github.com/graalvm/graalvm-ce-builds/releases/tag/vm-21.2.0). Existem várias opções para baixar, no meu caso, utilizei o arquivo _graalvm-ce-java11-linux-amd64-21.2.0.tar.gz_.\
Com o arquivo baixado, é preciso descompactá-lo em algum diretório de preferência em sua máquina.\
Ao descompactar o arquivo, você terá acesso à pasta _graalvm-ce-java11-21.2.0_. Com isso, agora é possível definir a variável de ambiente `JAVA_HOME` e adicionar o GraalVM ao `PATH`.\
Para fazer estas duas ações é necessário adicionar as seguintes linhas ao seu arquivo `~/.bashrc` ou `~/.zshrc`, caso esteja usando o Z shell (meu caso):

```bash
export PATH=$PATH:/caminho_para/graalvm-ce-java11-21.2.0/bin
export PATH=/caminho_para/graalvm-ce-java11-21.2.0/bin:$PATH
export JAVA_HOME=/caminho_para/graalvm-ce-java11-21.2.0
```

Salve o arquivo e depois execute o seguinte comando:
```sh
source ~/.zshrc
```
Para saber se realmente funcionou, execute o comando:
```sh
java --version
```
No seu shell deve aparecer algo como (talvez seja necessário reiniciar o shell):
```
openjdk 11.0.12 2021-07-20
OpenJDK Runtime Environment GraalVM CE 21.2.0 (build 11.0.12+6-jvmci-21.2-b08)
OpenJDK 64-Bit Server VM GraalVM CE 21.2.0 (build 11.0.12+6-jvmci-21.2-b08, mixed mode, sharing)
```

Com o GraalVM instalado, agora é necessário instalar o Node.js através dele. Para isso, execute os seguintes comandos:

```sh
cd /caminho_para/graalvm-ce-java11-21.2.0/bin
gu install nodejs
```

Agora, basta fazer um link simbólico do _node_ da pasta _graalvm-ce-java11-21.2.0/bin_ da seguinte maneira:

```sh
ln -s node graalnode
```

Verifique se a instalação foi bem sucedida executando o link simbólico criado:
```sh
graalnode -v
```

Se tudo deu certo aparecerá no seu shell `v14.16.1`, que é a versão do Node.js instalado pelo GraalVM.

## Exemplos de execução

Com as ferramentas descritas anteriormente instaladas, agora é possível testar o uso do **NodeRT**. Para isso, primeiro é preciso clonar o [repositório do projeto](https://github.com/NodeRT-OpenSource/NodeRT-OpenSource):
```sh
git clone https://github.com/NodeRT-OpenSource/NodeRT-OpenSource
```
Após clonar o projeto, para não ocorrer conflitos entre os arquivos `package.json` do **NodeRT** e dos projetos do _dataset_, é preciso mover a pasta _dataset_ para outro diretório fora do projeto do **NodeRT**.\
Depois de mover a pasta _dataset_, entre na raiz do projeto do **NodeRT** através do shell e execute o seguinte comando para buildar a ferramenta:

```sh
yarn && yarn build
```

Para a ferramenta funcionar corretamente é preciso alterar o arquivo `src/Analysis/index.ts`. A única alteração que deve ser feita é comentar a linha 145:

```ts
// sandbox.addAnalysis(new MemoryUsageAnalysis(sandbox));
```

Com a linha acima comentada, é preciso escolher qual projeto do _dataset_ será testado. Para exemplificar aqui, vou esoclher o projeto _json-file-store-issue20-6aada66_ que está no diretório `dataset/knownBugs`.\
Antes de utilizar a ferramenta, para cada projeto do _dataset_ é preciso adicionar a pasta `node_modules`. Para fazer isso, basta entrar pelo shell na raiz do projeto selecionado e executar o comando:
```sh
npm install
```
Feito isso, volte para a raiz do repositório do **NodeRT** através do shell. Agora, vamos testar a ferramenta em si utilizando o seguinte comando:
```sh
yarn nodeprof /caminho_para/dataset/knownBugs/json-file-store-issue20-6aada66 testcase.js
```

Ao executar o comando acima, a ferramenta começará a analisar o caso de teste apontado, no escopo deste projeto o caso de teste está em sua raiz e tem o nome `testcase.js`.\
Em outros projetos, o caso de teste pode estar numa pasta `test`, por exemplo. Dessa maneira, para referenciar o teste usando o comando acima é necessário passar o caminho relativo da raiz do projeto até o caso de teste, neste exemplo ficaria:

```sh
yarn nodeprof /caminho_para/dataset/knownBugs/json-file-store-issue20-6aada66 test/testcase.js
```

Após a ferramenta terminar sua execução, um arquivo `violations.json` será criado no diretório do caso de teste analisado. Caso a análise tenha dado certo, este arquivo provavelmente não estará vazio e seu conteúdo será composto por referências para as condições de corrida identificadas no teste.

### Executando projetos que utilizam o Mocha

Alguns projetos do dataset utilizam o **Mocha** para fazer seus testes. Desse modo, é preciso rodar a ferramenta de um jeito um pouco diferente:

```sh
yarn nodeprof /caminho_para/dataset/explore/nodejs-websocket-e6a57ed/ node_modules/bin/_mocha test/test.js
```

Passando como segundo argumento o caminho `node_modules/bin/_mocha`, o **NodeRT** será capaz de executar e analisar os testes escritos em **Mocha**.\
Da mesma forma descrita anteriormente, se a análise for bem sucedida, um arquivo `violations.json` será criado com o conteúdo dos _event races_ identificados.
