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
  ssh_username        = "packer"
  // zone                = "us-central1-a"
  zone                = "us-east1-b"
  image_name          = "my-custom-image"

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

  provisioner "shell" {
    script = "packer-GCP/systemD.sh"
  }

  provisioner "shell" {
    script = "packer-GCP/install_ops_agent.sh"
  }
}