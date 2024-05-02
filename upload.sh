#!/bin/bash

# Definir colores
azul='\033[0;34m'
normal='\033[0m'

# Realizar un pull para obtener los cambios más recientes del repositorio remoto
echo -e "${azul}Realizando un git pull...${normal}"
if ! git pull origin main; then
    echo -e "${azul}Error: No se pudo realizar el git pull. Verifica tu conexión a Internet y el estado del repositorio remoto.${normal}"
    exit 1
fi

# Agregar todos los archivos al área de staging
echo -e "${azul}Agregando archivos al commit...${normal}"
git add .

# Hacer commit con un mensaje descriptivo
echo -e "${azul}Haciendo commit de los cambios...${normal}"
git commit -m "Commit automático: $(date)"

# Subir los cambios al repositorio remoto
echo -e "${azul}Subiendo cambios al repositorio remoto...${normal}"
if ! git push; then
    echo -e "${azul}Error: No se pudo realizar el git push. Verifica tu conexión a Internet y los permisos de tu cuenta de GitHub.${normal}"
    exit 1
fi

echo -e "${azul}Operaciones completadas exitosamente.${normal}"

# Esperar a que el usuario presione Enter para cerrar la consola
read -p "${azul}Presiona Enter para salir...${normal}"
