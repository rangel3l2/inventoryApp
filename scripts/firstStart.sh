#you must to have python 3.6 or higher installed on your machine
if command -v python &> /dev/null; then
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
chmod +x scripts/startServer.sh
chmod +x scripts/startFrontend.sh

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
docker-compose up --build &
#execute function for set migrations to feed database
executar_migrations_database() {
    cd "$backendfolder"
    python3 migration.py &
   
}
#execute the function
executar_migrations_database
#open scripts for start the server
./scripts/startServer.sh
#open scripts for start the frontend
./scripts/startFrontend.sh
