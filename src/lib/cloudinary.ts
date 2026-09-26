export const CLOUDINARY_CONFIG = {
  cloudName: "dobktsnix",
  uploadPreset: "portfolio2",
  baseUrl: "https://res.cloudinary.com/dobktsnix/image/upload",
};

export const cloudinaryAssets = {
  avatar: "https://res.cloudinary.com/dobktsnix/image/upload/v1788506076/likjlw1r1sjncl53oplx.jpg",
  resumeFile: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505814/xkodbstdnohynpiiitwy.png",
  toastmastersLogo: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505815/p7hwsjgczvweowvl239n.png",
  prMaestro: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505815/d5d4sbaurxxoscd9cmlp.jpg",
  prStalwart: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505816/pdrozbr5ena2sbevtpw6.jpg",
  projectHospital: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505817/rt2mqgz7xzqer57wiiwe.jpg",
  projectExpenseManager: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505818/srsxmlpmgggs7po5l91z.png",
  projectSahayak: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505818/d0xtitsbn3mjqhr91zcm.webp",
  projectRealEstate: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505819/dfflyew9bz7ywzvgzoru.jpg",
  projectPortfolio: "https://res.cloudinary.com/dobktsnix/image/upload/v1788505820/aec7omlmyy0qjklqi2on.webp",
};

/**
 * Upload an image file directly to Cloudinary using the unsigned upload preset
 */
export async function uploadToCloudinary(file: File | Blob | string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to upload image to Cloudinary");
  }

  return response.json();
}
