


# Prisma

npm install prisma -D
npm i prisma -D
npx prisma init  - this initiates the prisma folder

# this add relations to other tables
npx prisma format   

## create tables
npx prisma migrate dev --name init

After generate, you can check the generated prisma client on ./node_modules/.prisma/client

## update the db above
npx prisma db push

## open prisma studio
npx prisma studio

## migrate data to tables
```
Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:
```
npx prisma db seed

To make seed work replace 
```
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
```
with
```
    "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
 }
 ```
 npm install -g ts-node for seed to work



# to run heroku
 	Set-ExecutionPolicy RemoteSigned
	
	default: Set-ExecutionPolicy Restricted


  https://devcenter.heroku.com/articles/heroku-cli#download-and-install



  heroku logs --tail --app globalstand

  