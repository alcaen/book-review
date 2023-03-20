# Proyecto Controlbox

### By: Alcaen

Puedes encontrar el desarrollo del projecto diagramas, notas y herramientas para la solucion de problesmas en **Excalidraw**: [Link a Excalidraw](https://excalidraw.com/#json=yTSUxJTwuC1BGbrCChUkd,SNNk3b7-mAjj3QF8hk4qMQ)

## Live project

Mi app esta hosteada en **Vercel** [Link](https://book-review-alpha.vercel.app/).
La base de datos esta hosteada en **Railway** ya que ya tengo ocupada mi base de datos gratuita en PlanetScale [Link Railway](https://railway.app/)

## Ejecucion

### Local

Primero debes clonar el repositorio donde esta el codigo.

```powershell
git clone https://github.com/alcaen/book-review
```

Una vez clonado entras a la carpeta book-review.
Asegurate de estar en la carpeta del projecto (la que contiene el archivo **package.json**).Creas un archivo **.env** y copias el contenido del archivo **.env.example** a este. En este archivo deje las instrucciones de como configurar las variables de entorno. Una vez configuradas puedes seguir con los siguientes pasos.

Luego ejecuta estos comandos en la terminal en el mismo orden.

#### Produccion

```powershell
npm install # install packages
```

```powershell
npx prisma generate #Generar types de typescript
```

```powershell
npx prisma db push #Push Schema to db ( no genera migracion si se requiere migraicion correr migrate)
```

```powershell
npm run build #build
```

```powershell
npm run start #start
```

[Link app](http://localhost:3000/)

#### Desarrollo

```powershell
npm install
```

```powershell
npx prisma generate
```

```powershell
npx prisma db push
```

```powershell
npm run dev # start on dev enviroment
```

[Link app](http://localhost:3000/)

```powershell
# Si quieres ver la  base de datos con prisma studio usa
npx prisma studio
```

### Serverless

Para esta opcion recomiendo usar **Vercel**. Aunque puedes usar la plataforma de tu preferecnia. La base de datos tiene que ser **MySQL** asi que sugiero usar **PlanetScale** o una base de datos en **Railway**. Una vez creada la base de datos puedes usar la opcion de un repositorio de terceros en vercel y poner el link del repo (https://github.com/alcaen/book-review) una vez agregado ve a **configuracion** y entra a **variables de entorno** agrega las variables especificadas en el archivo **.env.example** checkeando los entornos que requieres produccion preview y desarollo.
Si la build falla por no tener variables de entorno selecciona la opcion **redepoy**.
Luego puedes visitar tu url asignado

### Docker

Cuando clonas este repositorio tambien tienes la opcion de usar docker. Cree la imagen de la app y tambien el **docker-compose.yml** el cual incluye la app y tambien una base de datos **MySQL**. Para este metodo debes tener docker. Si quieres usarlo en la nube tambien se puede hacer con docker. Yo uso **DigitalOcean** ya que proporciona un droplet de docker pre configurado. Para ejecutar este metodo tienes que entrar al archivo docker-compose.yml y configurar las variables de entorno. Si tienes duda de alfuna revisa el archivo **env.example** Una vez con las variables de entorno procede en la ruta donde esta el **docker-compose.yml** abre una terminal y ejecuta el comando.

```powershell
docker-compose up
```

Espera a que se haga el build de la imagen de app. Luego a que inicien las dos imagenes (mysql y app) y que app conecte a la base de datos y haga el push del esquema una vez haya terminado el proceso puedes visitar : [Link app](http://localhost:3000/) para ver la app.

### Adicionales

### Subir libros

Para subir libros expuse una ruta en **REST** http://localhost:3000/api/books/upload_books que acepta una peticion **POST** que contenga los libros abajo anexo el llamado en **cURL** tambien hay un archivo **books_sample.json** por si deseas editar datos o hacer tu propia peticion. En windows uso gitbash para esto.

```bash
curl --location 'http://localhost:3000/api/books/upload_books' \
--header 'Content-Type: text/plain' \
--header 'Cookie: next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.csrf-token=dae279286de046ab456672fbd1065eeec18a9e32109ffa23ad1ecad115d30426%7C3f624e40555bfb7fa4d06fbc31d3cf9a0f9543c4a9dee5261bb0d9b8bceb37da' \
--data '{
  "books": [
    {
      "title": "Azathoth",
      "author": "H. P. Lovecraft",
      "category": "Horror",
      "resumen": "The story begins by describing how the modern world has been stripped of imagination and belief in magic. The protagonist is an unnamed man who lives in a dull and ugly city. Every night for many years the man gazes from his window upon the stars, until he comes over time to observe secret vistas unsuspected by normal humanity. One night the gulf between his world and the stars is bridged, and his mind ascends from his body out unto the boundless cosmos.",
      "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Hplovecraft-azathoth-manuscript.jpg/464px-Hplovecraft-azathoth-manuscript.jpg",
      "URL": "https://en.wikipedia.org/wiki/Azathoth_(short_story)"
    },
    {
      "title": "Brave New World",
      "author": "Aldous Huxley",
      "category": "Dystopian",
      "resumen": "The novel opens in the World State city of London in AF (After Ford) 632 (AD 2540 in the Gregorian calendar), where citizens are engineered through artificial wombs and childhood indoctrination programmes into predetermined classes (or castes) based on intelligence and labour. Lenina Crowne, a hatchery worker, is popular and sexually desirable, but Bernard Marx, a psychologist, is not. He is shorter in stature than the average member of his high caste, which gives him an inferiority complex. His work with sleep-learning allows him to understand, and disapprove of, his society'\''s methods of keeping its citizens peaceful, which includes their constant consumption of a soothing, happiness-producing drug called soma. Courting disaster, Bernard is vocal and arrogant about his criticisms, and his boss contemplates exiling him to Iceland because of his nonconformity. His only friend is Helmholtz Watson, a gifted writer who finds it difficult to use his talents creatively in their pain-free society.",
      "imageURL": "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg?20171211221736",
      "URL": "https://en.wikipedia.org/wiki/Brave_New_World"
    },
    {
      "title": "The Outsider",
      "author": "H. P. Lovecraft",
      "category": "Horror",
      "resumen": "The Outsider is written in a first-person narrative style, and details the miserable and apparently lonely life of an individual, who appears to have never made contact with another person. The story begins, with the narrator explaining his origins. His memory of others is vague, and he cannot seem to recall any details of his personal history, including who he is or where he is originally from. The narrator tells of his environment: a dark, decaying castle amid an endless forest of high trees that block out the light from the sun. He has never seen natural light, nor another human being, and he has never ventured from the prison-like home he now inhabits. The only knowledge the narrator has of the outside world is from his reading of the antique books that line the walls of his castle.",
      "imageURL": "https://upload.wikimedia.org/wikipedia/en/d/db/Outsider_and_others.jpg?20220212141100",
      "URL": "https://en.wikipedia.org/wiki/The_Outsider_(short_story)"
    },
    {
      "title": "The Antichrist",
      "author": "Friedrich Nietzsche",
      "category": "Philosophy",
      "resumen": "Nietzsche claims in the preface to have written the book for a very limited readership. To understand the book, he asserts that the reader must be honest in intellectual matters to the point of hardness to so much as endure my seriousness, my passion.[2] The reader should be above politics and nationalism. Also, the usefulness or harmfulness of truth should not be a concern. Characteristics such as [s]trength which prefers questions for which no one today is sufficiently daring; courage for the forbidden[2] are also needed. He disregards all other readers",
      "imageURL": "https://upload.wikimedia.org/wikipedia/en/e/e4/The_Antichrist_%28book%29.jpg?20181008003121",
      "URL": "https://en.wikipedia.org/wiki/The_Antichrist_(book)"
    },
    {
      "title": "The Art of Being Right",
      "author": "Arthur Schopenhauer",
      "category": "Philosophy",
      "resumen": "The Art of Being Right: 38 Ways to Win an Argument (also The Art of Controversy, or Eristic Dialectic: The Art of Winning an Argument; German: Eristische Dialektik: Die Kunst, Recht zu behalten; 1831) is an acidulous, sarcastic treatise written by the German philosopher Arthur Schopenhauer.[1] In it, Schopenhauer examines a total of thirty-eight methods of defeating one'\''s opponent in a debate. He introduces his essay with the idea that philosophers have concentrated in ample measure on the rules of logic, but have not (especially since the time of Immanuel Kant) engaged with the darker art of the dialectic, of controversy. Whereas the purpose of logic is classically said to be a method of arriving at the truth, dialectic, says Schopenhauer, ...on the other hand, would treat of the intercourse between two rational beings who, because they are rational, ought to think in common, but who, as soon as they cease to agree like two clocks keeping exactly the same time, create a disputation, or intellectual contest.",
      "imageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Schopenhauer.jpg/486px-Schopenhauer.jpg",
      "URL": "https://en.wikipedia.org/wiki/The_Art_of_Being_Right"
    }
  ]
}
'
```

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
- [x] CI/CD => Vercel pipeline. Or ( Docker-compose ) & GitHub Actions

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
- [x] README
- [x] Demostracion en vivo
