# Listricity

![N|Solid](http://listricity.com/listricity.png)

listricity is a free online playlist maker and music player. Create music playlists by grading tracks suggestions.
Check out the [Live version](http://listricity.com)

### Tech

Listricity uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [Ace Editor] - awesome web-based text editor
* [markdown-it] - Markdown parser done right. Fast and easy to extend.
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Gulp] - the streaming build system
* [Breakdance](http://breakdance.io) - HTML to Markdown converter
* [jQuery] - duh


### Development

Want to contribute? Great!

Listricity uses Gulp + Webpack for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ node app
```

Second Tab:
```sh
$ gulp watch
```

(optional) Third:
```sh
$ karma test
```
#### Building for source
For production release:
```sh
$ gulp build --prod
```
Generating pre-built zip archives for distribution:
```sh
$ gulp build dist --prod
```
### Docker
Listricity is very easy to install and deploy in a Docker container.

By default, the Docker will expose port 8080, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd listricity
docker build -t zohar-israel/listricity:${package.json.version}
```
This will create the Listricity image and pull in the necessary dependencies. Be sure to swap out `${package.json.version}` with the actual version of listricity.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8000 of the host to port 8080 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 8000:8080 --restart="always" <youruser>/listricity:${package.json.version}
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8000
```

### Todos

 - Write MORE Tests
 - Add Night Mode

License
----

MIT


**Free Software, Hell Yeah!**

   [dill]: <https://github.com/zohar-israel/listricity>
   [git-repo-url]: <https://github.com/zohar-israel/listricity.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/zohar-israel/listricity/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/zohar-israel/listricity/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/zohar-israel/listricity/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/zohar-israel/listricity/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/zohar-israel/listricity/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/listricity/blob/master/plugins/googleanalytics/README.md>
