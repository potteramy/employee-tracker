/*
Here are some hints about how to go about the multi-join query needed
in at least one part of the MySQL homework
Here’s a quick glance at how the tables reference each other:
employee      id       role_id     manager_id
role          id       dept_id
department    id
Here’s an incomplete join statement to get you started
SELECT ...
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN
LEFT JOIN employee manager ON xxxxxx.id = employee.xxxxxxx
*/