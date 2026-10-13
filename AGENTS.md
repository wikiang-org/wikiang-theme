# Wikiang theme repository

- Wikiang is an independently presented service operated by WIKIANG LLC. Do not add Damoang affiliate/community branding or promotional navigation.
- /home/angple is a production host. Never run build/test/lint/typecheck/dev/browser commands there. Read/edit/git/gh and explicit-file formatting only. Validate in GitHub Actions.
- Keep renderer API compatibility explicit in skin-package.json. No data access or authentication logic belongs in skins.
- Merge only through /home/angple/triage/tools/safe_merge.sh after CI passes.
- Core integration also requires all-document, editor and four-skin browser QA before deployment.
