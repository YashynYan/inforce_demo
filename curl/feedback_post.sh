#!/bin/bash

curl \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
    "firstname": "Иванов",
    "lastname": "Иван",
    "midname": "Иваныч",
    "city_id": 1,
    "phone": "+7(918)123-45-67",
    "email":"elstton@yahoo.com",
    "comment": "Вже давно відомо, що читабельний зміст буде заважати зосередитись людині, яка оцінює композицію сторінки."
}' \
-X POST \
http://localhost:5000/api/v1/feedback \
| python -mjson.tool