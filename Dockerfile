FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get upgrade -y \
    && apt-get install -y apache2 python3 python3-pip libapache2-mod-wsgi-py3 \
    && apt-get clean

RUN mkdir -p /var/www/html/ATI
COPY . /var/www/html/ATI

COPY dockerfile-conf/ati_wsgi.conf /etc/apache2/conf-available/
RUN a2enconf ati_wsgi

RUN apt-get install -y python3-venv
RUN python3 -m venv /home/apps/web_env
RUN . /home/apps/web_env/bin/activate && pip install beaker-py --break-system-packages

EXPOSE 80

CMD ["apache2ctl", "-D", "FOREGROUND"]
