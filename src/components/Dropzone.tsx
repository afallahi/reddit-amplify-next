import React from "react";
import { useDropzone } from "react-dropzone";
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
    file: File;
    setFile: React.Dispatch<React.SetStateAction<File>>;
}

export default function Dropzone({ file, setFile }: Props) {
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/*": ['.jpeg', '.png']
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
        },
    });

    return (
        <>
            {!file ? (
                <section
                    className="container"
                    style={{
                        borderStyle: "dashed",
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.5)",
                        minHeight: 128,
                    }}
                >
                    <div
                        {...getRootProps({ className: "dropzone" })}
                        style={{ padding: 16 }}
                    >
                        <input {...getInputProps()} />
                        <Typography variant="body1">
                            Drag and drop the image you want to upload for your post.
                        </Typography>
                    </div>
                </section>
            ) : (
                <Grid
                    container
                    alignItems="center"
                    direction="column"
                    justifyContent="center"
                    spacing={1}
                >
                    {/* <Grid item>
                        <Typography variant="h6">Image to Add:</Typography>
                    </Grid> */}
                    <Grid item>
                        <img
                            src={URL.createObjectURL(file)}
                            style={{ width: "auto", maxHeight: 320 }}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    );
}