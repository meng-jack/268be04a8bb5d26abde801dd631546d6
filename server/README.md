# United Aline Serverware

## Development

Either using a trusted certificate, or generate a self-signed certificate with the following:

```
openssl genrsa -out localhost-key.pem 2048

openssl req -new -x509 -sha256 -key localhost-key.pem -out localhost.pem -days 365
```

-   `localhost-key.pem`
-   `localhost.pem`
