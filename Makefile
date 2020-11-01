export CONTAINER := api
include local.sh

all: help

# target: help - Display callable targets.
help:
	@egrep "^# target:" [Mm]akefile
		

# target: shell - shell service
.PHONY: shell
shell:
	@docker-compose \
		-p $(PROJECT) \
		-f shell.yml \
		run --rm --service-ports $(CONTAINER)
