#!/bin/bash

# Diretório atual onde o script está localizado
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define o caminho relativo para as pastas
pasta1="$DIR/server/serverInventory"
pasta2="$DIR/../pasta2"

# Função para entrar na pasta e ativar o ambiente virtual
entrar_e_ativar() {
    cd "$1"  # Entra na pasta fornecida como argumento
    source ./venv/bin/activate  # Ativa o ambiente virtual
}

# Função para executar o script Python
executar_script_python() {
    python3 main.py  # Executa o script Python
}

# Entrar e ativar na primeira pasta
entrar_e_ativar "$pasta1"
# Executar o script Python na primeira pasta
executar_script_python

# Entrar e ativar na segunda pasta
entrar_e_ativar "$pasta2"
# Executar o script Python na segunda pasta
executar_script_python

# Saída do ambiente virtual
deactivate
