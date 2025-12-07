const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const 
        res.status(200).json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload file" });
    }
}

module.exports = {
    uploadMedia
}   