# Proxy

A Node Js server that aids in local development. This adds CORS headers in the response. When remote requests do not have CORS. 

## Usage
Clone this repository. Start the server by using

```sh
$ node index.js -h example.com
```

By defaul the server would start listening in port 3320. Any requests made to this will fetch the corresonding url from the server. 

### Sample call

```sh
http://localhost:3320/rest/content/news
```
This would fetch __*/rest/content/news*__ from the server configured. If the server is example.com, the above url would responde with the contents from:
```sh
http://example.com/rest/content/news
```

## Options
- **-h** as host. This is __required__.
- **-p** to change default port.

Example usage with all options
```sh
$ node index.js -h example.com -p 3320
```

## Features
  - Relative path image srcs will be converted to absolute path images.
  - Adds CORS headers
