# Sistema de Autenticação de Documentos - IFMA

Este projeto é uma recriação do sistema de autenticação de documentos do IFMA (Instituto Federal do Maranhão), especificamente para verificação de Carteiras de Identificação Estudantil.

## 📋 Funcionalidades

- **Verificação de Documentos**: Interface para verificar a autenticidade de documentos oficiais
- **Exibição de Informações**: Mostra detalhes do documento e do estudante
- **Código QR**: Geração de código QR para verificação rápida
- **Responsividade**: Design adaptável para diferentes dispositivos
- **Impressão**: Funcionalidade de impressão otimizada
- **Interatividade**: Elementos clicáveis e animações suaves

## 🚀 Como Usar

1. **Abrir o arquivo `index.html`** em qualquer navegador moderno
2. **Visualizar o documento** com as informações extraídas da URL
3. **Clicar no código verificador** para copiá-lo
4. **Usar o botão de impressão** para imprimir o documento
5. **Escaneie o QR code** para verificação rápida

## 📁 Estrutura do Projeto

```
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Documentação
```

## 🎨 Características do Design

- **Design Moderno**: Interface limpa e profissional
- **Gradientes**: Fundo com gradiente azul/roxo
- **Glassmorphism**: Efeito de vidro fosco nos cards
- **Animações**: Transições suaves e efeitos de hover
- **Tipografia**: Fonte Inter para melhor legibilidade

## 🔧 Funcionalidades Técnicas

### JavaScript
- **Extração de Parâmetros**: Lê dados da URL automaticamente
- **Formatação de Data**: Converte datas para formato brasileiro
- **QR Code Simulado**: Gera visualização de código QR
- **Validação**: Verifica se a data de emissão é válida
- **Cópia**: Permite copiar o código verificador com um clique
- **Impressão**: Estilos otimizados para impressão

### CSS
- **Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Flexbox/Grid**: Layout moderno e flexível
- **Variáveis CSS**: Fácil personalização de cores
- **Media Queries**: Breakpoints para mobile e tablet

## 📱 Responsividade

O site é totalmente responsivo e funciona bem em:
- **Desktop**: Tela completa com layout otimizado
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface simplificada para smartphones

## 🖨️ Impressão

O documento possui estilos específicos para impressão:
- Remove elementos desnecessários (header, footer)
- Otimiza cores para impressão em preto e branco
- Mantém a legibilidade e formatação

## 🔗 Parâmetros da URL

O sistema aceita os seguintes parâmetros:
- `tipo`: Tipo do documento
- `codigo_verificador`: Código único do documento
- `data_emissao`: Data de emissão (formato YYYY-MM-DD)

### Exemplo de URL:
```
index.html?tipo=Carteira%20de%20Identifica%C3%A7%C3%A3o%20Estudantil&codigo_verificador=9269c45820&data_emissao=2025-07-29
```

## 🎯 Melhorias Implementadas

1. **Interface Moderna**: Design mais atual e profissional
2. **Animações**: Efeitos visuais suaves
3. **Interatividade**: Elementos clicáveis e feedback visual
4. **Acessibilidade**: Melhor contraste e navegação
5. **Performance**: Código otimizado e rápido

## 📄 Licença

Este projeto é uma recriação educacional do sistema original do IFMA. Todos os direitos do sistema original pertencem ao Instituto Federal do Maranhão.

## 🤝 Contribuição

Para contribuir com melhorias:
1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Abra um Pull Request

---

**Desenvolvido com ❤️ para fins educacionais** 