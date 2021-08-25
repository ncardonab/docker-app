# Layer 1 - Offically supported nodejs image
FROM node:12

# Layer 2 - When you cd into our directory / Adding our source code to the image
WORKDIR /app

# Layer 3 - First Argument: Local package.json, Second Argument: The place we want to copy it in the container (current working directory)
COPY package*.json ./

# Layer 4 - This is just like opening a terminal session and runnning a command 
# When finished the result should be commited to the docker image as a layer
RUN npm install

# Layer 5 - Copying local files to the current loca docker directory
# WARNING: This will install node_modules, something that we don't want to happen 
COPY . .

# In order to run our code we're using an environment variable
ENV PORT=8080

# 
EXPOSE 8080

# There can only be one of these per docker file, and it tells the container how to run the actual application
# which it does by starting a process to serve the express app
CMD [ "npm", "start"]