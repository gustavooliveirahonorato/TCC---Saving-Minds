FROM php:8.2-apache

# Instala extensões necessárias do MySQL/MySQLi para o PHP
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copia os arquivos do projeto para a pasta padrão do Apache
COPY . /var/www/html/

# Ajusta a porta padrão do Render
ENV PORT=10000
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

EXPOSE 10000