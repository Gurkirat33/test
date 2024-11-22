export async function uploadToCloudinary(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    const uploadUrl = `https://api.cloudinary.com/v1_1/${
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }/image/upload`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Upload failed");
    }

    const transformations = [
      "w_1600", 
      "h_1600", 
      "c_limit",
      "q_auto:low",
      "f_auto", 
    ].join(",");

    const baseUrl = data.secure_url.split("/upload/")[0];
    const publicId = data.secure_url.split("/upload/")[1];
    const compressedUrl = `${baseUrl}/upload/${transformations}/${publicId}`;

    const transformedResponse = await fetch(compressedUrl);
    const transformedBlob = await transformedResponse.blob();

    const originalSize = (file.size / (1024 * 1024)).toFixed(2);
    const compressedSize = (transformedBlob.size / (1024 * 1024)).toFixed(2);
    const compressionRatio = (
      (1 - transformedBlob.size / file.size) *
      100
    ).toFixed(1);

    const compressionReport = {
      originalSize: `${originalSize}MB`,
      compressedSize: `${compressedSize}MB`,
      compressionRatio: `${compressionRatio}%`,
      targetReduction: "70%",
      dimensions: `${data.width}x${data.height}`,
      format: data.format,
      transformedUrl: compressedUrl,
    };

    const compressionStatus =
      parseFloat(compressionRatio) >= 70
        ? "Target reduction achieved"
        : "Compression below target";

    return {
      public_id: data.public_id,
      url: compressedUrl,
      compressedSize,
      originalSize,
      compressionRatio,
      compressionStatus,
      report: compressionReport,
    };
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
}
