FROM node:10

RUN apt-get update && apt-get -y install cron

RUN mkdir /app

WORKDIR /app

ADD . /app
ADD crontab /etc/cron.d/script-cron

RUN yarn

RUN chmod +x /etc/cron.d/script-cron
RUN crontab /etc/cron.d/script-cron
RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log