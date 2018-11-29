# REST API Example

This example shows how to implement a **REST (HTTP) API** using [gorilla/mux](http://www.gorillatoolkit.org/pkg/mux) and Prisma.

__INLINE(../_setup-1.md)__
cd prisma-examples/go/http-mux
__INLINE(../_setup-2.md)__

### 4. Start the REST API server

```
go run main.go
```

The server is now running on `http://localhost:8080`. You can send the API requests implemented in `main.go`, e.g. [`http://localhost:8080/feed`](http://localhost:8080/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_next-steps.md)__