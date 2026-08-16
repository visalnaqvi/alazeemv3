import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getDefaultVersion } from "@/config/pageRegistry";
import { getAdminPage, getPublicPage } from "@/services/pages";
import { checkStorageForAdminToken } from "@/services/auth";
import PageRenderer from "./PageRenderer";

export default function ManagedExistingPage({ definition, initialPage, children }) {
    const router = useRouter();
    const defaultPage = useMemo(() => initialPage || ({ ...definition, version: getDefaultVersion(definition) }), [definition, initialPage]);
    const [page, setPage] = useState(defaultPage);

    useEffect(() => {
        let active = true;
        const load = async () => {
            try {
                const wantsPreview = router.query.pagePreview === definition.pageKey && checkStorageForAdminToken();
                const result = wantsPreview ? await getAdminPage(definition.pageKey) : await getPublicPage(definition.pageKey);
                if (!active || !result) return;
                setPage(wantsPreview ? { ...result, version: result.draft } : result);
            } catch (error) {
                console.error("Unable to load managed page", error);
            }
        };
        load();
        return () => { active = false; };
    }, [definition.pageKey, router.query.pagePreview]);

    return <PageRenderer page={page} version={page.version} systemComponents={{ "legacy-page": () => children }} />;
}
