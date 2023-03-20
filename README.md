# Proyecto Controlbox

### By: Alcaen

## Ejecucion

### Local

Primero debes clonar el repositorio donde esta el codigo.

```powershell
git clone https://github.com/alcaen/book-review
```

Una vez clonado entras a la carpeta book-review.
Asegurate de estar en la carpeta del projecto (la que contiene el archivo **package.json**).Creas un archivo **.env** y copias el contenido del archivo **.env.example** a este. En este archivo deje las instrucciones de como configurar las variables de entorno.

Luego ejecuta estos comandos en la terminal en el mismo orden.

```powershell
npm install
```

```powershell
npm run build
```

```powershell
npm run start
```

#### Docker

#### No Docker

### Plataforma alojamiento

#### Docker

#### Serverless

## Puntos a completar

### Obligatorios

- [x] Pagina inicio
- [x] Mostrar lista de libros
- [x] Buscar libros
- [x] Ver detalles de cada libro ( **titulo**, **resumen**, **autor**, **categoria**, imagen,link a wikipedia,promedio de valoracion,total de reseñas)
- [x] Valorar libro
- [x] Dejar reseña del libro
- [x] Ver otras reseñas ordenadas por mas recientes
- [x] Registrar usuarios
- [x] Autenticar usuarios
- [x] Cerrar session
- [x] Protejer funciones (reseñas y valoracion)
- [x] App bonita y facil de usar
- [x] Alojamiento
- [ ] CI/CD

### Opcionales

- [x] Filtros (**categoria**, author)
- [x] Editar reseñas
- [x] Eliminar reseñas
- [x] Editar valoracion
- [x] Ver perfil (**correo**, **imagen**, **nombre**)
- [x] Protejer rutas (perfil)
- [x] Restablecer contraseña
- [x] Cambiar contraseña

### Entregar

- [x] Github publico
- [ ] README
- [x] Demostracion en vivo
