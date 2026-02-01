# FlickrBuzz
## Run:

> [!NOTE]
> App is served in 3000

### With docker
- Install docker and docker compose
- `docker compose up` from app root directory

### Without docker
- [Install pnpm](https://pnpm.io/installation)

**Install packages**
```bash
cd client && pnpm install & \
cd ../server && pnpm install

```
## Development
> [!NOTE]
> Uses pre-commit via [prek](https://prek.j178.dev/)

**Install project wide dependencies**
- `pnpm install` from app root directory
- `pnpm run prek:install #install pre-commit hooks`

**Start server**
```bash
cd server && pnpm run dev
```
**Start client**
```bash
cd client && pnpm run dev
```

### Run tests

#### Unit tests
```bash
# client
cd client && pnpm test

# server
cd server && pnpm test
```

### E2E tests
```bash
pnpm run e2e
```
