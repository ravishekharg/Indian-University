CREATE KEYSPACE university
WITH replication = {
'class':'SimpleStrategy',
'replication_factor':1
};

USE university;

CREATE TABLE attendance (

    student_id int,

    attendance_date date,

    status text,

    course_name text,

    PRIMARY KEY (
        student_id,
        attendance_date
    )
);