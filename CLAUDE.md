# AI Assistant Rules (CLAUDE.md)

1. Always read [PROJECT_SPEC.md](./PROJECT_SPEC.md) and [DESIGN_SPEC.md](./DESIGN_SPEC.md) first before making any changes. In visual matters, `DESIGN_SPEC.md` takes precedence.
2. Follow the stage-by-stage workflow in Section 11 of `PROJECT_SPEC.md` and Section 7 of `DESIGN_SPEC.md`.
3. Work ONE stage at a time. After completing the requested stage, stop, summarize all files changed, explain how to run and test, list known limitations, and wait for the owner's "davom et" before starting the next stage.
4. Language rule: All code, variable names, file names, commit messages, and code comments must be in English. All user-facing text must be bilingual (`uz`/`en`). Responses to the owner must be in Uzbek.
5. Never hardcode content that belongs in the database. Never commit secrets.
