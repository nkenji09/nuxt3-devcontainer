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

# もし .env.development がなければ作成する
if [ ! -f ".env.development" ]; then
  echo ".env.development does not exist, copying..."
  cp .env.development.sample .env.development
else
  echo ".env.development exists."
fi
