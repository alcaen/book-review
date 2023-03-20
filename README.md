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

In progress

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
- [x] CI/CD ( Docker-compose )

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
