INSERT INTO departments (department_name)
VALUES ("Shipping"),
       ("Front Desk"),
       ("Warehouse");

INSERT INTO roles (title, salary, department_id)
VALUES ("Shipping", 40000, 1),
      ("Front Desk", 30000, 2),
      ("Warehouse", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jan", "P", 1, 1),
      ("Sue", "Z", 2, 2),
      ("Jen", "A", 2, 2),
      ("Dan", "D", 3, 3),
      ("John", "B", 3, 3);
