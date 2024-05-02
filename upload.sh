#!/bin/bash

# Realizar un pull para obtener los cambios más recientes del repositorio remoto
echo "Realizando un git pull..."
if ! git pull origin main; then
    echo "Error: No se pudo realizar el git pull. Verifica tu conexión a Internet y el estado del repositorio remoto."
    exit 1
fi

# Agregar todos los archivos al área de staging
echo "Agregando archivos al área de staging..."
git add .

# Hacer commit con un mensaje descriptivo
echo "Haciendo commit de los cambios..."
git commit -m "Commit automático: $(date)"

# Subir los cambios al repositorio remoto
echo "Subiendo cambios al repositorio remoto..."
if ! git push origin main; then
    echo "Error: No se pudo realizar el git push. Verifica tu conexión a Internet y los permisos de tu cuenta de GitHub."
    exit 1
fi

echo "Operaciones completadas exitosamente."
