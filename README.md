# Boodu

[![React-App-CI](https://github.com/mwolfhoffman/react-jack/actions/workflows/main.yml/badge.svg?branch=master)](https://github.com/mwolfhoffman/boodu/actions/workflows/main.yml)

Boodu is "Whiteboard" in Igbo. How many times has your team gathered around a whiteboard to discuss the DB mapping on a new project? No need for that anymore. As everything is remote a year into the pandemic, Boodu rescues your team from the whiteboard meeting. Use Boodu to map your DBs!

**This is a POC project where I am experimenting with React + Supabase (an open source Firebase alternative built on top of postgreSQL).**

I am able to use Supabase's OAuth, create confirmation emails on sign up, and log users in. Users can create up to two projects and each project can hold tables which consist of columns to map your DB architecture for a new or existing project.

**This is a very simple DB mapping tool. It is really just a POC for starting with Supabase. It doesn't use any of the real-time functionality yet.**

I added Tailwind CSS to the project because I thought it would be quick and easy to learn and so far I hate it. For now I left the config in there. It's a hog and not used. 

## Hosted:

This project is currently hosted at: https://laughing-jepsen-f73d91.netlify.app

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
