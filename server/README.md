# United Aline Serverware

## Development

### Secrets

Most of local secrets are kept in the root `.env` file which defines secrets for not only where to find the SSL/TLS Certificates but also items relating to the database connections.

It is necessary to define the file using these keys as a template:

```properties
PSQL_DB_PWD=""
PSQL_DB_HOST=""
PSQL_DB_PORT=""
PSQL_DB_NAME=""
PSQL_DB_USERNAME=""
SERV_SSL_KEY_PATH=""
SERV_CERT_PATH=""
```

> **Note:** Most keys have a prefix that specifies what they function for. For example, the `SERV` prefix,
> specifies that this key is used primarily for the server while `PSQL` refers to the PostgreSQL database.

### Generating SSL/TLS Certificates

Either using a trusted certificate, or generate a self-signed certificate with the following:

```bash
openssl genrsa -out localhost-key.pem 2048

openssl req -new -x509 -sha256 -key localhost-key.pem -out localhost.pem -days 365
```

- `localhost-key.pem`
- `localhost.pem`
