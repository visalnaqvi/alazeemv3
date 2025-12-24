import Toast from "@/components/notification/toast"
import { useEffect, useState } from "react"
import styles from "./navLinks.module.css"
import { addNewPackage, updateNavLink, updateOrder, updatePackageData, updatePageSetting } from "@/services/updateData";
import { getAvailableSections } from "@/services/getData";
import { deletePackage } from "@/services/deleteData";
import { CATEGORIES } from "@/config/categories";

const NavLinksForm = ({details}) => {
    const [toastMessage, setToastMessage] = useState({msg: ""});
    const [sections, setSections] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        order: 0,
        categories: []
    });
    
    

    useEffect(() => {
        getSections();
    }, [details]);

    const getSections = async () => {
        setSections(await getAvailableSections());
    };

    const onClose = () => {
        setToastMessage({ msg: "" });
    };

    const handleAddNewSection = async (e) => {
        e.preventDefault();
        const msg = await addNewPackage({
            title: "New Section",
            order: sections.length + 1,
            categories: []
        }, "sections");
        await getSections();
        setToastMessage(msg);
    };

    const handleEditClick = (section) => {
        setEditingId(section.id);
        setFormData({
            title: section.title,
            order: section.order,
            categories: section.categories || []
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ title: "", order: 0, categories: [] });
    };

    const handleCategoryToggle = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
    };

    const handleSaveSection = async (e, sectionId) => {
        e.preventDefault();
        const msg = await updatePackageData({
            title: formData.title,
            order: formData.order,
            categories: formData.categories,
            id: sectionId
        }, "sections");
        
        setToastMessage(msg);
        await getSections();
        handleCancelEdit();
    };

    const handleDeleteSection = async (e, sectionId) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this section?")) {
            const msg = await deletePackage(sectionId, "sections");
            await getSections();
            setToastMessage(msg);
        }
    };

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        const msg = await updateNavLink(sections, "links");
        setToastMessage(msg);
    };

    // Render sections management
    if (details.id === "hajjUmrahSetting") {
        return (
            <div className="body-wrapper">
                {toastMessage.msg && <Toast onClose={onClose} type={toastMessage.status} message={toastMessage.msg} />}
                
                <div className={styles.wrapper}>
                    <button className="primary-btn blue" onClick={handleAddNewSection}>
                        Add New Section
                    </button>
                    
                    {Array.isArray(sections) && sections.map((section, index) => {
                        const isEditing = editingId === section.id;
                        
                        return (
                            <form key={section.id} style={{backgroundColor: "#eeeeee", padding: "20px", margin: "20px 0"}}>
                                <p><strong>Section {index + 1}</strong></p>
                                
                                {/* Title Input */}
                                <div className={styles.formItem}>
                                    <label className={styles.label} htmlFor={`title-${section.id}`}>Title</label>
                                    <input 
                                        disabled={!isEditing}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className={styles.input}
                                        type="text"
                                        id={`title-${section.id}`}
                                        value={isEditing ? formData.title : section.title}
                                        placeholder="Enter Title"
                                    />
                                </div>
                                
                                {/* Order Input */}
                                <div className={styles.formItem}>
                                    <label className={styles.label} htmlFor={`order-${section.id}`}>Order</label>
                                    <input 
                                        disabled={!isEditing}
                                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                                        className={styles.input}
                                        type="number"
                                        id={`order-${section.id}`}
                                        value={isEditing ? formData.order : section.order}
                                        placeholder="Enter Order"
                                    />
                                </div>
                                
                                {/* Categories Multi-Select */}
                                <div className={styles.formItem}>
                                    <label className={styles.label}>Categories</label>
                                    <div style={{display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px"}}>
                                        {CATEGORIES.map(category => {
                                            const selectedCategories = isEditing ? formData.categories : (section.categories || []);
                                            const isSelected = selectedCategories.includes(category);
                                            
                                            return (
                                                <label 
                                                    key={category}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "5px",
                                                        padding: "8px 12px",
                                                        backgroundColor: isSelected ? "#4CAF50" : "#fff",
                                                        color: isSelected ? "#fff" : "#000",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                        cursor: isEditing ? "pointer" : "default",
                                                        opacity: isEditing ? 1 : 0.7
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        disabled={!isEditing}
                                                        checked={isSelected}
                                                        onChange={() => handleCategoryToggle(category)}
                                                        style={{cursor: isEditing ? "pointer" : "default"}}
                                                    />
                                                    <span style={{textTransform: "capitalize"}}>{category}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                {/* Action Buttons */}
                                <div style={{marginTop: "15px", display: "flex", gap: "10px"}}>
                                    {isEditing ? (
                                        <>
                                            <button 
                                                className="primary-btn blue"
                                                onClick={(e) => handleSaveSection(e, section.id)}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="primary-btn red"
                                                onClick={(e) => handleDeleteSection(e, section.id)}
                                            >
                                                Delete
                                            </button>
                                            <button 
                                                className="primary-btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCancelEdit();
                                                }}
                                                style={{backgroundColor: "#757575"}}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            className="primary-btn green"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleEditClick(section);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </form>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Render regular nav links form
    return (
        <div className="body-wrapper">
            {toastMessage.msg && <Toast onClose={onClose} type={toastMessage.status} message={toastMessage.msg} />}
            
            <div className={styles.wrapper}>
                <form>
                    <div className={styles.formItem}>
                        <label className={styles.label} htmlFor="title">Link Title</label>
                        <input 
                            onChange={(e) => setSections({...sections, title: e.target.value})}
                            className={styles.input}
                            type="text"
                            id="title"
                            value={sections.title || ""}
                            placeholder="Enter Package Title"
                        />
                    </div>
                    
                    <div className="body-wrapper justify-start">
                        <div className={styles.formItem}>
                            <label className={styles.label} htmlFor="active-true">Active</label>
                            <input 
                                defaultChecked={details.active}
                                onChange={() => setSections({...sections, active: true})}
                                className={styles.input}
                                type="radio"
                                id="active-true"
                                name="status"
                            />
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.label} htmlFor="active-false">Inactive</label>
                            <input 
                                defaultChecked={!details.active}
                                onChange={() => setSections({...sections, active: false})}
                                className={styles.input}
                                type="radio"
                                id="active-false"
                                name="status"
                            />
                        </div>
                    </div>
                    
                    <button className="primary-btn blue" onClick={handleLinkSubmit}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NavLinksForm;