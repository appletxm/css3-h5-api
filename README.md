## css3-h5-api
# test http2

1. Generate a private key
```
openssl genrsa -out server.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
```

2. Create a CSR
```
openssl req -new -key server.key -out server.csr
```

3. Get a certificate
```
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
```
then you can run 'node ./scripts/server-http2-express.js' in the terminal


4. .vue to 小程序 AST
- https://babeljs.io/docs/en/babel-parser/
- https://babeljs.io/docs/en/babel-generator
- https://babeljs.io/docs/en/babel-types#expressionstatement
- https://babeljs.io/docs/en/babel-traverse
- https://babeljs.io/docs/en/babel-template
- https://astexplorer.net/
- https://zhuanlan.zhihu.com/p/88899071
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#paths

- https://www.npmjs.com/package/htmlparser2