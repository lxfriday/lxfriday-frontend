# 七牛云上传

    ！！！！！！！！重要的事情说无数遍！！！！！！！！

                不要把AK SK放在客户端

                不要把AK SK放在客户端

                不要把AK SK放在客户端

    ！！！！！！！！重要的事情说无数遍！！！！！！！！

## 放松
> 很简单就能实现文件上传，七牛的文档可以把你看晕，但只要注意几点就可以轻松解决

## 七牛
>七牛的文件存储方式是k-v形式，没有目录结构，`/a/b/c/bd.jpg`其中的`/a/b`是自己构想的路径分割符，实际不存在，



## token的获取
> **在浏览器或者手机app上面实现上传功能**，都选择从服务器获取token的方式，**不推荐从服务端上传**，图片的信息可以用js获取到，不用传到服务器由服务器获取之后再处理

## 上传的实现
 > 客户端获取到token之后，附带上配置选项发送到七牛的服务器端，客户端接收上传的反馈，依据反馈做出相应的处理。

## 上传时key的生成
> 比较随意，保证唯一性即可，使用uuid v4加上时间戳生成，保证了唯一性和安全性，v1存在一定的安全问题不推荐，具体原因移步 [UUID的意义和作用](http://blog.csdn.net/bravejiezai/article/details/51725049),**图片名由自己在客户端生成，发送到七牛和自己的服务器**

## php产生token代码
> token只要按照 [上传凭证](https://developer.qiniu.com/kodo/manual/upload-token) 的说明生成即可，这里借用了php-sdk中的生成方式，以免自己找麻烦

```php
use  Qiniu\Auth;
//...
$putPolicy = [
  'insertOnly' => 1,            //这里不能用true
  'fsizeLimit' => 52428800,     //50M
  'mimeLimit' =>'image/*',
  'returnBody' => json_encode([ //这里也要编码一次，returnBody的值整体是一个json字符串也可以
    'name' => '$(fname)',       //原始文件名
    'size' => '$(fsize)',
    'w' => '$(imageInfo.width)',
    'h' => '$(imageInfo.height)',
    'hash' => '$(etag)',
    'key' => '$(key)',          //上传的时候的文件名
    'mimeType' => '$(mimeType)',//mime类型
  ])
];
$auth = new Auth('你的AK', '你的SK');
$token = $auth->uploadToken('你的Bucket名，在对象存储中获得', null, 600, $putPolicy);
//token生成之后可以直接返回给客户端了
```

## 客户端上传实现
**POST上传**
> 分析表单的上传过程，**POST**，**请求地址**，**编码方式**，**key**，**token**，**file** 

```html
<form method="post" action="http://upload.qiniu.com/" enctype="multipart/form-data">
  <input name="key" type="hidden" value="我想要一个新的名字.jpg"> <!-- 自定义上传的key -->
  <input name="x:location" type="hidden" value="Shanghai"> <!-- 自定义变量的行为同魔法变量基本一致，但变量名必须以x:开始。 -->
  <input name="x:price" type="hidden" value="1500.00"> <!-- 可有可无 -->
  <input name="token" type="hidden" value="zlvMwqEQx1Yir9urPO0cwCAUt-7PMXUJWZnRY35S:OOE9UY7UOyf9U36zJug_Gh7bNlI=:eyJpbnNlcnRPbmx5IjoxLCJmc2l6ZUxpbWl0Ijo1MjQyODgwMCwibWltZUxpbWl0IjoiaW1hZ2VcLyoiLCJyZXR1cm5Cb2R5Ijoie1wibmFtZVwiOlwiJChmbmFtZSlcIixcInNpemVcIjpcXCIsXCJtaW1lVHlwZVwiOlwiJChtaW1lVHlwZSlcIixcImFkZEluZm9cIjpcIiQoeDphZGRJbmZvKVwifSIRzIjpbImh0dHA6XC9cL3VwLnFpbml1LmNvbSIsImh0dHA6XC9cL3VwbG9hZC5xaW5pdS5jb20iLCItSCB1cC5xaW5pdS5jb20gaHR0cDpcL1wvMTgzLjEzNi4xMzkuMTYiXX0="> <!-- 必须 -->
  <input name="file" type="file" /> <!-- 必须 -->
  
</form>
```



**使用jquery上传文件到七牛(token是从服务器端请求到的)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>文件自定义上传测试</title>
  <script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
</head>
<body>
  <form action="http://upload.qiniu.com" method="POST" enctype="multipart/form-data" id="form">
    key: <input name="key" type="text" value="///nnnnnnnnnnnn.jpg"> <br>
    addInfo: <input name="x:addInfo" type="text" value="我是额外的信息"> <br>
    token: <input name="token" type="text" value="zlvMwqEQx1Yir9urPO0cwCAUt-7PMXUJWZnRY35S:OOE9UY7UOyf9U36zJug_Gh7bNlI=:eyJpbnNlcnRPbmx5IjoxLCJmc2l6ZUxpbWl0Ijo1MjQyODgwMCwibWltZUxpbWl0IjoiaW1hZ2VcLyoiLCJyZXR1cm5Cb2R5Ijoie1wibmFtZVwiOlwiJChmbmFtZSlcIixcInNpemVcIjpcXCIsXCJtaW1lVHlwZVwiOlwiJChtaW1lVHlwZSlcIixcImFkZEluZm9cIjpcIiQoeDphZGRJbmZvKVwifSIRzIjpbImh0dHA6XC9cL3VwLnFpbml1LmNvbSIsImh0dHA6XC9cL3VwbG9hZC5xaW5pdS5jb20iLCItSCB1cC5xaW5pdS5jb20gaHR0cDpcL1wvMTgzLjEzNi4xMzkuMTYiXX0=" id="token"> <br>
    file: <input name="file" type="file"> <br>
  </form>
  <button id="submit">提交</button>
   <script>
    jQuery(document).ready(function($) {
      $('#submit').on('click', function(event) {
        event.preventDefault();
        const form = new FormData($('#form')[0]);
        $.ajax({
          url: 'http://upload.qiniu.com',
          type: 'POST',
          processData: false,
          contentType: false,
          cache: false,
          data: form,
        })
        .done(function(responseText) {
          console.log("success");
          console.log(responseText);
        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });
    });
   });
  </script>
</body>
</html>

```
 




- [七牛对象存储文档](https://developer.qiniu.com/kodo)
- [js-sdk说明](https://developer.qiniu.com/kodo/sdk/javascript)
- [上传策略](https://developer.qiniu.com/kodo/manual/put-policy)
- [上传凭证](https://developer.qiniu.com/kodo/manual/upload-token)
- [变量](https://developer.qiniu.com/kodo/manual/vars#xvar)
