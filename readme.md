## React-приложение расширяющее функции панели управления Frontol Discount Unit

Стандартный web-интерфейс панели управления [Frontol Discount Unit](https://www.frontol.ru/catalog/frontol-discount-unit/) не имеет никаких аналитических возможностей. Поэтому возникла потребность
сделать небольшое отдельное приложение.

Приложении состоит из трех разделов:

- **Рейтинг карт** - подробный список карт упорядоченный по сумме оборотов по карте
  ![Рейтинг карт](https://lh3.googleusercontent.com/hTNKs5_RzhN_C-wIZH_qh9OTjkncicClm6Zsi_u_IGCow8TqQDkSCs-p0R_INp5HgvGzlwPC0EEifMmfl7IZEIBrAX5mumyUTCMX_3Znv4BddJnOd8crdweK7Gyc3_l37IYkij6t94Qw0mpo7I-0UgMNH-wdRUatQ59376miqEzUl2jCrV31vNGMo0GoUgQYwcbeOJiE4Hf_Zfx_1OCJ1Avq62H9k5P6DNz5wjALMCDY4_FiVHJifg63YXU94niLP0ZaBmbqPVDkSWlKNR8jQ61FrQl8UwU_yvCeTq6S9dCIVitowQ6nXmyPxHiW8qPHv7mSUA0cMRU7wSDnNBYlAWN7NE-oAM2RrD2riSdPMKfAoD6aXclWLXREIS4HwMN0DoWE8ZDSz-187guXGBweh4lN22kc6grd5Ur5u-Dh-bLoImTx1EaLNoCi-L-ZiGgIHZzB9-Xn9kUltF7JrJZTNwZoZiETaXKihUUH8XNgREBTsEAvHKw67TmtiQqt4npKvvfIQOzR3uaU44SmtmmYJTLrl7fqa6oIxxiOzZsHg1EcYn4zOwCqj5TqmsqWVmaxjxuX2WYTLFgRMmy10Y4qFBHHIlEf8NF84O3lH8sFuRSepQNoGnCRIntXg6JzV0O7xVAdas49EKMWjNoD0oM4uDvEVAxaUiU=w960-h384-no)

- **Журнал чеков** - позволяет посмотреть продажи по картам с отбором по периоду и по торговым точкам
  ![Журнал чеков](https://lh3.googleusercontent.com/uFQozhHCFyRbiuLgJFnsOXUWqnZF-yG8JqqAdm5_orcLykEm__h_xDrTgqNcc2NZJ93SG7tAXsu4kqF-g2y1vHPrKLla3gr3H6HQ6e7sgTYOS_tgjr5HDO52Aw8MbY6TrGeNUMjrH9Mp06Twxb5MVrbXdxU5-CdEGG6R3BCPFX1RM3LvDb_cFn8q0Au7SEPMa1mH8GhAX3BVPKrQUYiEC6fEIm2AgH6Env2HRbbzSGEZxi63_2pLyJckIROGqOyUerwnb5YTPObYYnYpSsezZy8v5jZOrPmuVu1qkrQ6UXpN2I3rYwbgOH6Zt4H9Yix2YKoyBCqLgpisuLkkadkaxukqbPgsAGOPpA_lp_VJMMwqE7pU91TC5FPe76pXv9ihQBMEM-cN0Kl_wdWYk79TuZxnsveei0_K7A4rgaUccCpeV6bk3yrsZfYKrZB6WM2hfiUHKfI1QKZ0XLP59oRljGTuV9gtMPnEUOuMsighVqvhWBcJeN5YmFvme12n50J84Xil3xUssCJTHL1hNFxjiBLTTd1NYlu4aRHOLiTzgrQsJJPokxMmCd1rd19Hn1v0zBd4XMHAQXzDWGpPj1E6IQlLa4YxIvsSEKwl5OfcL_McYnTnopPJ0y9pWY2df_GnuhygzYObVUrcwSFkVUxvK6zloX-EXOM=w958-h386-no)

- **Статистика** - общая статистика по заполненности информации о клиентах. А также графики продаж, график списания и начисления бонусов и рейтинг торговых точек по суммам продаж.
  ![Статистика общая по картам](https://lh3.googleusercontent.com/f6ZpFP1feK5jJEmYeK5_YgUc9yJRx-dOR-daUuhqOgffVvzHb-TBG-srufXelP6H47JDl1hLdgaSi1Cy0UnxaIJeHr0T3wZonRgiP0OcTtEmvT6LQ1UOcnDQH_YAWRXbd5221cSKYUqfLZBhNsBsYnvAD2lEvhyCUy19StcgDw53qusfhqGLv-wrqXF56k_NehmzXuZIdF3CjrTu0MKnnxt_jWWJ2ahozeSF7UOFKAnKYQ0ehWM7VBBjK_rhv3zcLOrlseW5QoiqWj6aUKU4v-jIM97i0TB8KfZpAlYfIG-qmgBuqdPEXaYWhoMjqU7lZrF1jhjgh_ginK122IuytsEcBr8JesSy2R0m3NvAh9te5SVDrCh86VYGs_v4ifPUNZ31-mSQzE8RCtYAvMloyrFSCxXV4D9H3SkpZxUaoq_F_1HEBQAQjfGzITHY0iPO2iiROhvjZoFtbgolsQbO94qBZu5sdB6dckc3NogMCxS_tlPnTGo7KlXLvxV7eN2Cjt2dtjNxGQzp2sOSU7mhpDO7OFiiKki-XLFLHMPAmKVLKHWqissAH-aH5MyyDWusbFVivEJbuvwaGxkHtwjbaigAe5ssiTFrzjPNTinaq5rkA11NwjYOXLzvyHgtk0NvWmK4zyBKD7fXJv_FpkrNaeJ_WpkFNzuhTmu5-aopzavdXUpo1ICmvSbpT8WPfg5iFTzs_nhaagYEjO-WxLz4N1nZ=w946-h374-no)
  ![Статистика по продажам](https://lh3.googleusercontent.com/OgUnhSRQtk9rqYYad-8AHcCKWGZ1mYk4Mgr1Vha3KlD27MAbFxa6sGUOMggva1_S1aPWI_kSjXQDROBEZREFxAQ0yQZaK8pLUdPNh_JXFUi-0WFNJo3gPESVbLraqqAlywUIlI1fxcgjZugnuc5t0rtXYdk8RoTEeZqXoyjwaiW_0qouzruoKr8E3f8KXtuMQ-vH0uyxaVajO3ZA9zabOTY1Ohfte43HlymkCzZdODpunD5nvWA5hKwF-fd4Lz-daUKNu3wgQYyICanlxaQdsoKzqENWhhzxSCecZ-QRiH9_FWmgFoFPHxUoX7C80wBxwyKLZ25Qbgu0DLYWrIpWinPKnPazjoQlfnQSlGFmECgU8cZj8n6uQmgXLL-xT3opwhYX2-eIMwtORwRO0MtNUiFxfED8Bzvd8zsg33wySqu9AWX49X6Rjg1lovlziGyI5RKbUt9iOvT7Fj3BSGzcZpPZbsuC6XHfRJjmxD5VepgMdy-pAuodasAyGHw15GNfkMDU91BAwajx8wwPfsJxJqRzdHJBbUFca9TmvkXCqBshPsz5we-7KAE2Aecx3LjZDG6zcYKASZSyjgn3lAdqhKCGj2b2vedC9MknPiuCGAn9r8J0XiEy0ZpNYFPe_vLTpN0E14T0pT2si0FGr2RJ-y-NCmVb4an5bmJgRoeC5yNcytf4ehAQ5ZXVHr712ULwIPbIg9O_MQOaYv6n7ypF78un=w946-h1084-no)

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
