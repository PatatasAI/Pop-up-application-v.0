const CodeGenerator = ({ popupConfig, onCopyCode }) => {
  const generateCode = () => {
    const { elements, content, triggerConfig } = popupConfig;

    const elementHTML = elements
      .map((el) => {
        switch (el.type) {
          case 'heading':
            return `<h2 style="font-size: ${el.content.fontSize}px; color: ${el.content.color}; margin: 0 0 10px;">${el.content.text}</h2>`;
          case 'text':
            return `<p style="font-size: ${el.content.fontSize}px; color: ${el.content.color}; margin: 0 0 15px;">${el.content.text}</p>`;
          case 'email':
            return `<input type="email" placeholder="${el.content.placeholder}" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;" />`;
          case 'button':
            return `<button style="background-color: ${el.content.backgroundColor}; color: ${el.content.textColor}; padding: 12px 24px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">${el.content.text}</button>`;
          case 'image':
            return `<div style="width: ${el.content.width}px; height: 150px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">Image Placeholder</div>`;
          default:
            return '';
        }
      })
      .join('\n          ');

    return `<!-- PopMaker Popup Code -->
<div id="popup-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; align-items: center; justify-content: center;">
  <div id="popup-container" style="background: ${content.backgroundColor}; padding: 30px; border-radius: 8px; max-width: 500px; width: 90%; position: relative; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <button id="popup-close" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer; color: ${content.textColor};">&times;</button>
    ${elementHTML}
  </div>
</div>

<script>
  (function() {
    const overlay = document.getElementById('popup-overlay');
    const closeBtn = document.getElementById('popup-close');
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
      overlay.style.display = 'none';
    });
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
    
    // Trigger: ${triggerConfig.type}
    ${generateTriggerScript(triggerConfig)}
    
    // Show popup function
    function showPopup() {
      overlay.style.display = 'flex';
    }
  })();
<\/script>`;
  };

  const generateTriggerScript = (config) => {
    switch (config.type) {
      case 'time':
        return `// Show after ${config.delay} seconds
        setTimeout(showPopup, ${config.delay * 1000});`;
      case 'scroll':
        return `// Show at ${config.scrollPercentage}% scroll
        window.addEventListener('scroll', () => {
          const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrolled >= ${config.scrollPercentage}) {
            showPopup();
            window.removeEventListener('scroll', arguments.callee);
          }
        });`;
      case 'exit':
        return `// Exit intent
        let shown = false;
        document.addEventListener('mouseleave', (e) => {
          if (e.clientY <= 0 && !shown) {
            shown = true;
            showPopup();
          }
        });`;
      case 'click':
        return `// Click trigger on: ${config.selector}
        document.querySelector('${config.selector}')?.addEventListener('click', showPopup);`;
      default:
        return '// Default: show on page load\n    showPopup();';
    }
  };

  const code = generateCode();

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">Export Code</h3>
      
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Generated HTML & JavaScript
        </label>
        <textarea
          readOnly
          value={code}
          className="w-full h-64 p-3 bg-gray-900 text-green-400 font-mono text-xs rounded border border-gray-700 focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          onCopyCode();
        }}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default CodeGenerator;
