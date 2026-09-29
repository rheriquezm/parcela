# Parcela Don Misa — Sitio web

Sitio estático de una página para promocionar la parcela (arriendo para eventos y venta).
Ubicación: Pichinal, San Fabián, Región de Ñuble, Chile — `-36.54198384940983, -71.57445802528328`.

## Cómo verlo

### Opción 1 — Docker (recomendada)

```bash
cd "/Users/rhm/Desktop/PROYECTOS/2"
./servir.sh
```

Luego abre **http://localhost:8090** en el navegador.

Cada vez que edites `index.html`, el CSS o las imágenes, vuelve a ejecutar `./servir.sh`
para reconstruir la imagen y ver los cambios.

Detenerlo: `docker stop parcela-web` · Volver a iniciarlo: `docker start parcela-web`.

> **¿Por qué un `Dockerfile` y no montar la carpeta directamente?**
> Docker Desktop en macOS no puede leer archivos dentro de subcarpetas del Escritorio
> (protección de privacidad del sistema): servía el `index.html` pero fallaban el CSS y
> las imágenes con error de E/S. Por eso el sitio se copia dentro de la imagen.

### Opción 2 — Servidor local simple (sin Docker)

```bash
cd "/Users/rhm/Desktop/PROYECTOS/2"
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Estructura

```
index.html                  Página principal
assets/css/style.css        Estilos
assets/js/main.js           Menú, animaciones, galería (lightbox) y formulario
assets/img/                 Fotografías de la parcela
assets/img/cabanas/         Fotos de las dos cabañas y la piscina de noche
Dockerfile                  Imagen nginx que sirve el sitio
docker/default.conf         Configuración de nginx
servir.sh                   Construye y levanta el contenedor (puerto 8090)
```

## Datos ya configurados

- **Nombre:** Parcela Don Misa
- **Contacto:** teléfono / WhatsApp `+56 9 6246 4252` · correo `rodrigohenriquez@gmail.com`

## Qué editar antes de publicar

1. **Textos de venta** — superficie, rol, valor y condiciones reales (sección `#venta`).
2. **Capacidad de eventos y precios** — sección `#eventos`.
3. **Formulario** — por defecto arma un correo (`mailto:`). Para recibir los mensajes
   automáticamente, reemplaza el bloque del formulario en `assets/js/main.js` por el
   endpoint de un servicio como [Formspree](https://formspree.io) o similar.
4. **Fotos** — reemplaza/agrega archivos en `assets/img/` manteniendo los nombres,
   o actualiza las rutas en `index.html`.

## Publicar en internet

- **Netlify / Vercel / Cloudflare Pages**: arrastra la carpeta completa.
- **GitHub Pages**: sube el contenido y activa Pages desde el repositorio.

No requiere compilación ni dependencias.
