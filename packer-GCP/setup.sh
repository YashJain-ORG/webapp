#!/bin/bash

echo "sudo yum update"
sudo yum update

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS and NPM                   |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo yum install nodejs npm -y

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                Install mysql-server and services             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

sudo yum -y install mysql-server
sudo systemctl start mysqld.service

echo "Starting MySQL Service..."
sudo systemctl start mysqld

echo "Enabling MySQL Service..."
sudo systemctl enable mysqld

echo "Installing npm..."
sudo yum -y install nodejs npm


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                creating user and groups                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "creating user and group"
sudo groupadd csye6225
sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225
sudo chmod o+rx /opt/csye6225
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                Installing unzipp...                          |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "Installing unzip..."
sudo yum install -y unzip

# sudo -u csye6225 bash

echo "check webapp in home directory"
ls
echo "cp webapp to user home directory"

sudo cp -r  webapp.zip /opt/csye6225

cd /opt/csye6225
echo "unzip in opt/csye6225"
sudo unzip webapp.zip

echo "----Checking if the file exists----"
ls 

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install Node Modules                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "cd to webapp to install node modules"
cd /opt/csye6225/webapp

sudo npm install npm@latest

echo "MySQL and npm installation completed."



