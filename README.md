
## Installation Process step by step

All Designed Routes:

* /doctors/register > with username and password
* /doctors/login > returns the JWT to be used
* /patients/register
* /patients/:id/create_report
* /patients/:id/all_reports → List all the reports of a patient oldest to latest
* /reports/:status → List all the reports of all the patients filtered by a specific status


follow these step to run 

* Clone this repository:
.....................................................
https://github.com/vrthalor/hospital-api-assignment.git
```

* Install dependency:
.....................................................

npm install
.....................................................


* Start the application using this command 
.....................................................

npm run start
.....................................................


* Open the application in your postman app by visiting the following URL: 
.....................................................

http://localhost:8000
.....................................................


### Features:

There can be 2 types of Users:

 1 Doctors
 2 Patients

### 
1 register doctor can log in
2 login doctor
 
3. Register the patient by phone number if exist then return user exist

4. After the checkup, create a patient Report by doctor id

 Status -  [Negative, Travelled-Quarantine, Symptoms-Quarantine, Positive-Admit]

5. get all reports by user id for particular user 

6. get all reports by status and details like doctor name, patient name, status and created data etc...
