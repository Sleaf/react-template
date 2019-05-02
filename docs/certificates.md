# 在各环境中安装自签名证书

## Chrome
- 设置 `chrome://flags/#allow-insecure-localhost`为**ENABLE**
## Mac OS X
- 添加证书： 
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain localCA.crt
```
- 移除证书： 
```bash
sudo security delete-certificate -c localCA.crt
```
## Windows
- 添加证书： 
```bash
certutil -addstore -f "ROOT" localCA.crt
```
- 移除证书： 
```bash
certutil -delstore "ROOT" localCA.crt
```
## Linux (Ubuntu, Debian)
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
## Linux (CentOs 6)
- 添加证书：
```bash
yum install ca-certificates
update-ca-trust force-enable
cp localCA.crt /etc/pki/ca-trust/source/anchors/
update-ca-trust extract
```
>Restart Kerio Connect to reload the certificates in the 32-bit version.
## Linux (CentOs 5)
- 添加证书：
Append your trusted certificate to file /etc/pki/tls/certs/localCA.crt: 
```bash
cat localCA.crt >> /etc/pki/tls/certs/ca-bundle.crt
```