# mern-redux-tailwind

A quick start template with MERN, Redux & [Tailwind CSS](https://tailwindcss.com)

### ES Modules in Node

We use ECMAScript Modules in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

### Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

## Update the values in the below files:

1) mern-redux-tailwind\frontend\public\manifest.json
```
  "short_name": "Your application's short name",
  "name": "Your application's name",
```

2) mern-redux-tailwind\frontend\public\index.html
```
   <meta
      name="description"
      content="Your application's description"
    />
   <title>Your application's title</title>
```

3) mern-redux-tailwind\package.json
```
   "name": "Your application's name",
```

4) mern-redux-tailwind\package-lock.json
```
   "name": "Your application's name",
```

## License

MIT
