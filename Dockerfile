
FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y apache2 && apt-get clean

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

COPY . /var/www/html/

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

