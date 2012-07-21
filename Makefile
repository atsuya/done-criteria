REPORTER = nyan
TESTS = $(shell find test -name "*.test.js" -type f)

all: test-all

test-all:
	NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

one:
	NODE_ENV=test ./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		${FILE}

.PHONY: test-all one
