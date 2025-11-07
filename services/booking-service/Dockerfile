FROM gradle:9.1-jdk25 AS build
WORKDIR /app

COPY build.gradle settings.gradle ./

COPY src ./src
RUN gradle build --no-daemon -x test

FROM openjdk:25-ea-slim AS production
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080 9090

ENTRYPOINT [ "java", "-jar", "app.jar" ]
