#!/usr/bin/env bash

pip install -r requirements.txt
python project/manage.py collectstatic --noinput
python project/manage.py migrate