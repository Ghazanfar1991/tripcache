export function codexExecArgs({ repoRoot, outputPath, prompt }) {
  return [
    "exec",
    "-C", repoRoot,
    "--approve-for-me",
    "-o", outputPath,
    prompt,
  ]
}

export function selectJobs({ jobs, state, now, requestedJobId }) {
  if (requestedJobId) {
    const requested = jobs.find((job) => job.id === requestedJobId)
    if (!requested) throw new Error(`Unknown growth job: ${requestedJobId}`)
    return [requested]
  }

  return jobs.filter((job) => new Date(state.jobs?.[job.id]?.nextDueAt || job.nextDueAt) <= now)
}
