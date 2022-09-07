/**
 * Check commit message and return true to cancel buikd
 * false to proceed
 * @returns boolean
 */
function abortBuild() {
  const msg = process.env.VERCEL_GIT_COMMIT_MESSAGE;

  // If [build] or is a merge to develop/master then build it
  if (
    msg.includes('[build]')
  ) {
    return false;
  }

  return true;
}

if (abortBuild()) {
  process.exit(0);
}
process.exit(1);
