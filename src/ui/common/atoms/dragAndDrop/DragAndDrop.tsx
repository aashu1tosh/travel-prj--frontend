// import axios from '@api/axios';
// import React, {
//     ChangeEvent,
//     Dispatch,
//     DragEvent,
//     SetStateAction,
//     useState,
// } from 'react';

// interface DragAndDropProps {
//     media?: string | null;
//     setMedia: Dispatch<SetStateAction<string>>;
// }

// const DragAndDrop: React.FC<DragAndDropProps> = ({ setMedia }) => {
//     const [files, setFiles] = useState<File[]>([]);
//     const [dragging, setDragging] = useState<boolean>(false);
//     const [status, setStatus] = useState<string>(
//         'Submit media before the form'
//     );

//     const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragging(false);

//         const droppedFiles = Array.from(e.dataTransfer.files);
//         setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//     };

//     const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragging(true);
//     };

//     const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragging(false);
//     };

//     const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//         const selectedFiles = Array.from(e.target.files || []);
//         setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//     };

//     const handleUpload = async () => {
//         const formData = new FormData();
//         formData.append('type', 'PROFILE');
//         files?.forEach((f) => {
//             formData.append('file', f);
//         });

//         try {
//             setStatus('Submitting');
//             const response = await axios.post('/media/single', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setMedia(response?.data?.data?.mediaId);
//             setStatus('Submit');
//             setFiles([]);
//         } catch (error) {
//             setStatus("Upload failed")
//             console.error(error);
//         }
//     };

//     return (
//         <>
//             <div
//                 style={{
//                     border: dragging ? '2px solid blue' : '2px solid gray',
//                     padding: '20px',
//                     width: '400px',
//                     height: '200px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     borderRadius: '4px',
//                     backgroundColor: '#f9f9f9',
//                     position: 'relative',
//                 }}
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//             >
//                 <input
//                     type='file'
//                     multiple
//                     onChange={handleFileChange}
//                     style={{
//                         position: 'absolute',
//                         opacity: 0,
//                         width: '100%',
//                         height: '100%',
//                         cursor: 'pointer',
//                     }}
//                 />
//                 <p>Drag & drop files here, or click to select files</p>
//                 <ul>
//                     {files.map((file, index) => (
//                         <li key={index}>{file.name}</li>
//                     ))}
//                 </ul>
//             </div>

//             <p
//                 onClick={handleUpload}
//                 style={{ color: 'green', cursor: 'pointer', padding: '10px' }}
//             >
//                 {status}
//             </p>
//         </>
//     );
// };

// export default DragAndDrop;

import axios from '@api/axios';
import { MediaType } from '@constant/enum';
import React, {
    ChangeEvent,
    Dispatch,
    DragEvent,
    SetStateAction,
    useState,
} from 'react';

interface DragAndDropProps {
    setMedia: Dispatch<SetStateAction<string>>;
    type: MediaType
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ setMedia, type }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState<boolean>(false);
    const [status, setStatus] = useState<string | null>(null);

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...droppedFiles];
            handleUpload(updatedFiles);
            return updatedFiles;
        });
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...selectedFiles];
            handleUpload(updatedFiles);
            return updatedFiles;
        });
    };

    const handleUpload = async (filesToUpload: File[]) => {
        const formData = new FormData();
        formData.append('type', type);
        filesToUpload.forEach((f) => {
            formData.append('file', f);
        });

        try {
            setStatus('Submitting');
            const response = await axios.post('/media/single', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMedia(response?.data?.data?.mediaId);
            setStatus('Submitted');
            setFiles([]);
        } catch (error) {
            console.error(error);
            setStatus('Media upload failed');
        }
    };

    return (
        <>
            <div
                style={{
                    border: dragging ? '2px solid blue' : '2px solid gray',
                    padding: '20px',
                    width: '400px',
                    height: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                    position: 'relative',
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    type='file'
                    multiple
                    onChange={handleFileChange}
                    accept='image/*'
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                    }}
                />
                <p>Drag & drop files here, or click to select files</p>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <p style={{ color: 'green', padding: '10px' }}>{status}</p>
        </>
    );
};

export default DragAndDrop;
