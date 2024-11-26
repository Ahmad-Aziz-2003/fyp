// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

// // Define your custom styles in a CSS file (e.g., styles.css) or within a <style> tag if necessary.
// import "./style.css"; // Assuming you save the CSS in a separate file

// const CreateGoodness = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState(""); // Rich text (HTML format)
//   const [paragraphs, setParagraphs] = useState([]); // Store paragraphs

//   const handleImageUpload = (e) => {
//     if (e.target.files.length > 5) {
//       alert("You can upload a maximum of 5 images.");
//     } else {
//       setImages([...e.target.files]);
//     }
//   };

//   const addParagraph = () => {
//     // Append the current content as a paragraph and clear the editor
//     setParagraphs((prev) => [...prev, description]);
//     setDescription(""); // Clear the editor after adding
//   };

//   const handleSubmit = () => {
//     // Combine paragraphs into a single input, separated by commas
//     const combinedDescription = paragraphs.join(", ");
//     console.log({
//       title,
//       description: combinedDescription, // Store formatted content (HTML)
//     });
//     alert("Goodness post created successfully!");
//   };

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
//             className="editor" // Apply the editor class here
//           />
//           <button
//             type="button"
//             onClick={addParagraph}
//             className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             + Add Paragraph
//           </button>
//         </div>
//         <div className="mb-4">
//           <label className="block mb-2 text-gray-600">Current Paragraphs:</label>
//           <ul className="list-disc pl-5">
//             {paragraphs.map((para, index) => (
//               /<li key={index} dangerouslySetInnerHTML={{ __html: para }} >
//             ))}
//           </ul>
//         </div>
//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//         >
//           Submit
//         </button>
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
    const files = Array.from(e.target.files); // Convert FileList to Array
    const validImages = [];

    // Check if files are valid (max 5 images and correct format)
    if (files.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      return;
    }

    // Filter valid image formats (PNG, JPG, JPEG)
    files.forEach((file) => {
      const fileType = file.type.split("/")[1];
      if (["png", "jpg", "jpeg"].includes(fileType)) {
        validImages.push(file);
      } else {
        alert("Invalid file format. Only PNG, JPG, and JPEG are allowed.");
      }
    });

    // Update images state without overwriting existing images
    setImages((prevImages) => [...prevImages, ...validImages]);
  };

  const handleImageRemove = (index) => {
    // Remove image by index
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!description) {
      alert("Description cannot be empty.");
      return;
    }

    // Sanitize the description before sending it to the backend
    const sanitizedDescription = DOMPurify.sanitize(description);

    console.log({
      title,
      description: sanitizedDescription, // Send sanitized HTML content
      images: images, // Send images (you may handle uploading images separately)
    });

    // Submit the form (example: send to an API)
    alert("Goodness post created successfully!");
  };

  const handlePrevious = () => {
    // Navigate back to the previous page
    window.history.back();
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Create Goodness</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            placeholder="Write your description here..."
            className="editor" // Apply the editor class here
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Upload Images (max 5)</label>
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
                    src={URL.createObjectURL(image)} // Display image preview
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
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGoodness;
