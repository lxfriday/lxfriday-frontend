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

### Demo
1. [表单提交](https://github.com/lxfriday/lxfriday-frontend/blob/master/Upload/QiniuUploadDemo.html) 
2. [表单提交](https://github.com/lxfriday/lxfriday-frontend/blob/master/Upload/QiniuUploadDemo.html) 
3. [表单提交](https://github.com/lxfriday/lxfriday-frontend/blob/master/Upload/QiniuUploadDemo.html) 


## 相关
- [通过jQuery Ajax使用FormData对象上传文件](http://www.jianshu.com/p/46e6e03a0d53)
- [七牛对象存储文档](https://developer.qiniu.com/kodo)
- [js-sdk说明](https://developer.qiniu.com/kodo/sdk/javascript)
- [上传策略](https://developer.qiniu.com/kodo/manual/put-policy)
- [上传凭证](https://developer.qiniu.com/kodo/manual/upload-token)
- [变量](https://developer.qiniu.com/kodo/manual/vars#xvar)
