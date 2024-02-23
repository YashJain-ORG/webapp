#!/bin/bash

echo "sudo yum update"
sudo yum update

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS and NPM                   |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo yum install nodejs npm -y

sudo yum install -y nodejs gcc-c++ make
sudo dnf module -y reset nodejs
sudo dnf module -y enable nodejs:16

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                Install Mysql-server and services             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

sudo yum -y install mysql-server
sudo systemctl start mysqld.service

echo "Starting MySQL Service..."
sudo systemctl start mysqld

echo "Enabling MySQL Services....."
sudo systemctl enable mysqld

echo "Installing npm..."

sudo yum -y install nodejs npm
sudo yum install -y nodejs gcc-c++ make
sudo dnf module -y reset nodejs
sudo dnf module -y enable nodejs:16


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

sudo npm install -y npm@latest

echo "MySQL and npm installation completed."



