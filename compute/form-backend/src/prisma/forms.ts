import { connectDatabase, db } from "./db.ts";
import { seed } from "./seed.ts";

export { db };

/** Every query goes through this: connect once, seed once, then run. */
async function ready(): Promise<void> {
  await connectDatabase();
  await seed();
}

export type Form = {
  id: number;
  name: string;
  slug: string;
  redirectUrl: string | null;
  active: boolean;
  createdAt: Date;
};

export type FormWithCount = Form & { submissionCount: number };

export type Submission = {
  id: number;
  formId: number;
  data: string;
  referrer: string | null;
  createdAt: Date;
};

/** Turn a human form name into a URL-safe slug. */
export function slugify(input: string): string {
  const slug = input
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug.length > 0 ? slug : "form";
}

/** `slugify`, then append `-2`, `-3`, … until the slug is free. */
export async function uniqueSlug(desired: string): Promise<string> {
  await ready();
  const base = slugify(desired);
  let candidate = base;
  for (let suffix = 2; suffix < 1000; suffix += 1) {
    const clash = await db.orm.public.Form.first({ slug: candidate });
    if (!clash) return candidate;
    candidate = `${base}-${suffix}`;
  }
  return `${base}-${Date.now()}`;
}

export async function listForms(): Promise<FormWithCount[]> {
  await ready();
  const rows = await db.orm.public.Form.orderBy((form) => form.createdAt.desc())
    .include("submissions", (submissions) => submissions.count())
    .all();

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    redirectUrl: row.redirectUrl,
    active: row.active,
    createdAt: row.createdAt,
    submissionCount: Number(row.submissions ?? 0),
  }));
}

export async function findFormBySlug(slug: string): Promise<Form | null> {
  await ready();
  return await db.orm.public.Form.first({ slug });
}

export async function findFormById(id: number): Promise<Form | null> {
  await ready();
  return await db.orm.public.Form.first({ id });
}

/** The form shown in the landing page's copy-paste example. */
export async function exampleForm(): Promise<Form | null> {
  await ready();
  return await db.orm.public.Form.where({ active: true })
    .orderBy((form) => form.createdAt.asc())
    .first();
}

export async function createForm(input: {
  name: string;
  slug: string;
  redirectUrl: string | null;
}): Promise<Form> {
  await ready();
  return await db.orm.public.Form.create({
    name: input.name,
    slug: input.slug,
    redirectUrl: input.redirectUrl,
  });
}

export async function setFormActive(id: number, active: boolean): Promise<void> {
  await ready();
  await db.orm.public.Form.where({ id }).update({ active });
}

/** Submissions have no cascade in the contract, so remove them explicitly. */
export async function deleteForm(id: number): Promise<void> {
  await ready();
  await db.orm.public.Submission.where({ formId: id }).deleteAndCount();
  await db.orm.public.Form.where({ id }).delete();
}

export async function createSubmission(input: {
  formId: number;
  data: string;
  referrer: string | null;
}): Promise<void> {
  await ready();
  await db.orm.public.Submission.create({
    formId: input.formId,
    data: input.data,
    referrer: input.referrer,
  });
}

export async function countSubmissions(formId: number): Promise<number> {
  await ready();
  const result = await db.orm.public.Submission.where({ formId }).aggregate((agg) => ({
    total: agg.count(),
  }));
  return Number(result.total ?? 0);
}

export async function listSubmissions(
  formId: number,
  options: { skip: number; take: number },
): Promise<Submission[]> {
  await ready();
  return await db.orm.public.Submission.where({ formId })
    .orderBy([(row) => row.createdAt.desc(), (row) => row.id.desc()])
    .skip(options.skip)
    .take(options.take)
    .all();
}

/** Every submission for a form, oldest first — used by the CSV export. */
export async function allSubmissions(formId: number): Promise<Submission[]> {
  await ready();
  return await db.orm.public.Submission.where({ formId })
    .orderBy([(row) => row.createdAt.asc(), (row) => row.id.asc()])
    .all();
}

export async function deleteSubmission(formId: number, id: number): Promise<void> {
  await ready();
  await db.orm.public.Submission.where({ formId }).where({ id }).delete();
}
