#!/bin/bash

curl \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
    "firstname": "Gates",
    "phone": "+7(918)123-45-67",
    "city_id": 1,
    "email":"elstton@yahoo.com"
}' \
-X PUT \
http://localhost:5000/api/v1/feedback/1 \
| python -mjson.tool