# second-backend

Sample REST API project for top secret project.

## Routes:

- `/post`:
  - `POST /`: create a new post, body:
    - authorUserId: the id of the author user of the post
    - topicId: the id of the topic in which the new post will belong
    - title
    - description (optional)
  - `GET /`: get all of the posts in the db
  - `GET /:id`: get a post by id
- `/topic`:
  - `POST /`: create topic, http body:
    - title: the title for the new topic
    - description: description for the new topic (optional)
  - `GET /`: get all topics in the database
  - `GET /:id`: get topic by id
- `/users`:
  TODO
