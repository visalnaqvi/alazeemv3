import { getAdminPackages, getNavLinks } from "@/services/getData";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AdminPanelCard from "@/components/cards/adminPanelCard/adminPanelCard";
import { updateOrder } from "@/services/updateData";
import { getPackageTags } from "@/services/packageTaxonomy";
import { filterAdminPackagesByTags } from "@/services/packageBlocks";
import PackageTagFilter from "@/components/filters/packageTagFilter/packageTagFilter";

const TAGGABLE_PACKAGE_LISTS = ["hajjUmrah", "iraq", "turkey", "holiday", "hajj"];

const PackagesList = () => {
    const router = useRouter();
    const { packageid } = router.query;
    const [packages, setPackages] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [order, setOrder] = useState([]);

    const fetchData = useCallback(async () => {
        if (packageid == "links") {
            setPackages(await getNavLinks());
            setTags([]);
            return;
        }
        const packageRecords = await getAdminPackages(packageid);
        setPackages(Array.isArray(packageRecords) ? packageRecords : []);

        if (TAGGABLE_PACKAGE_LISTS.includes(packageid)) {
            try {
                setTags(await getPackageTags());
            } catch (error) {
                console.error("Unable to load package tags", error);
                setTags([]);
            }
        } else {
            setTags([]);
        }
    }, [packageid]);

    useEffect(() => {
        setSelectedTagIds([]);
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        var newOrder = []
        packages.forEach((tour) => {
            newOrder.push(tour.id);
        })

        setOrder(newOrder);
    }, [packages]);

    const filteredPackages = filterAdminPackagesByTags(packages, selectedTagIds, tags);

    const onUpClick = async (currentIndex) => {
        if (currentIndex <= 0) {
            return;
        }
        const idAtCurrentIndex = filteredPackages[currentIndex].id;
        const idAtNewIndex = filteredPackages[currentIndex - 1].id;
        const currentOrderIndex = order.indexOf(idAtCurrentIndex);
        const newOrderIndex = order.indexOf(idAtNewIndex);
        await updateOrder(newOrderIndex, idAtCurrentIndex, packageid);
        await updateOrder(currentOrderIndex, idAtNewIndex, packageid);
        fetchData();
    }

    const onDownClick = async (currentIndex) => {
        if (currentIndex >= filteredPackages.length - 1) {
            return;
        }
        const idAtCurrentIndex = filteredPackages[currentIndex].id;
        const idAtNewIndex = filteredPackages[currentIndex + 1].id;
        const currentOrderIndex = order.indexOf(idAtCurrentIndex);
        const newOrderIndex = order.indexOf(idAtNewIndex);
        await updateOrder(newOrderIndex, idAtCurrentIndex, packageid);
        await updateOrder(currentOrderIndex, idAtNewIndex, packageid);
        fetchData();
    }

    return (
        <div className="margin">
            {TAGGABLE_PACKAGE_LISTS.includes(packageid) && tags.length > 0 && (
                <PackageTagFilter
                    tags={tags}
                    selectedTagIds={selectedTagIds}
                    onChange={setSelectedTagIds}
                    resultCount={filteredPackages.length}
                />
            )}
            <div className="body-wrapper justify-start">
                {
                    filteredPackages.map((tour, i) => (
                        <AdminPanelCard onUpClick={onUpClick} onDownClick={onDownClick} key={tour.id || i} index={i} card={tour} packageid={packageid} />
                    ))
                }
                {selectedTagIds.length > 0 && filteredPackages.length === 0 && <p>No packages match the selected tags.</p>}
            </div>
        </div>
    )
}

export default PackagesList;
