# Proyecto Controlbox

# Título del proyecto:

Aplicación de reseñas de libros

## Descripción del proyecto:

Cree una aplicación de reseñas de libros que permita a los usuarios navegar, buscar y reseñar libros. La aplicación debe permitir a los usuarios registrarse e iniciar sesión con sus credenciales. Una vez que hayan iniciado sesión, los usuarios deberían poder navegar por una lista de libros, ver detalles de un libro, dejar reseñas para un libro y ver las reseñas dejadas por otros usuarios.

La aplicación puede usar las siguientes tecnologías, pero si te sientes más cómodo con otras tecnologías que no se enumeran, úsalas:

Frontend:

- HTML, CSS, Bootstrap/Tailwind CSS
- React o Angular, Typescript, Next.js/Node.js
- REST APIs y GraphQL

Backend:

- PostgreSQL, MySQL
- Go, C#, .NET
- Bases de datos sin servidor como PlanetScale, AWS

Implementación:

- Alojamiento web sin servidor como Vercel
- CI/CD: Github

## Requisitos:

1. La aplicación debe tener una página de inicio que muestre una lista de libros. Los usuarios deben poder navegar por la lista de libros, buscar libros por título, autor o categoría.
2. Los usuarios deben poder ver los detalles de un libro, incluyendo su título, autor, categoría y resumen.
3. Los usuarios deben poder dejar reseñas para un libro, incluyendo una calificación del 1 al 5 y un comentario en texto.
4. Los usuarios deben poder ver las reseñas dejadas por otros usuarios, ordenadas por las más recientes.
5. La aplicación debe tener autenticación y autorización de usuarios. Los usuarios deben poder registrarse para obtener una cuenta, iniciar sesión con sus credenciales y cerrar sesión. Solo los usuarios autenticados deben poder dejar reseñas para un libro.
6. La aplicación debe ser receptiva y accesible.
7. La aplicación debe ser implementada en una plataforma de alojamiento y tener un pipeline de CI/CD configurado.

## Requisitos adicionales (opcional):

1. Los usuarios deben poder filtrar los libros por categoría.
2. Los usuarios deben poder ver sus propias reseñas y editarlas o eliminarlas.
3. Los usuarios deben poder ver su propio perfil con su nombre de usuario, correo electrónico y foto de perfil.
4. Los usuarios deben poder restablecer su contraseña si la olvidan.

## Para entregar:

1. Código fuente de la aplicación, alojado en un repositorio Git público (por ejemplo, GitHub, Bitbucket).
2. Un archivo README con instrucciones sobre cómo ejecutar la aplicación localmente e implementarla en una plataforma de alojamiento.
3. Una demostración en vivo de la aplicación alojada en una plataforma de alojamiento.

## Tiempo:

Este proyecto debería tomar alrededor de 30 horas para completar, a un nivel de dificultad medio.

## Recursos:

Aquí hay algunos recursos que pueden ayudarlo a aprender cómo construir la aplicación de reseñas de libros. Todas las tecnologías son gratuitas para usar, incluyendo alojamiento y bases de datos:

- React: **[https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)**
- Angular: **[https://angular.io/start](https://angular.io/start)**
- TypeScript: **[https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)**
- Next.js: **[https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started)**
- Node.js: **[https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)**
- PostgreSQL: **[https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)**
- MySQL: **[https://dev.mysql.com/doc/](https://dev.mysql.com/doc/)**
- Go: **[https://golang.org/doc/](https://golang.org/doc/)**
- C#: **[https://docs.microsoft.com/en-us/dotnet/csharp/](https://docs.microsoft.com/en-us/dotnet/csharp/)**
- .NET: **[https://docs.microsoft.com/en-us/dotnet/](https://docs.microsoft.com/en-us/dotnet/)**
- PlanetScale: **[https://docs.planetscale.com/](https://docs.planetscale.com/)**
- Vercel: **[https://vercel.com/docs](https://vercel.com/docs)**
- GitHub: **[https://docs.github.com/en](https://docs.github.com/en)**

# Resumen

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
- [ ] Alojamiento
- [ ] CI/CD

### Opcionales

- [x] Filtros (**categoria**, author)
- [ ] Editar reseñas
- [x] Editar valoracion
- [x] Ver perfil (**correo**, **imagen**, **nombre**)
- [x] Protejer rutas (perfil)
- [x] Restablecer contraseña

### Entregar

- [x] Github publico
- [x] README
- [ ] Demostracion en vivo

### Herramientas usadas
