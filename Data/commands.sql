-- SQLite
create table if not exists signup_form (ID_ integer primary key, 
                                        username not null unique, password not null unique);

