# Architecture rules

- Board Papers stores optional human-authored summaries in the existing content JSON and shares one AtAGlancePanel across editing and read-only pack views, so autosave and issue freezing remain unchanged and older snapshots render without an empty panel.
- Board Papers stores optional challenge questions in content JSON and shares ChallengeQuestionsPanel across editing and read-only pack views, using the existing summary-panel tokens and print rules so autosave, freezing and older snapshots remain compatible.