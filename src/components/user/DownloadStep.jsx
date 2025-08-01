import { toast } from "react-hot-toast";

const DownloadStep = ({ docType, rollNo, downloadUrl, filename, reset }) => {
  const handleDownload = async () => {
    try {
      // Ensure the download URL is absolute
      const backendUrl = downloadUrl.startsWith('http') ? downloadUrl : `http://localhost:8000${downloadUrl}`;
      const res = await fetch(backendUrl, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        toast.error('Failed to download file');
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(async () => {
        await fetch(`http://localhost:8000/api/files/delete/${filename}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        reset();
      }, 3000);
    } catch (err) {
      console.error('❌ Download error:', err);
      toast.error('Download failed. Please try again.');
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-6 text-center">
      <h2 className="text-2xl font-semibold text-green-600">Document Ready</h2>
      <p className="text-gray-700">
        Your <span className="font-medium">{docType}</span> for roll number <span className="font-mono">{rollNo}</span> is ready.
      </p>
      <button
        onClick={handleDownload}
        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        Download Document
      </button>
    </div>
  );
};

export default DownloadStep;
