// Função para extrair parâmetros da URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Função para formatar data
function formatDate(dateString) {
    if (!dateString) return '';
    
    // Dividir a data em partes para evitar problemas de fuso horário
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    return date.toLocaleDateString('pt-BR');
}



// Função para atualizar dados do documento baseado na URL
function updateDocumentData() {
    const tipo = getUrlParameter('tipo') || 'Carteira de Identificação Estudantil';
    const codigo = getUrlParameter('codigo_verificador') || '9269c45820';
    const dataEmissao = getUrlParameter('data_emissao') || '2025-07-31';
    
    // Atualizar informações do documento
    const tipoElement = document.querySelector('.info-row:nth-child(1) .value');
    const codigoElement = document.querySelector('.info-row:nth-child(2) .value');
    const dataElement = document.querySelector('.info-row:nth-child(3) .value');
    
    if (tipoElement) tipoElement.textContent = decodeURIComponent(tipo);
    if (codigoElement) codigoElement.textContent = codigo;
    if (dataElement) dataElement.textContent = formatDate(dataEmissao);
}

// Função para adicionar efeito de impressão
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body {
                background: white !important;
                color: black !important;
            }
            .header, .footer {
                display: none !important;
            }
            .auth-card {
                box-shadow: none !important;
                border: 2px solid #000 !important;
                background: white !important;
            }
            .verification-result {
                background: #48bb78 !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para adicionar funcionalidade de impressão
function addPrintButton() {
    const footerInfo = document.querySelector('.footer-info');
    if (footerInfo) {
        const printButton = document.createElement('button');
        printButton.textContent = '🖨️ Imprimir Documento';
        printButton.className = 'print-button';
        printButton.onclick = () => window.print();
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.style.marginTop = '16px';
        buttonContainer.appendChild(printButton);
        
        footerInfo.appendChild(buttonContainer);
    }
}

// Função para adicionar estilos do botão de impressão
function addPrintButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .print-button {
            background: #2c3e50;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        
        .print-button:hover {
            background: #34495e;
            transform: translateY(-1px);
        }
        
        .print-button:active {
            transform: translateY(0);
        }
        
        @media print {
            .print-button {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para adicionar animação de loading
function addLoadingAnimation() {
    const verificationResult = document.querySelector('.verification-result');
    if (verificationResult) {
        verificationResult.style.opacity = '0';
        verificationResult.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            verificationResult.style.transition = 'all 0.6s ease-out';
            verificationResult.style.opacity = '1';
            verificationResult.style.transform = 'translateY(0)';
        }, 500);
    }
}

// Função para adicionar funcionalidade de cópia do código
function addCopyCodeFunctionality() {
    const codigoElement = document.querySelector('.info-row:nth-child(2) .value');
    if (codigoElement) {
        codigoElement.style.cursor = 'pointer';
        codigoElement.title = 'Clique para copiar o código';
        
        // Adicionar indicador visual para mobile
        if (window.innerWidth <= 768) {
            codigoElement.style.borderBottom = '2px dashed #1976d2';
            codigoElement.style.paddingBottom = '2px';
        }
        
        codigoElement.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codigoElement.textContent);
                
                // Feedback visual melhorado para mobile
                const originalText = codigoElement.textContent;
                const originalColor = codigoElement.style.color;
                const originalBackground = codigoElement.style.background;
                
                codigoElement.textContent = 'Copiado!';
                codigoElement.style.color = '#28a745';
                codigoElement.style.background = '#d4edda';
                codigoElement.style.padding = '4px 8px';
                codigoElement.style.borderRadius = '4px';
                
                setTimeout(() => {
                    codigoElement.textContent = originalText;
                    codigoElement.style.color = originalColor;
                    codigoElement.style.background = originalBackground;
                    codigoElement.style.padding = '';
                    codigoElement.style.borderRadius = '';
                }, 2000);
            } catch (err) {
                console.log('Erro ao copiar código:', err);
                // Fallback para navegadores que não suportam clipboard API
                showCopyFallback(codigoElement);
            }
        });
        
        // Adicionar suporte para touch em mobile
        codigoElement.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
        });
        
        codigoElement.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        });
    }
}

// Função fallback para copiar código
function showCopyFallback(element) {
    const text = element.textContent;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        element.textContent = 'Copiado!';
        element.style.color = '#28a745';
        
        setTimeout(() => {
            element.textContent = text;
            element.style.color = '#2c3e50';
        }, 2000);
    } catch (err) {
        console.log('Erro ao copiar:', err);
    }
    
    document.body.removeChild(textArea);
}

// Função para adicionar validação de data
function validateDocumentDate() {
    const dataEmissao = getUrlParameter('data_emissao');
    if (dataEmissao) {
        const dataDoc = new Date(dataEmissao);
        const hoje = new Date();
        
        // Se a data de emissão é futura, mostrar aviso
        if (dataDoc > hoje) {
            const verificationResult = document.querySelector('.verification-result');
            if (verificationResult) {
                verificationResult.style.background = '#fff3cd';
                verificationResult.style.color = '#856404';
                verificationResult.style.border = '1px solid #ffeaa7';
                verificationResult.querySelector('h3').textContent = 'Documento com Data Futura';
                verificationResult.querySelector('p').textContent = 'Este documento possui uma data de emissão futura. Verifique a validade.';
            }
        }
    }
}

// Função principal que inicializa todas as funcionalidades
function initializeApp() {
    // Aguardar o DOM estar carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
        return;
    }
    
    // Atualizar dados do documento
    updateDocumentData();
    
    // Adicionar estilos de impressão
    addPrintStyles();
    
    // Adicionar botão de impressão
    addPrintButton();
    addPrintButtonStyles();
    
    // Adicionar animação de loading
    addLoadingAnimation();
    
    // Adicionar funcionalidade de cópia
    addCopyCodeFunctionality();
    
    // Validar data do documento
    validateDocumentDate();
    
    // Adicionar efeitos de hover e touch
    addHoverEffects();
    
    // Melhorar experiência mobile
    improveMobileScroll();
    
    // Adicionar listeners para mudanças de orientação
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
}

// Função para adicionar efeitos de hover e touch
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.info-row, .detail-row');
    
    interactiveElements.forEach(element => {
        // Efeitos para desktop (hover)
        element.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                element.style.transform = 'scale(1.02)';
                element.style.transition = 'transform 0.2s ease';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                element.style.transform = 'scale(1)';
            }
        });
        
        // Efeitos para mobile (touch)
        if (window.innerWidth <= 768) {
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', function(e) {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Função para detectar mudanças de orientação
function handleOrientationChange() {
    setTimeout(() => {
        // Recalcular layout após mudança de orientação
        const authCard = document.querySelector('.auth-card');
        if (authCard) {
            authCard.style.opacity = '0.8';
            setTimeout(() => {
                authCard.style.opacity = '1';
            }, 100);
        }
    }, 300);
}

// Função para melhorar experiência de scroll em mobile
function improveMobileScroll() {
    if (window.innerWidth <= 768) {
        // Suavizar scroll em mobile
        document.body.style.scrollBehavior = 'smooth';
        
        // Prevenir zoom em inputs (se houver)
        const meta = document.querySelector('meta[name="viewport"]');
        if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
    }
}

// Inicializar a aplicação
initializeApp();

// Adicionar listener para mudanças na URL (para SPA)
window.addEventListener('popstate', () => {
    updateDocumentData();
    validateDocumentDate();
});

// Adicionar listener para teclas de atalho
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P para imprimir
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Ctrl/Cmd + C para copiar código quando selecionado
    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        const selection = window.getSelection();
        if (selection.toString().includes('9269c45820')) {
            // Código já está sendo copiado pelo sistema
        }
    }
}); 