# REST API Example

This example shows how to implement a **REST (HTTP) API** using the [Gin Web Framework](https://github.com/gin-gonic/gin) and Prisma.

__INLINE(../_setup-1.md)__
cd prisma-examples/go/rest-gin
__INLINE(../_setup-2.md)__

### 4. Start the REST API server

```
go run main.go
```

The server is now running on `http://localhost:8080`. You can send the API requests implemented in `main.go`, e.g. [`http://localhost:8080/feed`](http://localhost:8080/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_next-steps.md)__