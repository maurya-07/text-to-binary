interface ConversionResult {
    success: boolean;
    result?: string;
    error?: string;
}

type ConversionMode = 'textToBinary' | 'binaryToText';

class BinaryConverter {
    private currentMode: ConversionMode = 'textToBinary';
    
    constructor() {
        this.initEventListeners();
    }

    private initEventListeners(): void {
        const textToBinaryBtn = document.getElementById('textToBinaryBtn') as HTMLButtonElement;
        const binaryToTextBtn = document.getElementById('binaryToTextBtn') as HTMLButtonElement;
        const convertBtn = document.getElementById('convertBtn') as HTMLButtonElement;
        const clearBtn = document.getElementById('clearBtn') as HTMLButtonElement;
        const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
        const textInput = document.getElementById('textInput') as HTMLInputElement;

        textToBinaryBtn?.addEventListener('click', () => {
            this.switchMode('textToBinary');
        });
        
        binaryToTextBtn?.addEventListener('click', () => {
            this.switchMode('binaryToText');
        });

        convertBtn?.addEventListener('click', () => {
            this.convert();
        });

        clearBtn?.addEventListener('click', () => {
            this.clearAll();
        });

        copyBtn?.addEventListener('click', () => {
            this.copyOutput();
        });

        textInput?.addEventListener('keypress', (e: KeyboardEvent) => {
            if (e.key === 'Enter') this.convert();
        });
    }

    private switchMode(mode: ConversionMode): void {
        this.currentMode = mode;
        
        const textToBinaryBtn = document.getElementById('textToBinaryBtn') as HTMLButtonElement;
        const binaryToTextBtn = document.getElementById('binaryToTextBtn') as HTMLButtonElement;
        const textMode = document.getElementById('textMode') as HTMLDivElement;
        const binaryMode = document.getElementById('binaryMode') as HTMLDivElement;
        
        textToBinaryBtn?.classList.toggle('active', mode === 'textToBinary');
        binaryToTextBtn?.classList.toggle('active', mode === 'binaryToText');
        
        if (textMode) textMode.classList.toggle('hidden', mode !== 'textToBinary');
        if (binaryMode) binaryMode.classList.toggle('hidden', mode !== 'binaryToText');
        
        this.clearAll();
    }

    private convert(): void {
        if (this.currentMode === 'textToBinary') {
            this.textToBinary();
        } else {
            this.binaryToText();
        }
    }

    private textToBinary(): void {
        const textInput = document.getElementById('textInput') as HTMLInputElement;
        const output = document.getElementById('output') as HTMLDivElement;
        const errorDiv = document.getElementById('textError') as HTMLDivElement;
        
        if (!textInput || !output || !errorDiv) return;
        
        const inputText = textInput.value;
        errorDiv.textContent = '';
        
        const result = this.convertTextToBinary(inputText);
        
        if (result.success && result.result) {
            output.textContent = result.result;
        } else if (result.error) {
            errorDiv.textContent = result.error;
        }
    }

    private binaryToText(): void {
        const binaryInput = document.getElementById('binaryInput') as HTMLTextAreaElement;
        const output = document.getElementById('output') as HTMLDivElement;
        const errorDiv = document.getElementById('binaryError') as HTMLDivElement;
        
        if (!binaryInput || !output || !errorDiv) return;
        
        const inputBinary = binaryInput.value;
        errorDiv.textContent = '';
        
        const result = this.convertBinaryToText(inputBinary);
        
        if (result.success && result.result) {
            output.textContent = result.result;
        } else if (result.error) {
            errorDiv.textContent = result.error;
        }
    }

    private convertTextToBinary(text: string): ConversionResult {
        if (!text.trim()) {
            return { success: false, error: 'Please enter some text' };
        }

        try {
            const binaryArray: string[] = [];
            
            for (let i = 0; i < text.length; i++) {
                const char: string = text[i];
                const ascii: number = char.charCodeAt(0);
                const binary: string = ascii.toString(2).padStart(8, '0');
                binaryArray.push(binary);
            }
            
            return { success: true, result: binaryArray.join(' ') };
            
        } catch (error) {
            return { success: false, error: 'Error converting text to binary' };
        }
    }

    private convertBinaryToText(binary: string): ConversionResult {
        if (!binary.trim()) {
            return { success: false, error: 'Please enter binary code' };
        }

        try {
            const binaryChunks: string[] = binary.trim().split(/\s+/);
            const textArray: string[] = [];
            
            for (const chunk of binaryChunks) {
                if (!/^[01]+$/.test(chunk)) {
                    return { success: false, error: `Invalid binary: ${chunk}` };
                }
                
                if (chunk.length !== 8) {
                    return { success: false, error: `Binary must be 8 bits: ${chunk}` };
                }
                
                const decimal: number = parseInt(chunk, 2);
                const char: string = String.fromCharCode(decimal);
                textArray.push(char);
            }
            
            return { success: true, result: textArray.join('') };
            
        } catch (error) {
            return { success: false, error: 'Error converting binary to text' };
        }
    }

    private clearAll(): void {
        const textInput = document.getElementById('textInput') as HTMLInputElement;
        const binaryInput = document.getElementById('binaryInput') as HTMLTextAreaElement;
        const output = document.getElementById('output') as HTMLDivElement;
        const textError = document.getElementById('textError') as HTMLDivElement;
        const binaryError = document.getElementById('binaryError') as HTMLDivElement;
        
        if (textInput) textInput.value = '';
        if (binaryInput) binaryInput.value = '';
        if (output) output.textContent = '';
        if (textError) textError.textContent = '';
        if (binaryError) binaryError.textContent = '';
    }

    private async copyOutput(): Promise<void> {
        const output = document.getElementById('output') as HTMLDivElement;
        const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement;
        
        if (!output || !copyBtn) return;
        
        const text: string = output.textContent || '';
        
        if (!text.trim()) {
            alert('Nothing to copy! Convert something first.');
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            
            const originalText: string = copyBtn.textContent || 'Copy Output';
            copyBtn.textContent = 'Copied!';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 1500);
            
        } catch (error) {
            this.fallbackCopy(text);
        }
    }

    private fallbackCopy(text: string): void {
        const textArea: HTMLTextAreaElement = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard!');
    }
}

document.addEventListener('DOMContentLoaded', (): void => {
    new BinaryConverter();
});

function exampleTextToBinary(): string {
    const converter = new BinaryConverter();
    return "Text to Binary conversion example";
}

function exampleBinaryToText(): string {
    const converter = new BinaryConverter();
    return "Binary to Text conversion example";
}