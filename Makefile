.PHONY: validate demo test build

validate:
	bash scripts/validate-repo.sh

demo:
	bash scripts/run-demo.sh

test:
	pnpm test

build:
	pnpm build
