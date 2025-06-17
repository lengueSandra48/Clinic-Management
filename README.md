##  Launching the Application

### 1. Clone the repository
```bash
git clone git@github.com:lengueSandra48/Clinic-Management.git
cd Clinic-Management/clinic-management-backend
```

### 2. Configure the database
1. Create a database named clinic_management_db
2. Update the yaml configuration 
```bash
cp src/main/resources/application.yml src/main/resources/application-local.yml
```
3. Edit application-local.yml with your credentials

### 3. Build and run (with local profile)
```bash
mvn clean install
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

## Accessing Swagger documentation
<http://localhost:8081/swagger-ui/index.html#/>

