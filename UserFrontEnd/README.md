# Instruction to run our user app
Make sure that you are in this folder
1. Build the docker image from docker file
```bash
docker build -t userapp .
```
2. Use docker image to run docker container
```bash
docker run -p 3001:80 userapp
```

