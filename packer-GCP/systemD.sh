#!/bin/bash
sudo chown -R csye6225:csye6225 /opt/csye6225/webapp
sudo mkdir /var/log/csye6225
sudo chown csye6225:csye6225 /var/log/csye6225
sudo -u csye6225 bash
cd /opt/csye6225/webapp
sudo cp csye6225.service /etc/systemd/system/
sudo chown csye6225:csye6225 /etc/systemd/system/csye6225.service
sudo systemctl daemon-reload
sudo systemctl start csye6225
sudo systemctl enable csye6225
sudo systemctl disable csye6225
sudo systemctl enable csye6225