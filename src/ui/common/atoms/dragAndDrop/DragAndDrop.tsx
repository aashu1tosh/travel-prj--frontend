import axios from '@api/axios';
import React, {
    ChangeEvent,
    Dispatch,
    DragEvent,
    SetStateAction,
    useState,
} from 'react';

interface DragAndDropProps {
    media?: string | null;
    setMedia: Dispatch<SetStateAction<string>>;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ setMedia }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState<boolean>(false);
    const [status, setStatus] = useState<string>('Submit');

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
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
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        // handleUpload();
    };

    const handleUpload = async () => {
        console.log('handle upload called');
        const formData = new FormData();
        formData.append('type', 'PROFILE');
        files?.forEach((f) => {
            formData.append('file', f);
        });

        try {
            setStatus('Submitting');
            const response = await axios.post('/media/single', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            console.log(
                response.data?.data?.mediaId,
                'mediaId from drag and drop'
            );
            setMedia(response?.data?.data?.mediaId);
            setStatus('Submit');
        } catch (error) {
            console.log('Error uploading image:', error);
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
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
                <p>Drag & drop files here, or click to select files</p>
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            <p onClick={handleUpload}>{status}</p>
        </>
    );
};

export default DragAndDrop;
