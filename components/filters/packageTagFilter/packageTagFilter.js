import styles from "./packageTagFilter.module.css";

const PackageTagFilter = ({ tags, selectedTagIds, onChange, resultCount }) => {
    const selectedIds = Array.isArray(selectedTagIds) ? selectedTagIds : [];

    const toggleTag = tagId => {
        onChange(selectedIds.includes(tagId)
            ? selectedIds.filter(id => id !== tagId)
            : [...selectedIds, tagId]);
    };

    return (
        <fieldset className={styles.filter}>
            <legend>Filter packages by tag</legend>
            <div className={styles.options}>
                <label className={`${styles.option} ${selectedIds.length === 0 ? styles.selected : ""}`}>
                    <input
                        type="checkbox"
                        checked={selectedIds.length === 0}
                        onChange={() => onChange([])}
                    />
                    <span>All</span>
                </label>
                {tags.map(tag => (
                    <label key={tag.id} className={`${styles.option} ${selectedIds.includes(tag.id) ? styles.selected : ""}`}>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(tag.id)}
                            onChange={() => toggleTag(tag.id)}
                        />
                        <span>{tag.label}</span>
                    </label>
                ))}
            </div>
            <p className={styles.count} aria-live="polite">
                {resultCount} {resultCount === 1 ? "package" : "packages"} shown
            </p>
        </fieldset>
    );
};

export default PackageTagFilter;
