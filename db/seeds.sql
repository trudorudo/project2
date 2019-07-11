insert into accounts (firstName, lastName,login, password, email, role)
values ("Adam", "Smith", "login", "password", "kdfla@gmail.com", owner);

insert into accounts (firstName, lastName,login, password, email, role)
values ("John", "Lock", "login1", "password1", "lfja@gmail.com", owner);

insert into accounts (firstName, lastName,login, password, email, role)
values ("Edith", "Piath", "login2", "password2", "skhf@gmail.com", customer);
select * from accounts;




ALTER TABLE  order_details
ADD time TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ;
