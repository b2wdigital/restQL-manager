
export type Query = {
  namespace: string
  name: string
  archived: boolean,
  revisions: {
    text: string,
    archived: boolean,
    revision: number
  }[]
}

export type QueryRevision = {
  namespace: string,
  name: string,
  text: string,
  revision: number,
  archived: boolean,
}

export function lastRevision(revisions: {text: string, revision: number}[]): number {
  return Math.max(...revisions.map(r => r.revision));
}

export function findQueryRevision(namespace: string, queryName: string, revision: string | null, queries: Record<string, Query[]>): QueryRevision | null {
  const namespacedQueries  = queries[namespace];
  if (!namespacedQueries) {
    return null;
  }

  const query = namespacedQueries.find(q => q.name === queryName);
  if (!query) {
    return null;
  }

  const revisionNumber = parseInt(revision || "");
  if (!revisionNumber) {
    return null;
  }

  const chosenRevision = query.revisions.find(r => r.revision === revisionNumber);
  if (!chosenRevision) {
    return null;
  }

  return {
    namespace: namespace,
    name: queryName,
    text: chosenRevision.text,
    revision: chosenRevision.revision,
    archived: chosenRevision.archived,
  }
}

export function findLastQueryRevision(namespace: string, queryName: string, queries: Record<string, Query[]>) {
  const namespacedQueries  = queries[namespace];
  if (!namespacedQueries) {
    return null;
  }

  const query = namespacedQueries.find(q => q.name === queryName);
  if (!query) {
    return null;
  }

  const lastRev = lastRevision(query.revisions);
  const rev = query.revisions.find(r => r.revision === lastRev) as any;

  return {
    namespace: namespace,
    name: queryName,
    text: rev.text,
    revision: rev.revision,
    archived: rev.archived,
  }
}