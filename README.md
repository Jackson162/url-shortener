URL-shortener
===
URL-shortener is a website that allows you to generate short url with your own input url。<br> 

Features
============
1. input a url and get a new url


prerequisites
================

## global packages

1. Node.js: v10.15.0 
2. nodemon: v2.0.6
3. npm: v6.4.1

## local packages

可於專案的 `package.json` 中查閱 `dependencies` 部分。<br> 

## database related

1. mongoDB: v4.2.11
2. Robo 3T: v1.4.2

installation and execution
=======

指令部分可參閱 `package.json` 中查閱 `scripts` 部分。<br> 

1. clone 這個專案，在終端機輸入:
```
git clone https://github.com/Jackson162/url-shortener.git
```
2.  進入專案根目錄，安裝本地套件 (local packages)，在終端機輸入: 
```
npm install
```
3. 確認 mongoDB 執行後，連結 Robo 3T，建立一個資料庫，命名:
```
url-shortener
```
4. 在終端機輸入指令來連結資料庫並新增種子資料:
```
npm run seed
```
5. 啟動伺服器，執行專案:
```
npm run dev
```
6. 打開瀏覽器，搜尋:
```
http://localhost/3000
```
