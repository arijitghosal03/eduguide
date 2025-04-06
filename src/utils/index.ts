export const cleanFirebaseError = (message: string) => {
  return message
    .replace(/^Firebase:\s*/i, "") // Remove "Firebase: " prefix
    .replace(/\s*\(.*?\)\s*$/, "") // Remove anything in the last parentheses
    .trim(); // Clean up extra spaces
};
