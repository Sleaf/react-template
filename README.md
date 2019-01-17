# react-template
>自用react模板

## 包含库/功能
### React & React-hot-loader
- 已使用`@hot-loader/react-dom`替换官方`react-dom`
- 支持开发模式下`css-hot-loader`css文件热重载
- 支持官方React.lazy，并封装于`src/utils/hocs/LazyPageWrapper.js`

### babel &  autoprefixer/postcss
- babel已配置支持`react-hot-loader`与`jest`

### https自签支持（localhost）
> - **警告**：工程内的证书秘钥等仅为调用特殊浏览器API提供测试开发，用于生产是**根本不安全**的。
> - 需在 `webpack.dev.js` 文件中修改`ENABLE_SSL`为`true`以启用该功能。
> - localCA.key的pass phrase为sleaf1996，证书内容均为个人相关字样
> - localhost.csr的challenge password为:sleaf1996，证书内容均为个人相关字样
> - 附：[证书格式转换](https://vimsky.com/article/3608.html)
#### Chrome
- 设置 `chrome://flags/#allow-insecure-localhost`为**ENABLE**
#### Mac OS X
- 添加证书： 
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localCA.crt
```
- 移除证书： 
```bash
sudo security delete-certificate -c localCA.crt
```
#### Windows
- 添加证书： 
```bash
certutil -addstore -f "ROOT" localCA.crt
```
- 移除证书： 
```bash
certutil -delstore "ROOT" localCA.crt
```
#### Linux (Ubuntu, Debian)
- 添加证书：
```bash
sudo cp localCA.crt /usr/local/share/ca-certificates/localCA.crt
sudo update-ca-certificates
```
- 移除证书：
```bash
sudo rm /usr/local/share/ca-certificates/localCA.crt
sudo update-ca-certificates --fresh
```
>Restart Kerio Connect to reload the certificates in the 32-bit versions or Debian 7.
#### Linux (CentOs 6)
- 添加证书：
```bash
yum install ca-certificates
update-ca-trust force-enable
cp localCA.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust extract
```
>Restart Kerio Connect to reload the certificates in the 32-bit version.
#### Linux (CentOs 5)
- 添加证书：
Append your trusted certificate to file /etc/pki/tls/certs/localCA.crt: 
```bash
cat localCA.crt >> /etc/pki/tls/certs/ca-bundle.crt
```

### 其他
- less
- jest

## 待解决的问题
- ~~css-hot-loader无法使用~~

## 待添加的功能
- 多主题方案支持
- 多预编译器支持（参考vue-cli）
