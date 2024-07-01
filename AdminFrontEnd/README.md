# Instruction to run our admin app

1. Build the docker image from docker file
```bash
docker build -t adminapp .
```
2. Use docker image to run docker container
```bash
docker run -p 3000:80 adminapp
```

