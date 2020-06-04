CREATE DATABASE fidelidad;

create table place(
  id serial not null primary key,
  name varchar not null,
  type varchar not null,
  place_id integer,
  constraint type_place check (type in('COUNTRY','STATE','CITY','STREET')),
  constraint place_fk foreign key (place_id) references place(id)
);


create table privilege(
      id serial not null primary key,
      name varchar not null
);

create table role(
 id serial not null primary key,
 name varchar not null,
 constraint check_name check (name in ('ADMINISTRATOR','CLIENT'))
);

create table loyalty_user(
         id serial not null primary key,
         picture bytea,
         email varchar not null unique,
         password varchar,
         role_id integer not null,
         customer_stripe varchar,
         account_stripe varchar,
         constraint role_fk foreign key (role_id) references role(id)
);

CREATE TABLE person(
   id serial not null primary key,
   personal_id numeric unique,
   first_name varchar not null,
   second_name varchar,
   first_lastname varchar not null,
   second_lastname varchar,
   date_of_birth date,
   place_id integer,
   user_id integer not null,
   constraint place_id_fk foreign key (place_id) references place(id),
   constraint user_id_fk foreign key (user_id) references loyalty_user(id)
);

create table plan(
 id serial not null primary key,
 name varchar not null,
 description varchar(160),
 amount varchar not null,
 constraint check_plan check (name in('BASIC','PREMIUM','GOLD'))
);

create table benefit(
    id serial not null primary key,
    value numeric not null,
    type varchar not null,
    constraint check_type check ( type in ('PERCENT', 'POINT'))
);

create table account(
    id serial not null primary key,
    routing_number VARCHAR not null,
    account_number VARCHAR not null,
    primary_account varchar not null,
    type varchar not null,
    user_id integer not null,
    external_account_stripe varchar,
    customer_source_stripe varchar,
    constraint user_fk foreign key(user_id) references loyalty_user(id),
    constraint primary_check check (primary_account in ('T', 'F')),
    constraint type_check check (type in ('INDIVIDUAL', 'COMPANY')),
    constraint unique_ranumber unique (routing_number, account_number)
);

create table transaction(
        id serial not null primary key,
        transaction_number numeric,
        date_creation timestamp not null,
        last_date_update timestamp not null,
        date_approve timestamp,
        observation varchar(160),
        code_response varchar,
        total_amount numeric not null,
        points integer,
        type varchar not null,
        account_id integer not null,
        transaction_stripe varchar,
        constraint check_type check ( type in ('VERIFY_ACCOUNT', 'BUY_POINTS', 'CHANGE_POINTS', 'CHANGE_PLAN')),
        constraint account_id_fk foreign key (account_id) references account(id)
);

create table amount(
   id serial not null primary key,
   points integer not null,
   added_amount numeric not null,
   service_commission numeric not null,
   process_commission numeric not null,
   transaction_id integer not null,
   constraint transaction_fk foreign key (transaction_id) references transaction(id)
);

create table status(
   id serial not null primary key,
   name varchar not null,
   type varchar not null,
   description varchar(160),
   constraint check_type check ( type in ('ACCOUNT', 'TRANSACTION', 'USER'))
);

------- weak tables --------

create table role_privilege(
           id serial not null,
           privilege_id integer not null,
           role_id integer not null,
           primary key (id, privilege_id, role_id),
           constraint privilege_id_fk foreign key (privilege_id) references privilege(id),
           constraint role_id_fk foreign key (role_id) references role(id)
);

create table user_plan(
      id serial not null,
      date_creation timestamp not null,
      user_id integer not null,
      plan_id integer not null,
      primary key (id, user_id, plan_id),
      constraint user_plan_fk foreign key (user_id) references loyalty_user(id),
      constraint plan_id_fk foreign key  (plan_id) references plan(id)
);

create table benefit_plan(
         id serial not null,
         plan_id integer not null,
         benefit_id integer not null,
         primary key (id, plan_id, benefit_id),
         constraint benefit_id_fk foreign key (benefit_id) references benefit(id),
         constraint plan_id_fk foreign key  (plan_id) references plan(id)
);

create table account_status(
           id serial not null,
           date_creation timestamp not null,
           status_id integer not null,
           account_id integer not null,
           primary key (id,status_id,account_id),
           constraint status_id_fk foreign key (status_id) references status(id),
           constraint account_status_fk foreign key  (account_id) references account(id)
);

create table transaction_status(
               id serial not null,
               date_creation timestamp not null,
               status_id integer not null,
               transaction_id integer not null,
               primary key (id, status_id, transaction_id),
               constraint status_transaction_fk foreign key (status_id) references status(id),
               constraint transaction_status foreign key  (transaction_id) references transaction(id)
);

create table user_status(
        id serial not null,
        date_creation timestamp not null,
        user_id integer not null,
        status_id integer not null,
        primary key (id,user_id,status_id),
        constraint user_fk foreign key (user_id) references loyalty_user(id),
        constraint status_fk foreign key  (status_id) references status(id)
);

create table conversion(
       id serial not null primary key,
       unit_a varchar not null,
       unit_b varchar not null,
       an_a_is_so_many_b numeric not null,
       date_creation date,
       constraint unit_a_check check (unit_a in('DOLLAR')),
       constraint unit_B_check check (unit_B in('POINT'))
);

create table commission(
   id serial not null primary key,
   service_charge numeric not null,
   service_transfer numeric not null,
   processor numeric not null,
   date_creation timestamp not null
);

