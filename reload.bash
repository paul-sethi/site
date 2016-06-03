#!/bin/bash

cd /home/web/main/
git pull
kill -HUP $(<"/run/gunicorn.pid")
sudo service nginx reload
