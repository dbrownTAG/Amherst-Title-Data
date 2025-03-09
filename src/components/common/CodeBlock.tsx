import React, { useState } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language, 
  showLineNumbers = false 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 0,
            zIndex: 10,
            backgroundColor: 'rgba(30, 41, 59, 0.7)',
            color: copied ? '#10B981' : '#fff',
            '&:hover': {
              backgroundColor: 'rgba(30, 41, 59, 0.9)',
            },
            width: 30,
            height: 30,
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      {/* @ts-ignore */}
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        showLineNumbers={showLineNumbers}
        customStyle={{ 
          borderRadius: '8px', 
          fontSize: '14px',
          backgroundColor: '#1E293B',
          margin: 0,
          padding: '1em',
          textAlign: 'left',
        }}
        codeTagProps={{
          style: {
            display: 'block',
            lineHeight: '1.5',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeBlock; 