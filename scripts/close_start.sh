#!/bin/bash

# Diretório atual onde o script está localizado
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define o caminho relativo para as pastas
pasta1="$DIR/../server/serverInventory"
frontendfolder="$DIR/../client/inventoryApp/"

# Função para obter o PID do processo Python
obter_pid_python() {
  pidof -x python3 main.py
}

# Função para obter o PID do processo Node
obter_pid_node() {
  pidof -x npm
}

# Função para matar os processos
matar_processos() {
  pid_python=$(obter_pid_python)
  if [ ! -z "$pid_python" ]; then
    echo "Matando processo Python (PID: $pid_python)..."
    kill -9 $pid_python
  fi

  pid_node=$(obter_pid_node)
  if [ ! -z "$pid_node" ]; then
    echo "Matando processo Node (PID: $pid_node)..."
    kill -9 $pid_node
  fi
}

# Chamar a função para matar os processos
matar_processos

echo "Aplicação fechada com sucesso!"
