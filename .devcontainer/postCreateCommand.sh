#!/bin/sh

# global install
sudo npm i -g nuxi

USERNAME=$(whoami)

# macOS固有設定を削除
sudo cp -r /home/${USERNAME}/.ssh_copy/* /home/${USERNAME}/.ssh
sudo sed -i '/UseKeychain/d' /home/${USERNAME}/.ssh/config
sudo chmod -R 600 /home/${USERNAME}/.ssh
sudo chmod 700 /home/${USERNAME}/.ssh

cd /workspace

# 初回のみ自動で node_modules を取得する
[ ! -d \"node_modules\" ] && sudo chown -R node:node node_modules
npm ci

