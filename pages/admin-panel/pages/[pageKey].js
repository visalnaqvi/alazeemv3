import { useRouter } from "next/router";
import PageEditor from "@/components/pageBuilder/PageEditor";

export default function EditManagedPage() {
    const router = useRouter();
    return router.query.pageKey ? <PageEditor pageKey={router.query.pageKey} /> : null;
}
