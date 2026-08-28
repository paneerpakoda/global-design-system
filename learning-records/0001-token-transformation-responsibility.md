# The design-system pipeline owns token transformation

The user correctly identified that the design-system build pipeline—not each production application—is responsible for converting shared token definitions into platform-specific outputs such as CSS/TypeScript for React and Dart for Flutter. This establishes the source-to-platform boundary needed before learning package distribution and application consumption.
