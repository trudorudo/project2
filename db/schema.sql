drop database if exists fast_restaurant;
create  database fast_restaurant;
use fast_restaurant;

create table accounts (
user_id INT NOT NULL AUTO_INCREMENT,
firstName varchar(50) not null,
lastName varchar(50) not null,
login varchar(50) not null,
password varchar(50) not null,
email varchar(50) null,
role varchar(50) null,
primary key (user_id)
);


insert into accounts (firstName, lastName,login, password, email, role)
values ("Adam", "Smith", "login", "password", "kdfla@gmail.com", "owner");

insert into accounts (firstName, lastName,login, password, email, role)
values ("John", "Lock", "login1", "password1", "lfja@gmail.com", "owner");

insert into accounts (firstName, lastName,login, password, email, role)
values ("Edith", "Piath", "login2", "password2", "skhf@gmail.com", "customer");
select * from accounts;

create table menu_items (
  item_id INT NOT NULL AUTO_INCREMENT,
  restaurant_id varchar(100) not null,
  item_name varchar(50) not null,
   price decimal(10.3) not null,
    ingredients varchar(255) not null,
     category varchar(200) not null,
    image_url varchar(255) not null,
   
   primary key (item_id)

 );
 select * from menu_items;

 create table restaurants (
 restaurant_id INT NOT NULL AUTO_INCREMENT,
  restaurant_name varchar(50) not null,
 location varchar(255) not null,
 email varchar(50) not null,
 phone_number varchar(50) not null,
  owner_id int not null,
  image_url varchar(255) not null,
  primary key (restaurant_id)
 );
  select * from restaurants;