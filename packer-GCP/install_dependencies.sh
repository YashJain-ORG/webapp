#!/bin/bash

sudo yum update
sudo yum -y install @mysql
sudo systemctl -y start mysqld.service


# echo "Starting MySQL Service..."
sudo systemctl start mysqld

# echo "Enabling MySQL Service..."
sudo systemctl enable mysqld

echo "Installing npm..."
sudo yum -y install epel-release
sudo yum -y install nodejs npm

sudo yum install -y unzip

# sudo unzip webapp-fork.zip -d ~/webapp-fork
echo "MySQL and npm installation completed."