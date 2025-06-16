# Clinic Management API - Usage Guide

## Prerequisites
- Java 17+ 
- Maven 3.8+
- PostgreSQL 14+

##  Launching the Application

### 1. Clone the repository
```bash
git clone git@github.com:lengueSandra48/Clinic-Management.git
cd clinic-management/clinic-management-backend
```

### 2. configure the database
1. create a database named clinic_management_db
2. update the yaml configuration :
```bash
cp src/main/resources/application.yml src/main/resources/application-local.yml
```
3. edit application-local.yml with your credentials

### 3. Build and run (with local profiles)
```bash
mvn clean install 
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## Accessing Swagger documentation 
[Open Swagger UI](http://localhost:8081/swagger-ui/index.html#/)