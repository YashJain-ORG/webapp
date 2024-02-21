#!/bin/bash

sudo yum update
sudo yum -y install mysql-server
sudo systemctl start mysqld.service

echo "Starting MySQL Service..."
sudo systemctl start mysqld

echo "Enabling MySQL Service..."
sudo systemctl enable mysqld

echo "Installing npm..."
sudo yum -y install epel-release
sudo yum -y install nodejs npm

echo "Installing unzip..."
sudo yum install -y unzip

# sudo unzip webapp-fork.zip -d ~/webapp-fork
echo "MySQL and npm installation completed."

# Create the user csye6225 with primary group csye6225 and /usr/sbin/nologin shell
sudo groupadd csye6225
sudo useradd -s /usr/sbin/nologin -g csye6225 -m csye6225

