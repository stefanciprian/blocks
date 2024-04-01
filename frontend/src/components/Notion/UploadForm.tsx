// UploadForm.tsx
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '@radix-ui/themes';
import { useToast } from '../ui/use-toast';
import { ImportCSVFileForNotionDB } from '../../../wailsjs/go/main/App';

const UploadForm: React.FC = () => {
    const { toast } = useToast();
    const [file, setFile] = useState<any>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (file) {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
                const fileData = Array.from(new Uint8Array(e.target.result)); // Convert Uint8Array to array of numbers
                try {
                    await ImportCSVFileForNotionDB(fileData, file.name);
                    console.log("File uploaded successfully");
                    toast({
                        title: 'File uploaded',
                        description: 'The file has been uploaded'
                    })
                } catch (err) {
                    console.error("Error uploading file:", err);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input type="file" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            <Button type="submit">Upload</Button>
        </form>
    );
};

export default UploadForm;
