# Express.js + JWT + Sequelize + MariaDB

Example of a RESTful API with JWT authentication using MariaDB as database and Sequelize as ORM.

## Initial Set Up

### Use the correct Node.js version

This example app has been coded with Node.js `v16.13.0`. If you are using [NVM](https://github.com/nvm-sh/nvm) just run:

```sh
nvm use
```

That will select the correct version of Node.js for you. _Note: You may need to install it before using it._

### Install NPM dependencies

Run:

```sh
npm install
```

### Create the `.env` file

This example app uses environment variables, copy the `.env.example` file to a new file called `.env`:

```sh
cp .env.example .env
```

Make sure to fill and update the file with your own settings.

### Create a Database

By default, `sequelize-cli` [can not create a database for MariaDB](https://github.com/sequelize/sequelize/issues/12917) via command line, you will need to create your own database manually. Make sure the database name matches the `MARIADB_DATABASE` env var in the `.env` file.

### Run the DB Migrations

After creating the database, run the following command to create the tables automatically:

```sh
npx sequelize-cli db:migrate
```

### Seed the DB

It's a good idea to have some initial data in the database, to insert a few users into the db, run:

```sh
npx sequelize-cli db:seed:all
```

That will insert two users:

| First Name | Last Name | Email                | Password  | User Type |
|------------|-----------|----------------------|-----------|-----------|
| Isaac      | Ramirez   | iramirez@example.com | pass_good | admin     |
| Ragnar     | Lothbrok  | ragnar@example.com   | pass_good | user      |

## Development

To get the application up & running in development mode, run:

```sh
npm run dev
```

The server will start listening on port `8080` or the one configured in the `PORT` env var. Navigate to:

[http://localhost:8080](http://localhost:8080)
