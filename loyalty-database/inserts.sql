INSERT INTO role (id, name) VALUES (1, 'CLIENT');
INSERT INTO role (id, name) VALUES (2, 'ADMINISTRATOR');


INSERT INTO privilege (id, name) VALUES (1, 'Login to the client');
INSERT INTO privilege (id, name) VALUES (2, 'Register an account');
INSERT INTO privilege (id, name) VALUES (3, 'Buy points');
INSERT INTO privilege (id, name) VALUES (4, 'Change points');
INSERT INTO privilege (id, name) VALUES (5, 'Check accounts');
INSERT INTO privilege (id, name) VALUES (6, 'Check transactions');
INSERT INTO privilege (id, name) VALUES (7, 'Check profile');
INSERT INTO privilege (id, name) VALUES (8, 'Modify profile');
INSERT INTO privilege (id, name) VALUES (9, 'Change plan');

INSERT INTO privilege (id, name) VALUES (10, 'Login to the back-office');
INSERT INTO privilege (id, name) VALUES (11, 'Create an administrator');
INSERT INTO privilege (id, name) VALUES (12, 'Manage users');
INSERT INTO privilege (id, name) VALUES (13, 'Manage accounts');
INSERT INTO privilege (id, name) VALUES (14, 'Manage transactions');
INSERT INTO privilege (id, name) VALUES (15, 'Manage settings');


INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,1);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,2);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,3);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,4);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,5);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,6);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,7);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,8);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (1,9);

INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,10);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,11);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,12);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,13);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,14);
INSERT INTO role_privilege (role_id, privilege_id) VALUES (2,15);


INSERT INTO status (id, name, type) VALUES (1, 'ACTIVE', 'USER');
INSERT INTO status (id, name, type) VALUES (2, 'LOCKED', 'USER');
INSERT INTO status (id, name, type) VALUES (3, 'NEW', 'ACCOUNT');
INSERT INTO status (id, name, type) VALUES (4, 'VERIFIED', 'ACCOUNT');
INSERT INTO status (id, name, type) VALUES (5, 'PENDING', 'TRANSACTION');
INSERT INTO status (id, name, type) VALUES (6, 'SUCCEEDED', 'TRANSACTION');


INSERT INTO plan (id, name) VALUES (1, 'BASIC');
INSERT INTO plan (id, name, amount) VALUES (2, 'PREMIUM', 25);
INSERT INTO plan (id, name, amount) VALUES (3, 'GOLD', 150);


INSERT INTO benefit (id, value, type) VALUES (1, 20, 'PERCENT');
INSERT INTO benefit (id, value, type) VALUES (2, 2500, 'POINT');


INSERT INTO benefit_plan (benefit_id, plan_id) VALUES (1, 2);
INSERT INTO benefit_plan (benefit_id, plan_id) VALUES (1, 3);
INSERT INTO benefit_plan (benefit_id, plan_id) VALUES (2, 3);


INSERT INTO conversion (id, unit_a, unit_b, an_a_is_so_many_b) VALUES (1, 'DOLLAR', 'POINT', 500);


INSERT INTO commission (id, service_charge, service_transfer, processor, date_creation) VALUES (1, 1.5, 5, 0.75, NOW());

INSERT INTO loyalty_user(id, email, password, role_id, picture)VALUES (1000,'miguele.coccaro@gmail.com','claveadmin','2',null);

INSERT INTO person(id, personal_id, first_name, second_name, first_lastname, second_lastname, date_of_birth, user_id, place_id)
VALUES (1000,'19292900','Miguel',null,'Coccaro','Montserrat','1986/11/11',1000,null);