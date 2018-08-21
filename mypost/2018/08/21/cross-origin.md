# 跨域解决方案

**跨域是指一个域下的文档或者脚本试图去请求另一个域下的资源**，这里的跨域是广义的。通常说的跨域是狭义的，室友浏览器同源策略限制的一类请求场景。

**广义的跨域**：

1. 资源跳转：A链接、重定向、表单提交
1. 资源嵌入：link、script、img、frame 等dom标签，还有样式中的 background: url()、@font-face()等文件外链
1. 脚本请求：js发起的ajax请求、dom和js对象的跨域操作等

**同源策略**：

SOP（Same Orign Policy）是一种约定，如果缺少其浏览器很容易受到XSS、CSRF等攻击。同源是指 **协议+域名+端口** ，即使两个不同域名指向了同一个ip地址，也不是同源。

同源策略限制了以下几种行为：

1. Cookie、LocalStorage、IndexDB无法读取
1. DOM和JS对象无法获得
1. AJAX请求不能发送

## 跨域的解决方案

- [JSONP](#JSONP)
- [CORS（跨域资源共享）](#CORS（跨域资源共享）)
- [NGINX 代理跨域](#NGINX代理跨域)
- postMessage
- document.domain
- 其他

### JSONP

动态创建一个script标签，再请求一个带参数的网址，实现跨域通信

```html
<!-- html -->
<script>
  var script = document.createElement('script');
  script.type = 'text/javascript';

  script.src = 'http://t.com:8000/login?cb=getData';
  document.head.appendChild(script);

  function getData(data) {
    console.log(`data from server: ${JSON.stringify(data)}`);
  }
</script>
```

```js
// server
var qs = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  console.log(req.url);
  var params = qs.parse(req.url.split('?')[1]);
  var fn = params.cb;

  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  res.write(fn + '(' + JSON.stringify({name: 'lxfriday'}) + ')');

  res.end();
});

server.listen('8000');
console.log('listening start at: http://localhost/8000');
```

### CORS（跨域资源共享）

普通跨域请求：只需要在服务端设置 `Access-Control-Allow-Origin` 即可，前端无需设置。

带cookie的请求：前后端都需要设置字段，另外所带的cookie为跨域接口的cookie，不是当前页的cookie。

```html
<!-- html -->
<script>
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open('POST', 'http://t.com:8000/login', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send('user=admin');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  }
</script>
```

```js
// server
var qs = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
  var postData = '';
  req.addListener('data', (chunk) => postData += chunk);
  req.addListener('end', () => {
    postData = qs.parse(postData);
    console.log(`postData => ${JSON.stringify(postData)}`);
    
    res.writeHead(200, {
      'Access-Control-Allow-Origin': 'http://t.com:8080',
      'Access-Control-Allow-Credentials': true,
      'Set-Cookie': 'name=lxfriday;Path=/;Domain=http://t.com:8080;HttpOnly', // HttpOnly脚本无法使用cookie
    });
    res.write(JSON.stringify(postData));

    res.end();
  });
});

server.listen('8000');
console.log('listening start at: http://localhost/8000');
```

浏览器将CORS请求分成两类：简单请求和非简单请求

同时满足以下两大条件，就属于简单请求。

（1）请求方法是以下三种方法之一

- HEAD
- GET
- POST

（2）HTTP的头信息不超出以下几种字段

- Accept（内容类型 MIME）
- Accept-Language（语言类型 zh-CN）
- Content-Language
- Last-Event-ID
- Content-Type 只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

非简单请求会发出一次预检测请求，返回码是[204](https://baike.baidu.com/item/HTTP%E7%8A%B6%E6%80%81%E7%A0%81/5053660#2_5)，预检测通过才会真正发出请求，这才返回200。


```js
const { successBody } = require('../util');
class CrossDomain {
  static async cors (ctx) {
    const query = ctx.request.query;
    // 如果http请求中带上cookie，需要后端都设置credentials，且后端设置指定的origin
    ctx.set('Access-Control-Allow-Origin', 'http://t.com:8080');
    ctx.set('Access-Control-Allow-Credentials', true);
    // 非简单请求的CORS，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求（preflight）
    // 这种情况下除了设置origin，还需要设置Access-Control-Allow-Methods、Access-Control-Allow-Headers
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,HEAD,PUT,OPTIONS,DELETE,CONNECT,TRACE');
    ctx.set('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,t');
    ctx.cookie.set('name', 'lxfriday');
    ctx.body = successBody({ msg: query.msg }, 'success');
  }
}

```

### NGINX 代理跨域

#### 1、nginx配置解决iconfont跨域

浏览器跨域访问js、css、img等常规静态文件被同源策略允许，但iconfont字体（eot|otf|ttf|woff|svg）除外，此时可在nginx静态资源服务器中加入下面配置

```nginx
location / {
  add_header Access-Control-Allow-Origin *;
}
```

#### 2、nginx反向代理接口跨域

请求的时候还是用前端的域名，然后nginx帮忙把这个请求转发到真正的后端域名上，就避免跨域了。

nginx 配置文件

```nginx
server {
  listen 8080;
  server_name t.com;
  location ^~/api {
    proxy_pass http://t.com:1234;
  }
}
```

## 参考资料

- [MDN 请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
- [前端常见跨域解决方案（全） - inroam - 博客园](https://www.cnblogs.com/roam/p/7520433.html)
- [不要再问我跨域的问题了](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651554582&idx=1&sn=f04640859c081eadda8f825ec8728e94&chksm=802554d7b752ddc10950a699a2221a42e8bf607ce45c98e68d8bfe7f4a9b431a3baa90d7ee7e&mpshare=1&scene=23&srcid=0821OcTUMz5IKn5d2wSKu8w4#rd)
