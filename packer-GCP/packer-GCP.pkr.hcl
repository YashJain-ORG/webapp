packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "> 1"
    }
  }
}

source "googlecompute" "example" {
  project_id          = "assignment-04-414723"
  source_image_family = "centos-stream-8"
  image_name          = "packer-image"
  ssh_username        = "packer"
  zone                = "us-central1-a"
  // network     = "default"
  // subnetwork   = "default-subnet"
  // account_file = "packer-svc.json"
}

build {
  sources = ["googlecompute.example"]
  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/webapp.zip"
  }

  provisioner "shell" {
    script = "packer-GCP/setup.sh"
  }
}