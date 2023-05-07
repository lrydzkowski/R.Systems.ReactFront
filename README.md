# r-systems-react-front

R.Systems front-end.

## Docker

### Create image

```powershell
docker build -t r-systems-react-front -f .\Dockerfile .
```

### Run container

```powershell
docker run -d --name r-systems-react-front -p 8096:80 r-systems-react-front
```
