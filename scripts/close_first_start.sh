#!/bin/bash

# Terminate Docker Compose processes
docker-compose down

# Identify and terminate Node processes
pidof npm | xargs kill -9

# Identify and terminate Python processes (assuming main.py is the main script)
pidof python3 main.py | xargs kill -9

# If other Python processes were started, modify the command accordingly
# For example, to terminate all Python 3 processes:
# pidof python3 | xargs kill -9

# Additional steps if applicable:
# - Terminate any other long-running processes initiated by the script
# - Close any open files or network connections

echo "Script processes terminated successfully."
