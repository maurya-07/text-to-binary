var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BinaryConverter = /** @class */ (function () {
    function BinaryConverter() {
        this.currentMode = 'textToBinary';
        this.initEventListeners();
    }
    BinaryConverter.prototype.initEventListeners = function () {
        var _this = this;
        var textToBinaryBtn = document.getElementById('textToBinaryBtn');
        var binaryToTextBtn = document.getElementById('binaryToTextBtn');
        var convertBtn = document.getElementById('convertBtn');
        var clearBtn = document.getElementById('clearBtn');
        var copyBtn = document.getElementById('copyBtn');
        var textInput = document.getElementById('textInput');
        textToBinaryBtn === null || textToBinaryBtn === void 0 ? void 0 : textToBinaryBtn.addEventListener('click', function () {
            _this.switchMode('textToBinary');
        });
        binaryToTextBtn === null || binaryToTextBtn === void 0 ? void 0 : binaryToTextBtn.addEventListener('click', function () {
            _this.switchMode('binaryToText');
        });
        convertBtn === null || convertBtn === void 0 ? void 0 : convertBtn.addEventListener('click', function () {
            _this.convert();
        });
        clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', function () {
            _this.clearAll();
        });
        copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.addEventListener('click', function () {
            _this.copyOutput();
        });
        textInput === null || textInput === void 0 ? void 0 : textInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter')
                _this.convert();
        });
    };
    BinaryConverter.prototype.switchMode = function (mode) {
        this.currentMode = mode;
        var textToBinaryBtn = document.getElementById('textToBinaryBtn');
        var binaryToTextBtn = document.getElementById('binaryToTextBtn');
        var textMode = document.getElementById('textMode');
        var binaryMode = document.getElementById('binaryMode');
        textToBinaryBtn === null || textToBinaryBtn === void 0 ? void 0 : textToBinaryBtn.classList.toggle('active', mode === 'textToBinary');
        binaryToTextBtn === null || binaryToTextBtn === void 0 ? void 0 : binaryToTextBtn.classList.toggle('active', mode === 'binaryToText');
        if (textMode)
            textMode.classList.toggle('hidden', mode !== 'textToBinary');
        if (binaryMode)
            binaryMode.classList.toggle('hidden', mode !== 'binaryToText');
        this.clearAll();
    };
    BinaryConverter.prototype.convert = function () {
        if (this.currentMode === 'textToBinary') {
            this.textToBinary();
        }
        else {
            this.binaryToText();
        }
    };
    BinaryConverter.prototype.textToBinary = function () {
        var textInput = document.getElementById('textInput');
        var output = document.getElementById('output');
        var errorDiv = document.getElementById('textError');
        if (!textInput || !output || !errorDiv)
            return;
        var inputText = textInput.value;
        errorDiv.textContent = '';
        var result = this.convertTextToBinary(inputText);
        if (result.success && result.result) {
            output.textContent = result.result;
        }
        else if (result.error) {
            errorDiv.textContent = result.error;
        }
    };
    BinaryConverter.prototype.binaryToText = function () {
        var binaryInput = document.getElementById('binaryInput');
        var output = document.getElementById('output');
        var errorDiv = document.getElementById('binaryError');
        if (!binaryInput || !output || !errorDiv)
            return;
        var inputBinary = binaryInput.value;
        errorDiv.textContent = '';
        var result = this.convertBinaryToText(inputBinary);
        if (result.success && result.result) {
            output.textContent = result.result;
        }
        else if (result.error) {
            errorDiv.textContent = result.error;
        }
    };
    BinaryConverter.prototype.convertTextToBinary = function (text) {
        if (!text.trim()) {
            return { success: false, error: 'Please enter some text' };
        }
        try {
            var binaryArray = [];
            for (var i = 0; i < text.length; i++) {
                var char = text[i];
                var ascii = char.charCodeAt(0);
                var binary = ascii.toString(2).padStart(8, '0');
                binaryArray.push(binary);
            }
            return { success: true, result: binaryArray.join(' ') };
        }
        catch (error) {
            return { success: false, error: 'Error converting text to binary' };
        }
    };
    BinaryConverter.prototype.convertBinaryToText = function (binary) {
        if (!binary.trim()) {
            return { success: false, error: 'Please enter binary code' };
        }
        try {
            var binaryChunks = binary.trim().split(/\s+/);
            var textArray = [];
            for (var _i = 0, binaryChunks_1 = binaryChunks; _i < binaryChunks_1.length; _i++) {
                var chunk = binaryChunks_1[_i];
                if (!/^[01]+$/.test(chunk)) {
                    return { success: false, error: "Invalid binary: ".concat(chunk) };
                }
                if (chunk.length !== 8) {
                    return { success: false, error: "Binary must be 8 bits: ".concat(chunk) };
                }
                var decimal = parseInt(chunk, 2);
                var char = String.fromCharCode(decimal);
                textArray.push(char);
            }
            return { success: true, result: textArray.join('') };
        }
        catch (error) {
            return { success: false, error: 'Error converting binary to text' };
        }
    };
    BinaryConverter.prototype.clearAll = function () {
        var textInput = document.getElementById('textInput');
        var binaryInput = document.getElementById('binaryInput');
        var output = document.getElementById('output');
        var textError = document.getElementById('textError');
        var binaryError = document.getElementById('binaryError');
        if (textInput)
            textInput.value = '';
        if (binaryInput)
            binaryInput.value = '';
        if (output)
            output.textContent = '';
        if (textError)
            textError.textContent = '';
        if (binaryError)
            binaryError.textContent = '';
    };
    BinaryConverter.prototype.copyOutput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var output, copyBtn, text, originalText_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        output = document.getElementById('output');
                        copyBtn = document.getElementById('copyBtn');
                        if (!output || !copyBtn)
                            return [2 /*return*/];
                        text = output.textContent || '';
                        if (!text.trim()) {
                            alert('Nothing to copy! Convert something first.');
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, navigator.clipboard.writeText(text)];
                    case 2:
                        _a.sent();
                        originalText_1 = copyBtn.textContent || 'Copy Output';
                        copyBtn.textContent = 'Copied!';
                        setTimeout(function () {
                            copyBtn.textContent = originalText_1;
                        }, 1500);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.fallbackCopy(text);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BinaryConverter.prototype.fallbackCopy = function (text) {
        var textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Copied to clipboard!');
    };
    return BinaryConverter;
}());
document.addEventListener('DOMContentLoaded', function () {
    new BinaryConverter();
});
function exampleTextToBinary() {
    var converter = new BinaryConverter();
    return "Text to Binary conversion example";
}
function exampleBinaryToText() {
    var converter = new BinaryConverter();
    return "Binary to Text conversion example";
}
