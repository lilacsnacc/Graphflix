# Chapter Select

[Quickstart](#quickstart)

[Explanation](#explanation)

&emsp;[Step One](#step-one)

&emsp;[Step Two](#step-three)

&emsp;[Step Three](#step-three)

[Given More Time..](#given-more-time)

# Quickstart

## Requirements:

- Nodejs >= v16

## Steps

1. In a terminal, in a directory of your choosing, clone this repo with `git clone repo_url`
1. `cd` into the repo folder
1. run `npm i` to get all the packages and goodies necessary to run the server
1. run `node .` to start the GraphQL and Rest API servers
    - rest api is http://localhost:4095/api/titles
    - graphql is http://localhost:9000/
1. in a separate terminal, run `npm start` to start the React server.
    - if the site does not pop up automatically, the location should be in the terminal

- Run tests with npm test

# Explanation

So there are a few things to note. I wasn't sure where to start or stop in the process of making the website (like do I make a quick login system, or should I have playable video?). In a client-facing dev environment (with much more time) I would ask a few more questions before getting into the thick of it.

For now I'm assuming we just want to see a selection of movies and descriptions when a movie is clicked. That said, let's jump into the code!

## Step One

First let's start with the easiest part: the Rest API. If I understand the requirements it's also kind of the base of the backend.

So I know I could use express.js to make it quickly, but for this I made a class that spawns an http server. No need to import or install anything yet.
One thing I would like to spend more time on is getting the json path param to be absolute. Feels janky to pass the path relative to the class file.

In terms of testing, I figured we should ensure the API returns the correct status codes for certain situations. If the server is set up with invalid parameters, it should immediately fail. If a nonexistent endpoint or method is called, it should return 404. If the user did everything right and there is still an error retrieving the data, return 500. Otherwise, if all is well, the server should return 200 ^_^.

## Step Two

Now we build on Step One with GraphQL. I admit I haven't touched GraphQL before, only heard of it, so this ate a lot of time. That said, I quickly got used to it, and I think I might change up some of my own backends (I like it!)

This ate up a majority of my time, since at first I made it much more complicated than necessary. Once I ended up using `apollo-server`, which seems to be the gold standard for graphql queries, everything became a breeze.

In terms of testing, if there were more time, I would run the same types of tests for the REST API. (Check valid and invalid parameters, check for return values that do not match the schema). However at this point I have no time to test. Of course, when you do something like this once, it's 100x easier to do it again. But since this was my first time, it took a bit of research.

## Step Three

Now for the React. I wanted to save the best for last, since I have the most fun with React / Frontend design, but this had to be rather rushed. I am simply getting the images and listing them out.

I tried to add some routes and effects to at least show I have that understanding, but again, I did not have enough time.

## Given More Time
Given more time, I would...

- more meticulously create the app (file by file), instead of calling the bulky and bloated `create-react-app` (that's 1400 packages!).

- add a ton more comments to the index.js and graph-ql/index files

- add a few comments to the React components. They're pretty self-explanatory, but some parts could use more clarity for like onboarding developers

- Really build out the React site. I had a whole vision for the frontend :'(

- Add testing to the graphql-api and the react components. Testing is super important to me! I mean, even if it's just demo code, it's always nice to see that 100% green affirmation

- Clean up the imports. On build, tree-shaking should take care of it. But still, I like to have a clean environment.

Well, that concludes that. I hope I was able to demonstrate an understanding of backend and frontend, and the ability to pick up new technologies. Thank you for your time!