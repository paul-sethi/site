#!/bin/bash

NAME="main"                                  # Name of the application
DJANGODIR=/home/web/main             # Django project directory
SOCKFILE=/run/gunicorn.sock  # we will communicate using this unix socket
USER=web                                        # the user to run as
GROUP=webserver                                     # the group to run as
NUM_WORKERS=3                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=main.settings             # which settings file should Django use
DJANGO_WSGI_MODULE=main.wsgi                     # WSGI module name
PIDFILE=/run/gunicorn.pid

echo "Starting $NAME as `whoami`"


cd $DJANGODIR
# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=- \
  --pid $PIDFILE
