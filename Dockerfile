FROM ruby:2.6.3-slim

USER root

RUN apt-get update -qq && apt-get install -y \
   build-essential libpq-dev libxml2-dev libxslt1-dev imagemagick apt-transport-https curl nano sudo libvips libvips-dev

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
 && apt-get install -y nodejs

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
 && apt-get update -qq \
 && apt-get install -y yarn

ENV APP_USER app
ENV APP_USER_HOME /home/$APP_USER
ENV APP_HOME /home/www/very_clean

RUN useradd -m -d $APP_USER_HOME $APP_USER

RUN mkdir /var/www && \
    chown -R $APP_USER:$APP_USER /var/www && \
    chown -R $APP_USER $APP_USER_HOME

WORKDIR $APP_HOME

USER $APP_USER

COPY . .

USER root

RUN chown -R $APP_USER:$APP_USER "$APP_HOME/."

USER $APP_USER

CMD bundle exec puma -C config/puma.rb
