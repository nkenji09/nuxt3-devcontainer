#!/bin/sh

# global install
sudo npm i -g nuxi

# 初回のみ自動で node_modules を取得する
[ ! -d \"node_modules\" ] && sudo chown -R node:node node_modules
npm ci


