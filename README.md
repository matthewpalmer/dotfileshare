# Dotfiles
Easily share and sync your dotfiles. There are two main resources, `user`s and `file`s. `file` is a specific dotfile, `user` is a user with a list of `file`s attached to their name.

```

### Files


Get a file
  __GET__`/file/:id`

// Requires a percentage serialized string to be passed in as the value for 'file'. Use `jape` npm module or querystring.stringify.
// E.G. `curl -u myusername:mypassword --data "file=value1" -k -X POST http://localhost:3000/file`
Create a new file
  POST /file

//Same as above
Update a file
  PUT /file/:id

Delete a file
  DELETE /file/:id

Star a file
  PUT /file/:id/star

Get the most popular files
  GET /files/popular


### User

```javascript
Get a user
  GET /user/:id

Create a new user
  POST /user         

Update a user
  PUT /user/:id

Delete a user
  DELETE /user/:id
```

