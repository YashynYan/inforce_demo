#!/bin/bash

curl \
-H 'Accept: application/json' \
-X GET \
http://localhost:5000/api/v1/region \
| python -mjson.tool
