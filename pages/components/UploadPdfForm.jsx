import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const storage = firebase.storage();
const db = firebase.firestore();

function UploadPdfForm() {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const downloadUrl = await uploadPdf(file);
      const docId = await savePdfMetadata(subject, semester, downloadUrl);
      alert(`PDF uploaded successfully with ID: ${docId}`);
    } catch (error) {
    }
    alert(`Error uploading PDF: ${error.message}`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const uploadPdf = async (file) => {
    const ref = storage.ref().child(`semester_resources/${file.name}`);
    const uploadTask = ref.put(file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    });

    await uploadTask;

    const downloadUrl = await ref.getDownloadURL();
    return downloadUrl;
  };

  const savePdfMetadata = async (subject, semester, downloadUrl) => {
    const docRef = await db.collection('semester_resources').add({
      subject,
      semester,
      downloadUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    return docRef.id;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      </div>
      <div>
        <label htmlFor="semester">Semester:</label>
        <input type="text" id="semester" value={semester} onChange={(event) => setSemester(event.target.value)} />
      </div>
      <div>
        <label htmlFor="file">PDF:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      {progress > 0 && <progress value={progress} max="100" />}
      <button type="submit">Upload PDF</button>
    </form>
  );
}

export default UploadPdfForm;
