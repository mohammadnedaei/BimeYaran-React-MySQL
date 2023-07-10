![Screenshot from 2023-07-10 14-59-06](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/b03fcaf8-6f50-4142-83d6-e9480746a4ee)# 🛡️ &middot; [BimeYaran React MySQL](https://github.com/mohammadnedaei/BimeYaran-React-MySQL) &middot;

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mohammadnedaei/Nearby-Locations-React/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/mohammadnedaei/Nearby-Locations-React/fork)

## 🔎 Overview

`BimeYaran-React-MySQL` is a refreshed reboot and clone of `Bime Iran`. Front-End is created with
`React` and modern UI libraries. There is a `dashboard` for users, admins, managers and owner with 
different access grants. Back-End is working with a `NodeJS` server connected to a `MySQL` database.

### This app looks like this:

#### Screenshots may change in the future because of UI/UX changes.

### 🖥️ Desktop view:
![home](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/c281897d-3a9c-4da3-9a44-5b5430fbe634)
![Screenshot from 2023-07-10 14-58-12](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/786b943a-cece-4ac3-ab73-aa8658d7d897)
![Screenshot from 2023-07-10 14-58-18](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/77317a10-ac36-4931-a01e-7d12ac29dd45)
![Screenshot from 2023-07-10 14-58-21](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/02fa2991-9ea0-456e-89f0-c64d7cdb686c)
![Screenshot from 2023-07-10 14-58-24](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/8f990dec-79e6-4512-9355-acb64969775e)
![Screenshot from 2023-07-10 15-04-05](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/5622e49c-1faf-4ac3-ab66-b98ba6ae28d9)
![Screenshot from 2023-07-10 14-59-06](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/ba985cfb-3ace-4582-a778-4a9a91734256)
![Screenshot from 2023-07-10 15-00-22](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/51f651fb-f171-4cc8-911b-5e6488821bf5)
![Uploading Screenshot from 2023-07-10 15-01-08.png…]()
![Uploading Screenshot from 2023-07-10 15-03-19.png…]()
![Uploading Screenshot from 2023-07-10 15-03-51.png…]()
![Uploading Screenshot from 2023-07-10 15-04-13.png…]()

## 👁 Scenarios
🧾 React app is located in `client` directory. React app will run on `localhost:5173` with vite
which makes it completely separated from Back-End. \
🧾 Back-End server runs on `localhost:3001`. \
🧾 A MySQL server must be running on `localhost:3306` which is default MySQL server. \
🧾 `Users` can sign up or login to dashboard, but they are not treated as `Clients` until
they order an insurance package and pass extra information about themselves. \
🧾 Insurance packages in BimeYaran are: Health, Vehicle, Fire. \
🧾 `Clients` can request a `repay` for an active insurance. repays must be accepted by `admins` or `managers`. \
🧾 `Contract` is an activated insurance package that is valid to a date and has a `Transaction`. \
🧾 Each insurance contract will insert into its own unique table. \
🧾 Each insurance contract and `Employee` has a unique `branch` ID.

## 🚀 Usage

Run this commands in **respectively** in your terminal. \
* Make sure that a `MySQL` service is running on port `localhost:3306`
* Run this code in your terminal and enter password for MySQL user (default is root):
```shell
 mysql -u root -p
 
 CREATE DATABASE bime_yaran;

 quit
```
```shell
 git clone https://github.com/mohammadnedaei/BimeYaran-React-MySQL.git

 cd BimeYaran-React-MySQL &&  cd server &&  npm i && nodemon ./index.js 
 ```
* Open new terminal in repository folder and run:
```shell
 cd client && npm i & npm run dev
```
* Run `bime_yaran.sql` SQL dump file with any DB manager like `DataGrip`, `MySQL management`, `HeidiSQL`, `phpMyAdmin` or etc...
* Or you can simply run this code block in MySQL terminal:

```shell
use bime_yaran;

source path_to_sql_file.sql;
```
### Database Diagram Looks like this:
![bime_yaran](https://github.com/mohammadnedaei/BimeYaran-React-MySQL/assets/61457864/7be9e3b5-751a-463f-940d-fee072fa495f)
### 🧰 Libraries and Tools

✅ Tailwind UI \
✅ Material UI
- Material icons

✅ Axios \
✅ React Router \
✅ React Hooks \
✅ MySQL Database
✅ Normalized Database (3NF)
✅ Foreign Keys and Primary Keys Specified
✅ Based on true and online website (Bime Iran)

### 🔧 Contributing

Feel free to fork this repo and make pull requests.
You can learn more about `React` [here](https://reactjs.org/)

### 🎯 TODO

🚧 Code factor & code quality tools improvements \
🔃 Add Shortcuts in manifest \

### 💚 Support

<a href="https://sociabuzz.com/mohammadnedaei/donate" target="_blank"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" height="32px" alt="Sociabuzz"></a>

### ✍🏻 Author

     Mohammad Nedaei

### 📞 Contact

    Discord: Mohammad81#3277
