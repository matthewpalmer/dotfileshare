# Dotfiles
Easily share and sync your dotfiles. There are two main resources, `user`s and `file`s. `file` is a specific dotfile, `user` is a user with a list of `file`s attached to their name.

## API

Everything is JSON. You need to be authenticated for anything other than GET. Authentication is using basic auth with https. It looks like this in Curl.

```
curl -u myusername:mypassword --data "param1=value1" -k -X PUT https://localhost:3000/user/123
```

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

### Files

```javascript
Get a file
  GET /file/:id

// Requires a percentage serialized string to be passed in as the value for 'file'. Use `jape` npm module or querystring.stringify.
// E.G. `curl -u myusername:mypassword --data "file=value1" -k -X POST https://localhost:3000/file`
Create a new file
  POST /file

//Same as above
Update a file
  PUT /file/:id

Delete a file
  DELETE /file/:id
```