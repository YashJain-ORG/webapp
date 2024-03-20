sudo curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
sudo chmod 755 /etc/google-cloud-ops-agent/
sudo mv /opt/csye6225/webapp/packer-GCP/ops-config.yaml /etc/google-cloud-ops-agent/config.yaml
sudo chmod 755 /etc/google-cloud-ops-agent/config.yaml
sudo touch /var/log/webapplog/myapp.log
sudo chown csye6225:csye6225 /var/log/webapplog/myapp.log
sudo chmod 755 /var/log/webapplog/myapp.log
# /var/log/webapplog/myapp.log


