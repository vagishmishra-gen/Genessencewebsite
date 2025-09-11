import React, { useRef, useState } from 'react';

const humanSize = (bytes) => {
  const units = ['B','KB','MB','GB'];
  let i = 0; let v = bytes;
  while (v >= 1024 && i < units.length-1) { v/=1024; i++; }
  return `${v.toFixed(1)} ${units[i]}`;
};

const FileUpload = ({ label, accept, maxSizeMB = 5, onChange }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;
    if (accept && !accept.split(',').some(ext => f.name.toLowerCase().endsWith(ext.trim().toLowerCase()))) {
      setError(`Invalid file type. Allowed: ${accept}`);
      return;
    }
    if (f.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max ${maxSizeMB}MB`);
      return;
    }
    setError('');
    setFile(f);
    onChange?.(f);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="cursor-pointer rounded-lg border border-dashed border-border bg-card p-4 text-center hover:border-primary/40"
      >
        <div className="text-sm text-muted-foreground">
          {file ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-foreground">{file.name}</span>
              <span>•</span>
              <span>{humanSize(file.size)}</span>
            </div>
          ) : (
            <>
              <div className="font-medium text-foreground mb-1">{label}</div>
              <div>Drag & drop or click to upload</div>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e)=>handleFiles(e.target.files)} />
      </div>
      {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default FileUpload;
