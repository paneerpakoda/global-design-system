# Generation turns source changes into platform output

The user correctly identified that after a shared token changes, the generator must run before updated Flutter or other platform files exist. Future teaching can treat generation as distinct from validation: generation creates output, while tests only verify it.
