![Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/img/banner-logo.svg)

# Real-Time Chat

_java-real-time-chat_ é uma __API__ criada com a linguagem de programação Java e o framework Spring.

Permite que os usuários tenham uma comunicação em tempo real e, para não perderem nenhuma mensagem, há um sistema de notificação.

[![License](https://img.shields.io/npm/l/react)](https://github.com/leobaraujo/java-real-time-chat/blob/main/LICENSE) 

## Tecnologias

- Java
- Spring Boot
- WebSocket
- Maven

## Funcionalidades

- Chat em tempo real com WebSocket
- Notificação

## Execução

### Com Git

> Requisitos: Git e Java17

```shell
# Clonar o repositório git
git clone https://github.com/leobaraujo/java-real-time-chat.git

# Entrar na pasta do repositório
cd java-real-time-chat

# Fazer o download das dependências
mvn clean install

# Build
mvn clean compile package

# Iniciar a aplicação
mvn spring-boot:run

# Para parar a aplicação, pressione a tecla CTRL+C no console
```
