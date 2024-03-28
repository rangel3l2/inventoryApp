

:: Check for Python 3.6 or higher
where python3 >nul 2>nul
if "%ERRORLEVEL%"=="0" (
    echo Python is installed.
) else (
    echo Python is not installed.
    exit 1
)

:: Check for Node.js
where node >nul 2>nul
if "%ERRORLEVEL%"=="0" (
    echo Node.js is installed.
) else (
    echo Node.js is not installed.
    exit 1
)




:: Get current script directory
set "DIR=%~dp0"

:: Define relative paths to folders
set "frontendfolder=%DIR%..\client\inventoryApp\"
set "backendfolder=%DIR%..\server\serverInventory"

:: Function to execute Node script
call :executar_script_node

:: Execute docker-compose file (if Docker is installed)
docker-compose up -d

:: Function to create, enter, and activate virtual environment
call :create_entrar_e_ativar

:: Install required dependencies
call :install_requirements

:: Function to execute database migrations
call :executar_migrations_database

:: Start Python server in background
start "" /b python3 main.py

:: Open script to start frontend
start "" /startFrontend.sh

:: Function definitions
:executar_script_node
    cd "%frontendfolder%"
    npm install
    goto :eof

:create_entrar_e_ativar
    cd "%backendfolder%"
    python3 -m venv venv
    call venv\Scripts\activate.bat
    goto :eof

:install_requirements
    pip install -r requirements.txt
    goto :eof

:executar_migrations_database
    python3 migration.py &
    goto :eof
