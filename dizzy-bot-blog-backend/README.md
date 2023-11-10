# Branch naming:
- DZB-[date string]-purpose-of-branch. E.g., DZB-11112023-init-project
### Commit format:
- Just describe what has been done (all lower case).
# Update:
- H2 database is in use for development environment, change to other database for product environment.
# Trouble shooting:
- if find `net start mysql` does not start mysql server, press `win+R` to open `services.msc`, check if the mysql service name is called `mysql80`, then start mysql service using `net start mysql80`.
- if this still not working, reinstall mysql by go to mysql folder `D:\mysql\mysql-xxx\mysql-xxx\bin` then use `mysqld.exe --install` and `mysqld.exe --initialize` to reinstall mysql service. (remember to delete `data` folder if it exits in `D:\mysql\mysql-xxx\mysql-xxx` before installation).