#!/bin/bash

# Agregar todos los archivos al área de staging
git add .

# Hacer commit con un mensaje descriptivo
git commit -m "Commit automático: $(date)"

# Subir los cambios al repositorio remoto
git push 
