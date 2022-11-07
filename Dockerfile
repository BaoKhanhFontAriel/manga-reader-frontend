#### Stage 1: Build the react application
 FROM node:13-alpine as build-stage

# Configure the main working directory inside the docker image. 
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT 
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install 
# the dependencies. This is a separate step so the dependencies 
# will be cached unless changes to one of those two files 
# are made.
COPY package.json package-lock.json ./
RUN npm install

# Copy the main application
COPY . ./

ARG REACT_APP_SERVER_URL
ENV REACT_APP_SERVER_URL=http://ec2-18-136-208-50.ap-southeast-1.compute.amazonaws.com:8070/api

# Build the application
RUN npm run build

# production environment
FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# new

# Expose port 80 to the Docker host, so we can access it 
# from the outside.
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]

