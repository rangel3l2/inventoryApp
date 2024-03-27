#!/bin/bash

# Diretório atual onde o script está localizado
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define o caminho relativo para as pastas
frontendfolder="$DIR/../client/inventoryApp/"

# Função para executar o script Node
executar_script_node() {
    cd "$frontendfolder"
    npm start  # Executa o script Node
}

# Entrar na pasta do frontend


# Executar o script Node na pasta do frontend
executar_script_node

# Script para digitir no to stop the server
# Ctrl + C
# Saída do server Node


