



data "archive_file" "dotfiles" {
  type        = "zip"
  output_path = "${path.module}/files/dotfiles.zip"
  excludes    = ["${path.module}/unwanted.zip"]

  source_dir = ""
}