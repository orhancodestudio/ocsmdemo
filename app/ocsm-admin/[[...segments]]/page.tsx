import { redirect } from "next/navigation";
import { OcsmAdmin } from "@orhancodestudio/ocsm-core/admin";
import { getSessionUser } from "@orhancodestudio/ocsm-core/server";
import { ocsm } from "@/lib/ocsm";
import {
  createRoleAction,
  createUserAction,
  deleteDocumentAction,
  deleteRoleAction,
  deleteUserAction,
  saveDocumentAction,
  saveLayoutAction,
  saveThemeAction,
  signOutAction,
  updateRoleAction,
  updateUserAction,
  uploadMediaAction,
} from "../actions";

export default async function OcsmAdminPage({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) {
  const currentUser = await getSessionUser();
  if (!currentUser) redirect("/ocsm-login");

  const { segments } = await params;

  return (
    <OcsmAdmin
      ocsm={ocsm}
      currentUser={currentUser}
      segments={segments}
      actions={{
        saveDocument: saveDocumentAction,
        deleteDocument: deleteDocumentAction,
        createUser: createUserAction,
        updateUser: updateUserAction,
        deleteUser: deleteUserAction,
        createRole: createRoleAction,
        updateRole: updateRoleAction,
        deleteRole: deleteRoleAction,
        uploadMedia: uploadMediaAction,
        saveTheme: saveThemeAction,
        saveLayout: saveLayoutAction,
        signOut: signOutAction,
      }}
    />
  );
}
