# Imagen para servir el sitio de Parcela Don Misa
# Se copian los archivos dentro de la imagen para evitar el problema de
# Docker Desktop + macOS al leer subcarpetas del Escritorio.
FROM nginx:alpine

RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf

COPY index.html   /usr/share/nginx/html/index.html
COPY assets       /usr/share/nginx/html/assets
COPY README.md    /usr/share/nginx/html/README.md

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
