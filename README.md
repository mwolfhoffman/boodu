# Boodu

[![React-App-CI](https://github.com/mwolfhoffman/react-jack/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/mwolfhoffman/boodu/actions/workflows/main.yml)

This is a POC project where I am experimenting with React + Supabase (an open source Firebase alternative built on top of postgreSQL).

I am able to use Supabase's OAuth, create confirmation emails on sign up, and log users in. 

I think the plan is to create a real time collaborative data mapping tool. More on that to come. 

I also want to add github actions for CI/CD

## To Run: 

### Required Environment Variables: 
```
REACT_APP_SUPABASE_KEY=
REACT_APP_SUPABASE_URL=
```
These can be obtained by creating a project in [supabase](https://supbase.io)


Install modules and start dev server: 
```
yarn install
yarn start
```

Run tests:
```
yarn test
```
