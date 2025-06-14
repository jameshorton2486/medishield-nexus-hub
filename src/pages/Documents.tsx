import DocumentUpload from "@/components/documents/DocumentUpload";

const Documents = () => (
  <div className="max-w-3xl mx-auto mt-6">
    <h2 className="text-2xl font-bold text-primary mb-2">Documents</h2>
    <div className="bg-white shadow-card rounded-lg p-6 border border-gray-100">
      <DocumentUpload />
    </div>
  </div>
);

export default Documents;
