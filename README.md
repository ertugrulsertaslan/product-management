# Product Management 📊

This project is an e-commerce application with admin and user roles. Admin users can add, delete, and update products, while regular users can view the list of products and check the details of the products they like.


### Screenshots 📸

<div style="display: flex; flex-direction: row;">
    <img src="screenshots/admin-page.png" alt="Admin Page" style="width: 50%; margin-right: 4%;">
    <img src="screenshots/customer-page.png" alt="Customer Page" style="width: 49%;">
</div>

## Features ✨

- ⚙️ Admin users can add,delete,update products.
- 📋 Users can view the list of products.
- 📦 Users can check the details of the products they like.

## Technologies 🚀

### Frontend 🎨
- 💻 [React.js](https://reactjs.org/) - JS library for crafting user interfaces
- 📦 [Vite](https://vitejs.dev/) - Module bundler 
- 🎨 [Material-UI](https://mui.com/) - Material UI is an open-source React component library
- 📲 [Web Push Notifications](https://www.npmjs.com/package/web-push/) - Messages that are sent to users who have subscribed to receive updates from a website or web application

### Backend 🖥️

- 🚀 [Express.js](https://expressjs.com/) - Web framework for Node.js 
- 🌐 [Cors](https://www.npmjs.com/package/cors/) - Mechanism for integrating applications
- ⚙️ [Dotenv](https://www.npmjs.com/package/dotenv/) - A zero-dependency module that loads environment variables from a .env file into process.env
- 📂 [Multer](https://www.npmjs.com/package/multer/) - A middleware for handling multipart/form-data in Node.js, primarily used for uploading files.



### Database
- 🛢️ [Prisma](https://www.prisma.io/) - Prisma ORM is an open-source next-generation ORM
- 🐘 [PostgreSQL](https://www.postgresql.org/) - An advanced, enterprise-class open-source relational database
- 🐳 [Docker](https://www.docker.com/) - A software platform that allows you to build, test, and deploy applications quickly 

## Installation 🛠️

Prerequisites

- Install Node.js ⚙️
- Docker and Docker Compose 🐳
- Clone the repo 🔄

 📦 After cloning the repo install dependecies with

1. Install the necessary dependencies:

 
```sh 
    npm install
```
2. Configure your environment variables. Create a `.env` file and add the necessary variables:
- .env ⚙️ 
 
```sh 

     DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
     VAPID_PUBLIC_KEY="your_public_key"
     VAPID_PRIVATE_KEY="your_private_key"

```
3. Start PostgreSQL via Docker 🐳

 
 ```sh 
    docker-compose up -d
```
- If you don't have Docker Compose installed, you can start PostgreSQL with Docker using the following command:
 
 ```sh 
   docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
- This command will start a `PostgreSQL` container named `my-postgres` with the password `mysecretpassword` and expose `port 5432` on your localhost.

4. Migrate the database with Prisma 🛢️

 
```sh 
    npx prisma migrate dev --name init
```

5. Docker Compose Configuration 🐳
- Below is the content of the docker-compose.yml file used to run PostgreSQL:
 
```sh 

    version: '3.1'

    services:
      db:
        image: postgres:latest
        restart: always
        environment:
        POSTGRES_USER: your_username
        POSTGRES_PASSWORD: your_password
        POSTGRES_DB: your_database
      ports:
        - "5432:5432"
      volumes:
        - postgres_data:/var/lib/postgresql/data

  volumes:
    postgres_data:

```

6.  Open up two terminal instances and run scripts below in directories `/server` and `/client`

- Server
 
```sh 
    npm i && npm run dev
```
- Client
 
```sh 
    npm i && npm run dev
```
after running scripts go to `http://localhost:5173` with your browser to use the app. 🌐

## Usage 🚀

### Admin Actions ⚙️ 
- Adding, deleting, and updating products.⚙️
### User Actions 👥
- Viewing the list of products and checking product details.👁️



## License 📄

[MIT](https://choosealicense.com/licenses/mit/)
