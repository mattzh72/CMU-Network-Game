# CMU-Network-Game
A course that covers computer network basics disguised as a game!

# Usage 
To run the files, you will need to host a local server on your computer. This is to allow the HTTP requests to fire properly.

### Python Web Server:
Download Python if you haven't already. Go into the directory of the 'index.html' file and run the command `python -m SimpleHTTPServer 8000` in command line. Load the URL `http://localhost:8000/` into your browser.

### Node.JS Web Server:
Install `http-server` via `npm`: `npm install http-server -g`. You can now run this server through the command line through the simple command `http-server`. Load the URL `http://localhost:8080` into your browser. See https://www.npmjs.com/package/http-server for more details.

### Brackets Text Editor:
Download brackets at http://brackets.io/. Brackets editor has a built in local server that can host your code (Live Preview). 

# FAQ 
*Question: When I try to run the files, I see this error in my console:*
```javascript
XMLHttpRequest cannot load file...Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
```
*Why can't it load the files?*

Answer: Look at the **Usage** section of this README. You need to host a http-server to run the files.
