# Cualquier wea Talker

A node js Discord bot to read comennts from Twitch and Facebook live chat.


# packages



# usage


first:

change your api code on secret.json


This app uses docker 

how to :

first build the container

```docker build -t my-bot .```

then run the container

```docker run -d my-bot```

more info
```
# Get the containers!
$ docker ps

# Print the logs
$ docker logs <our container's ID>
``` 

and if you want go inside the container...
```
$ docker exec -it <container id> /bin/bash
```