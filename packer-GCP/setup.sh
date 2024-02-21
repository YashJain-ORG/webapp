#!/bin/bash
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS and NPM                   |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
echo "sudo yum update"
sudo yum update


echo "Node and npm"
sudo yum install nodejs npm -y

sudo yum -y install mysql-server
sudo systemctl start mysqld.service

echo "Starting MySQL Service..."
sudo systemctl start mysqld

echo "Enabling MySQL Service..."
sudo systemctl enable mysqld

echo "Installing npm..."
# sudo yum -y install epel-release
sudo yum -y install nodejs npm

echo "creating user and group"
sudo groupadd csye6225
sudo useradd -g csye6225 -d /opt/csye6225 -s /usr/sbin/nologin csye6225

echo "Installing unzip..."
sudo yum install -y unzip

echo "check webapp in home directory"
ls
echo "cp webapp to user home directory"
sudo cp -r  webapp.zip /opt/csye6225
cd /opt/csye6225
echo "unzip in opt/csye6225"
sudo unzip webapp.zip

# sudo unzip webapp-fork.zip -d ~/webapp-fork
echo "MySQL and npm installation completed."



