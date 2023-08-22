import React, { useState, useEffect } from 'react';
import Message from '../comps/Message';
// import Progress from '../comps/Progress';
import axios from 'axios';
import exifr from 'exifr';
import Form from '../comps/Form';
import UnicodeDecoder from '../utils/unicoder';
import './Upload.css';
//
export const Fileupload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [exifR, exifRSet] = useState();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  //

  //
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  // prettier-ignore
  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await axios.post('/upload', formData, {
        headers: {'Content-Type': 'multipart/form-data' }
      });
  
      const { fileName, filePath } = res.data;
      const newUploadedFile = { fileName, filePath };
      setUploadedFiles([...uploadedFiles, newUploadedFile]);
  
      setMessage(`Image File ${fileName} Uploaded to ${filePath}`);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      // setUploadPercentage(0);
    }
  };
  //exifr
  const getExif = async () => {
    const exIf = await exifr.parse(file, { iptc: true, xmp: true });
    console.log(exIf);
    exifRSet(exIf);
  };

  useEffect(() => {
    getExif();
    // UnicodeDecoder(exifR);
    console.log(exifR);
  }, [file, message]);
  //

  return (
    <>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      <div className="thumbnails">
        {uploadedFiles.map((file, index) => (
          <img
            key={index}
            className={`thumbnail ${
              selectedImageIndex === index ? 'selected' : ''
            }`}
            src={file.filePath}
            alt={`Thumbnail ${index}`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>
      <Form
        uploadedFile={
          selectedImageIndex !== null
            ? uploadedFiles[selectedImageIndex]
            : {}
        }
        exifR={exifR}
      />
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: '60%' }}
              src={uploadedFile.filePath}
              alt="dije"
            />
          </div>
        </div>
      ) : null}
      {exifR ? (
        //uploadedFile.fileName
        <Form uploadedFile={uploadedFile} exifR={exifR} />
      ) : null}
    </>
  );
};
