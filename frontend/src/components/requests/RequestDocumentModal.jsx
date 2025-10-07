
export default function RequestDocumentModal({ fileUrl, fileType, onClose }) {
  if (!fileUrl) return null;

  const isImage = fileType?.startsWith?.("image/") || /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileUrl);
  console.log("isImage:", isImage, "fileType:", fileType, "fileUrl:", fileUrl);
  const isPdf = fileType === "application/pdf" || /\.pdf$/i.test(fileUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Document Preview</h3>
          <button onClick={onClose} className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200">Close</button>
        </div>

        <div className="flex justify-center items-center">
          {isImage ? (
            // image preview
            <img src={fileUrl} alt="document" className="max-h-[80vh] object-contain" />
          ) : isPdf ? (
            // pdf preview (works for many browsers)
            <iframe src={fileUrl} title="pdf" className="w-full h-[80vh] border" />
          ) : (
            // fallback: show link and mime
            <div className="text-center">
              <p className="mb-2">No preview available for this file type.</p>
              <a href={fileUrl} target="_blank" rel="noreferrer" className="underline">
                Open file in new tab
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
