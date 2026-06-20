"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  type Block,
  deleteDocument,
  destroySession,
  type LayoutRegion,
  type OcsmTheme,
  requirePermission,
  writeDocument,
} from "@orhancodestudio/ocsm-core/server";
import type {
  ActionResult,
  CreateUserActionInput,
  RoleActionInput,
  SaveDocumentInput,
  UpdateUserActionInput,
  UploadMediaResult,
} from "@orhancodestudio/ocsm-core/admin";
import { ocsm } from "@/lib/ocsm";

function fail(error: unknown): ActionResult {
  return {
    ok: false,
    message: error instanceof Error ? error.message : "Bilinmeyen hata",
  };
}

export async function saveDocumentAction(
  input: SaveDocumentInput,
): Promise<ActionResult> {
  try {
    await requirePermission("content:write");
    await writeDocument(ocsm, input);
    revalidatePath("/", "layout");
    return { ok: true, message: "Yayınlandı" };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteDocumentAction(
  collection: string,
  slug: string,
): Promise<ActionResult> {
  try {
    await requirePermission("content:delete");
    await deleteDocument(ocsm, collection, slug);
    revalidatePath("/", "layout");
    return { ok: true, message: "Silindi" };
  } catch (error) {
    return fail(error);
  }
}

export async function createUserAction(
  input: CreateUserActionInput,
): Promise<ActionResult> {
  try {
    await requirePermission("users:manage");
    await ocsm.users.create(input);
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteUserAction(id: string): Promise<ActionResult> {
  try {
    await requirePermission("users:manage");
    await ocsm.users.remove(id);
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function updateUserAction(
  input: UpdateUserActionInput,
): Promise<ActionResult> {
  try {
    await requirePermission("users:manage");
    await ocsm.users.update(input.id, {
      name: input.name,
      role: input.role,
      password: input.password,
    });
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function createRoleAction(
  input: RoleActionInput,
): Promise<ActionResult> {
  try {
    await requirePermission("settings:manage");
    await ocsm.roles.create(input);
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function updateRoleAction(
  id: string,
  input: RoleActionInput,
): Promise<ActionResult> {
  try {
    await requirePermission("settings:manage");
    await ocsm.roles.update(id, input);
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function deleteRoleAction(id: string): Promise<ActionResult> {
  try {
    await requirePermission("settings:manage");
    const assigned = await ocsm.users.assignedRoleIds();
    await ocsm.roles.remove(id, assigned);
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function saveThemeAction(theme: OcsmTheme): Promise<ActionResult> {
  try {
    await requirePermission("settings:manage");
    await ocsm.theme.save(theme);
    revalidatePath("/", "layout");
    revalidatePath("/ocsm-admin", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function saveLayoutAction(
  region: LayoutRegion,
  blocks: Block[],
): Promise<ActionResult> {
  try {
    await requirePermission("content:write");
    await ocsm.layout.save(region, blocks);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return fail(error);
  }
}

export async function uploadMediaAction(
  form: FormData,
): Promise<UploadMediaResult> {
  try {
    await requirePermission("content:write");
    const file = form.get("file");
    if (!(file instanceof File)) {
      return { ok: false, message: "Dosya bulunamadı" };
    }
    const data = Buffer.from(await file.arrayBuffer());
    const stored = await ocsm.media.save({
      data,
      mime: file.type,
      originalName: file.name,
    });
    return { ok: true, url: stored.url };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Yükleme başarısız",
    };
  }
}

export async function signOutAction(): Promise<void> {
  await destroySession();
  redirect("/ocsm-login");
}
