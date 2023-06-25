# Groceries Store

Simple full stack e-commerce groceries store built on top of Next.js

Online project: https://wowmart.vercel.app

## Main technologies

- React
- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Prisma
- MongoDB

# How to run this project

1. [Node.js](https://nodejs.org/en) is required in order to run the project
2. Make a copy of the .env.example file and rename it to .env.
3. Set up a [database on MongoDB Atlas](https://www.mongodb.com/docs/atlas/getting-started/) and get the required connection URL
4. Optionally, for the payment system, check out how to set up [payments with Stripe](https://stripe.com/docs/payments) and how get a test API key
5. Fill the .env file with the required data: database URL, client URL which in development mode is the localhost and optionally the Stripe API key to test the payment feature
6. Push the Prisma schema to the database using the following command:

```bash
npx prisma db push
```

7. After that, seed the database with the products data using the command:

```bash
npx prisma db seed
```

8. Then, run the development server:

```bash
npm run dev
```

9. Open http://localhost:3000 with your browser to see the result.
