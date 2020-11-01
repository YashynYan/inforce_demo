#!/bin/bash

curl \
-H 'Accept: application/json' \
-X GET \
http://localhost:5000/api/v1/city/region/1 \
| python -mjson.tool
