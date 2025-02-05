# Scheduler frontend app

## How to run locally
1. Use docker compose: `docker compose up`
2. Initiate the database:
    - using pgadmin:
        1. create a database `local`
        2. run the query of each sql file from the `drizzle` directory
    - using migration from the app container:
        1. attach the app container : `docker compose exec app bash`
        2. run migrations: `npm run db:push`
3. access the app `http://localhost:4173`


## TODO

- [x] SSO front
- [x] user rights to edit a TL

### timeline
- [x] Navigate left and right from timerange
- [x] View multiple timelines
- [x] Select timelines user wants to see
- [x] Select timerange
- [x] Edit tasks
- [x] Multiple zooms
- [x] datetimepicker = P1 !
- [x] durationpicker = P1 !
- [x] Edit timeline
- [x] New timeline
- [ ] Copy a timeline
#### Table
- [ ] Page list tasks with filters
- [ ] Select all timelines
- [ ] Add new task
- [ ] Collapse a schedule -> 1 line = sum of tasks
#### Map
- [x] Map with pim
- [ ] Show tasks on the map
- [ ] Edit the PIM
- [ ] Add new points on the PIM
- [ ] Parse PIM from NMEA (ECDIS)
- [ ] Interpol Task on PIM
- [ ] Output = csv (id, type {waypoint | task event}, lat, long, timestamp, name, opt: description...)

### database
- [x] Save a new timeline
- [x] Save a new task
- [x] Save all tasks and timelines


## Data models

### Schedule
Represent a timeline
- id: i64, primary key
- name: String, display name
- description: String, description or comment

### Task
- id: i64, primary key
- name: String, display name of the task
- start: i64, unix timestamp in ms, start 
- duration: i64, in ms, duration of the task
- description: String, description or comment of the task
- category: i32, id of the category (foreign key)
- schedule_id: i64, id of the related schedule (foreign key)

### Category
- id: i64, primary key
- name: String, name of the group

### Group
- id: i64, primary key
- name: String, name of the group

### User
- id: i64, primary key
- name: String, username

### UserGroup
- user_id: i64, user id (foreign key)
- group_id: i64, group id (foreign key)
- admin: bool, if true user is admin of the group, if false just a member

### ScheduleGroup
- schedule_id: i64, schedule id (foreign key)
- group_id: i64, group id (foreign key)
- write: bool, if true group can read and write the schedule, false if read only

