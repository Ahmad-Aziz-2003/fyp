// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing
// import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
// import "./style.css"; // Assuming style.css is in the same directory

// const CreateGoodness = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState(""); // Rich text (HTML format)
//   const [images, setImages] = useState([]); // Images state
//   const [uploading, setUploading] = useState(false); // For upload status

//   // Load data from localStorage on component mount
//   useEffect(() => {
//     const storedTitle = localStorage.getItem("title");
//     const storedDescription = localStorage.getItem("description");
//     const storedImages = JSON.parse(localStorage.getItem("images"));

//     if (storedTitle) setTitle(storedTitle);
//     if (storedDescription) setDescription(storedDescription);
//     if (storedImages) setImages(storedImages);
//   }, []);

//   // Save data to localStorage when any form field changes
//   useEffect(() => {
//     localStorage.setItem("title", title);
//     localStorage.setItem("description", description);
//     localStorage.setItem("images", JSON.stringify(images));
//   }, [title, description, images]);

//   const handleImageUpload = (e) => {
//     const selectedFiles = Array.from(e.target.files);

//     // Check if adding selected files exceeds the limit of 5 images
//     if (selectedFiles.length + images.length > 5) {
//       alert("You can upload a maximum of 5 images.");
//       return;
//     }

//     const validFiles = selectedFiles.filter((file) => {
//       if (file.size > 3 * 1024 * 1024) {
//         alert(`${file.name} exceeds the 3 MB limit.`);
//         return false;
//       }
//       if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
//         alert(`${file.name} is not a valid file type. Only PNG, JPG, and JPEG are allowed.`);
//         return false;
//       }
//       return true;
//     });

//     setImages((prevImages) => [...prevImages, ...validFiles]);
//   };

// // const handleImageUpload = (e) => {
// //     const file = e.target.files[0];  // Select the first file only

// //     if (file) {
// //       if (file.size > 5 * 1024 * 1024) {
// //         alert(`${file.name} exceeds the 5 MB limit.`);
// //         return;
// //       }

// //       if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
// //         alert("Invalid file format. Only PNG, JPG, and JPEG are allowed.");
// //         return;
// //       }

// //       setImages([file]);  // Set the file in the state (only one image)
// //     }
// //   };
// //   const handleImageRemove = (index) => {
// //     setImages(images.filter((_, i) => i !== index));
// //   };
// const handleSubmit = async () => {
//     if (!description || !title || images.length === 0) {
//       alert("Title, description, and at least one image are required.");
//       return;
//     }

//     const ngoId = localStorage.getItem("ngoId");
//     if (!ngoId) {
//       alert("NGO ID not found. Please log in or complete your profile.");
//       return;
//     }

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", DOMPurify.sanitize(description));
//     formData.append("ngoId", ngoId);

//     images.forEach((image) => {
//       formData.append("imagesgoodness", image); // Append each image
//     });

//     try {
//       const response = await fetch("http://localhost:5000/api/goodness/create-goodness", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Goodness post created successfully!");
//         setTitle("");
//         setDescription("");
//         setImages([]);
//       } else {
//         alert(data.error || "Something went wrong.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit the form.");
//     } finally {
//       setUploading(false);
//     }
//   };

// // const handleSubmit = async () => {
// //     if (!description || !title || images.length === 0) {
// //       alert("Title, description, and an image are required.");
// //       return;
// //     }


// //     const ngoId = localStorage.getItem("ngoId");
// //     if (!ngoId) {
// //       alert("NGO ID not found. Please log in or complete your profile.");
// //       return;
// //     }

// //     setUploading(true);

// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("description", DOMPurify.sanitize(description));
// //     formData.append("ngoId", ngoId); // Use the retrieved NGO ID
// //     formData.append("imagesgoodness", images[0]);  // Append the single image

// //     try {
// //       const response = await fetch("http://localhost:5000/api/goodness/create-goodness", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         alert("Goodness post created successfully!");
// //         setTitle("");
// //         setDescription("");
// //         setImages([]);
// //       } else {
// //         alert(data.error || "Something went wrong.");
// //       }
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       alert("Failed to submit the form.");
// //     } finally {
// //       setUploading(false);
// //     }
// //   };
//   return (
//     <div className="p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-6">Create Goodness</h1>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="mb-4">
//           <label className="block mb-2 text-gray-600">Title</label>
//           <input
//             type="text"
//             className="w-full border border-gray-300 p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 text-gray-600">Description</label>
//           <ReactQuill
//             value={description}
//             onChange={setDescription}
//             theme="snow"
//             placeholder="Write your description here..."
//             className="editor"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 text-gray-600">Upload Images (max 5, 5 MB each)</label>
//           <input
//             type="file"
//             accept=".png,.jpg,.jpeg"
//             multiple
//             onChange={handleImageUpload}
//             className="w-full border border-gray-300 p-2 rounded"
//           />
//           {images.length > 0 && (
//             <div className="mt-2 flex flex-wrap">
//               {images.map((image, index) => (
//                 <div
//                   key={index}
//                   className="relative m-2 border-2 border-gray-300 rounded"
//                 >
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={image.name}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleImageRemove(index)}
//                     className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1"
//                   >
//                     X
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="flex justify-between">
//           <button
//             type="button"
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
//             onClick={() => window.history.back()}
//           >
//             Previous
//           </button>
//           <button
//             type="button"
//             className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//             onClick={handleSubmit}
//             disabled={uploading}
//           >
//             {uploading ? "Uploading..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateGoodness;
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./style.css"; // Assuming style.css is in the same directory

const CreateGoodness = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // Rich text (HTML format)
    const [images, setImages] = useState([]); // Images state
    const [uploading, setUploading] = useState(false); // For upload status

    // Load data from localStorage on component mount
    useEffect(() => {
        const storedTitle = localStorage.getItem("title");
        const storedDescription = localStorage.getItem("description");
        const storedImages = JSON.parse(localStorage.getItem("images"));

        if (storedTitle) setTitle(storedTitle);
        if (storedDescription) setDescription(storedDescription);
        if (storedImages) setImages(storedImages);
    }, []);

    // Save data to localStorage when any form field changes
    useEffect(() => {
        localStorage.setItem("title", title);
        localStorage.setItem("description", description);
        localStorage.setItem("images", JSON.stringify(images));
    }, [title, description, images]);

    const handleImageUpload = (e) => {
        const selectedFiles = Array.from(e.target.files);

        // Check if adding selected files exceeds the limit of 5 images
        if (selectedFiles.length + images.length > 5) {
            alert("You can upload a maximum of 5 images.");
            return;
        }

        const validFiles = selectedFiles.filter((file) => {
            if (file.size > 3 * 1024 * 1024) {
                alert(`${file.name} exceeds the 3 MB limit.`);
                return false;
            }
            if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
                alert(`${file.name} is not a valid file type. Only PNG, JPG, and JPEG are allowed.`);
                return false;
            }
            return true;
        });

        setImages((prevImages) => [...prevImages, ...validFiles]);
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    //   const handleSubmit = async () => {
    //     if (!description || !title || images.length === 0) {
    //       alert("Title, description, and at least one image are required.");
    //       return;
    //     }

    //     const ngoId = localStorage.getItem("ngoId");
    //     if (!ngoId) {
    //       alert("NGO ID not found. Please log in or complete your profile.");
    //       return;
    //     }

    //     setUploading(true);

    //     const formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("description", DOMPurify.sanitize(description));
    //     formData.append("ngoId", ngoId);

    //     images.forEach((image) => {
    //       formData.append("imagesgoodness", image); // Append each image
    //     });

    //     try {
    //       const response = await fetch("http://localhost:5000/api/goodness/create-goodness", {
    //         method: "POST",
    //         body: formData,
    //       });

    //       const data = await response.json();

    //       if (response.ok) {
    //         alert("Goodness post created successfully!");
    //         setTitle("");
    //         setDescription("");
    //         setImages([]);
    //       } else {
    //         alert(data.error || "Something went wrong.");
    //       }
    //     } catch (error) {
    //       console.error("Error submitting form:", error);
    //       alert("Failed to submit the form.");
    //     } finally {
    //       setUploading(false);
    //     }
    //   };
    const handleSubmit = async () => {
        try {
            if (!title || !description || images.length === 0) {
                throw new Error("All fields are required.");
            }

            const ngoId = localStorage.getItem("ngoId");
            if (!ngoId) throw new Error("NGO ID is missing. Please log in.");

            setUploading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", DOMPurify.sanitize(description));
            formData.append("ngoId", ngoId);
            images.forEach((img) => formData.append("imagesgoodness", img));

            const response = await fetch("http://localhost:5000/api/goodness/create-goodness", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Submission failed.");

            alert("Goodness post created successfully!");
            setTitle("");
            setDescription("");
            setImages([]);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">Create Goodness</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Title</label>
                    {/* <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          /> */}
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title here..."
                        aria-label="Goodness Title"
                    />

                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Description</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        theme="snow"
                        placeholder="Write your description here..."
                        className="editor"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Upload Images (max 5, 3 MB each)</label>
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        multiple    
                        onChange={handleImageUpload}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {images.length > 0 && (
                        <div className="mt-2 flex flex-wrap">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative m-2 border-2 border-gray-300 rounded"
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleImageRemove(index)}
                                        className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        onClick={() => window.history.back()}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        onClick={handleSubmit}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGoodness;
