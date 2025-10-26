import { useState } from 'react';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {    
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}