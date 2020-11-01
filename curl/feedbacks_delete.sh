#!/bin/bash

curl \
-H 'Accept: application/json' \
-X DELETE \
http://localhost:5000/api/v1/feedback/1 \
| python -mjson.tool
