## React-приложение расширяющее функции панели управления Frontol Discount Unit

Стандартный web-интерфейс панели управления [Frontol Discount Unit](https://www.frontol.ru/catalog/frontol-discount-unit/) не имеет никаких аналитических возможностей. Поэтому возникла потребность
сделать небольшое отдельное приложение.

Приложении состоит из нескольких разделов:

- **Рейтинг карт** - подробный список карт упорядоченный по сумме оборотов по карте
  ![Рейтинг карт](https://minio.f-pix.ru/publicbucket/2019-03-10-fdu-artcile/0-001.png)

- **Журнал чеков** - позволяет посмотреть продажи по картам с отбором по периоду и по торговым точкам
  ![Журнал чеков](https://minio.f-pix.ru/publicbucket/2019-03-10-fdu-artcile/0-002.png)

- **Статистика** - общая статистика по заполненности информации о клиентах. А также графики продаж, график списания и начисления бонусов и рейтинг торговых точек по суммам продаж.
  ![Статистика общая по картам](https://minio.f-pix.ru/publicbucket/2019-03-10-fdu-artcile/0-003.png)
  ![Статистика по продажам](https://minio.f-pix.ru/publicbucket/2019-03-10-fdu-artcile/0-004.png)

- **Подозрительные карты** - информация о частоте операций по картам за период по дням
  ![Подозрительно активные карты](https://minio.f-pix.ru/publicbucket/2019-03-10-fdu-artcile/0-005.png)

Данные nodejs-бекенд берет напрямую из базы PostgreSQL. Но для ограничения неавторизованных вызовов API-бекенда используется проверка авториазции пользователя через API FDU-сервера.

### Инструкция по установке и запуску

Мы предполагаем, что FDU-сервер запущен на Ubuntu 16.04 LTS (для 18.04, я уверен, так же отработает)

### Устанавливаем Docker

```
// Update the apt package index:
sudo apt-get update

// Install packages to allow apt to use a repository over HTTPS:
sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 gnupg-agent \
 software-properties-common

// Add Docker’s official GPG key:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

// Use the following command to set up the stable repository.
sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 \$(lsb_release -cs) \
 stable"

// Update the apt package index.
sudo apt-get update

// Install the latest version of Docker CE and containerd
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

### Устанавливаем Docker-compose

```
// Run this command to download the latest version of Docker Compose:
sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-\$(uname -m)" -o /usr/local/bin/docker-compose

// Apply executable permissions to the binary:
sudo chmod +x /usr/local/bin/docker-compose

// Test the installation.
docker-compose --version
```

Создаем на хосте файл `docker-compose.yml`

```
version: '2'

services:
  fdu_reports:
    image: fserg/fdu_reports
    container_name: fdu_reports
    expose:
      - "5001"
    network_mode: host
    environment:
      - NODE_ENV=production
      - PORT=5001
      - PG_URI=postgresql://dbuser:dbpass@127.0.0.1:5432/dbname
      - FDU_URL=https://you.host.ru
      - REACT_APP_FDU_URL=https://you.host.ru
      - VIRTUAL_PORT=5001
      - TZ=Europe/Moscow
    restart: always
```

Меняете dbuser, dbpass, dbname, https://you.host.ru на свои данные.

И запускаете контейнер (сервис) командой:

```
sudo docker-compose up -d
```

Модуль будет доступен по этой ссылке: http://you.host.ru:5001

**Зачем вообще было заморачиваться с Docker'ом?**

Потому что не надо ставить node js и т.п., все это произойдет само внутри контейнера.
Потому что есть планы FDU тоже запустить внутри контейнера и все контейнеры пропускать через реверс-прокси, тогда можно будет автоматизировать получение бесплатного SSL сертификата от Let's Encrypt
