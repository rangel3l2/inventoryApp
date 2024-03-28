#you must to have python 3.6 or higher installed on your machine
if command -v python3 &> /dev/null; then
  echo "Python is installed."
else
  echo "Python is not installed."
  exit 1  # Optionally exit the script with an error code
fi
#you must to have npm installed on your machine
if command -v node &> /dev/null; then
    echo "Node.js is installed."
else
    echo "Node.js is not installed."
    exit 1  # Optionally exit the script with an error code
fi

# Install the required packages
#make script executable
chmod +x startServer.sh
chmod +x startFrontend.sh

# Diretório atual onde o script está localizado
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define o caminho relativo para as pastas
frontendfolder="$DIR/../client/inventoryApp/"
backendfolder="$DIR/../server/serverInventory"
# Função para executar o script Node
executar_script_node() {
    cd "$frontendfolder"
    npm install  # Install the required packages
}
#execute the function
executar_script_node
#execute docker-compose-file
docker-compose up -d
#execute ambienteVirtual
criar_entrar_e_ativar() {
    cd "$backendfolder"  # Entra na pasta fornecida como argumento
    python3 -m venv venv
    source ./venv/bin/activate  # Ativa o ambiente virtual
}
criar_entrar_e_ativar
#Install required dependencies
install_requirements(){
  pip install -r requirements.txt
}
install_requirements
#execute function for set migrations to feed database
executar_migrations_database() {
#     cd "$backendfolder"
    python3 migration.py &
   
}
#execute the function
executar_migrations_database
#execute python server
active_python_server(){
  python3 main.py &
}
active_python_server

#open scripts for start the frontend
./scripts/startFrontend.sh
