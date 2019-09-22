#!/bin/bash
# Interpreter identifier

# Exit on fail
set -e

rm -f $APP_HOME/tmp/pids/server.pid
rm -f $APP_HOME/tmp/pids/sidekiq.pid

bundle install
yarn install --check-files

bundle exec rake db:create
bundle exec rake db:migrate

bundle exec rails assets:precompile

exec "$@"
