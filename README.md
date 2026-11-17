# ⚡ Acorda PC — ESP32 Wake-on-LAN

Painel web e API Serverless para ligar um computador à distância utilizando um **ESP32** como ponte na rede local para disparo de pacotes **Wake-on-LAN (WoL)**.

## 🧠 Como funciona

Como o navegador não consegue enviar pacotes UDP (*Magic Packets*) diretamente para a rede local de casa a partir da internet, o projeto divide a responsabilidade em três camadas:

1. **Frontend (React + Vite):** Interface web responsiva para autenticação e disparo do comando.
2. **Backend (Vercel Serverless Functions):** Rota `/api/wake` que valida a chave de segurança e encaminha a requisição HTTP para a rede local (evitando expor o endereço do ESP32 no navegador).
3. **Hardware (ESP32):** Recebe o sinal da API e dispara o *Magic Packet* via UDP para o MAC Address do computador.

## 🛠️ Tecnologias

* **Frontend:** React, Vite, CSS3, Lucide Icons
* **Backend:** Node.js (Vercel Serverless Functions)
* **Hardware / IoT:** ESP32, C++ (Arduino), Protocolo Wake-on-LAN (UDP)

## 📁 Estrutura do Projeto

```text
├── api/
│   └── wake.js          # Endpoint serverless (Vercel)
├── src/
│   ├── components/      # Componentes da interface
│   ├── services/        # Integração com a API
│   └── App.jsx          # Aplicação principal
├── .env.example         # Variáveis de ambiente necessárias
└── vercel.json          # Configuração de rotas
